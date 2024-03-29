<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { changeDpiDataUrl } from "../helpers/changedpi";
import type { ProductVariant } from "shopify-buy";
import { v4 as uuidv4 } from "uuid";
import {
  SfButton,
  SfLoaderCircular,
  SfIconShoppingCart,
  SfCheckbox,
} from "@storefront-ui/vue";

const productStore = useProductStore();
await productStore.fetchProduct();
await productStore.createCheckout();

const {
  material,
  variants,
  inStock,
  imageWidthCm,
  fileName,
  stickersPerSheet,
  quantity,
  price,
  loading,
  imageName,
  checkoutUrl,
} = storeToRefs(productStore);

const pxPerMm = productStore.pxPerMm;
const sheetWidth = productStore.sheetWidth;
const sheetHeight = productStore.sheetHeight;
const margin = productStore.margin;
const file = ref<File | null>(null);
const sheet = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const width = sheetWidth * pxPerMm;
const height = sheetHeight * pxPerMm;
const bgcolor = ref("#ffffff");
const disabled = ref(false);
const readInstructions = ref(false);

productStore.setMaterial(variants.value[0] as ProductVariant);

const supabaseClient = useSupabaseClient();

onMounted(async () => {
  await nextTick();
  sheet.value = document.querySelector("canvas");
  ctx.value = sheet.value?.getContext("2d") as CanvasRenderingContext2D;
  if (sheet.value) {
    sheet.value.width = width;
    sheet.value.height = height;
  }
});

const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.files) {
    ctx.value?.clearRect(0, 0, width, height);

    fileName.value = target.files[0].name;
    file.value = target.files[0];

    const base64Image = await toBase64(target.files[0]);
    productStore.setUploadedImageBase64(base64Image as string);

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;
      image.onload = () => {
        drawSheet(image);
      };
    };

    reader.readAsDataURL(file.value);
  }
};

const redrawSheet = () => {
  if (file.value) {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;

      image.onload = () => {
        drawSheet(image);
      };
    };

    reader.readAsDataURL(file.value);
  }
};

function drawSheet(img: HTMLImageElement) {
  const aspectRatio = img.width / img.height;
  const imageWidth = imageWidthCm.value * pxPerMm * 10; // make it cm.
  const imageHeight = imageWidth / aspectRatio + margin;
  const numCols = Math.ceil(width / imageWidth);
  const numRows = Math.ceil(height / imageHeight);

  ctx.value?.clearRect(0, 0, width, height);

  productStore.setStickersPerSheet((numCols - 1) * (numRows - 1));

  for (let x = 0; x < numCols; x++) {
    for (let y = 0; y < numRows; y++) {
      const xPos = x * imageWidth + margin / 2;
      const yPos = y * imageHeight + margin / 2;

      if (xPos + imageWidth < width && yPos + imageHeight < height) {
        ctx.value?.drawImage(
          img,
          xPos,
          yPos,
          imageWidth - margin,
          imageWidth / aspectRatio - margin
        );
      }
    }
  }
}

function convertBase64ToBlob(base64Image: string) {
  const parts = base64Image.split(";base64,");
  const imageType = parts[0].split(":")[1];
  const decodedData = window.atob(parts[1]);
  const uInt8Array = new Uint8Array(decodedData.length);
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: imageType });
}

async function saveImage() {
  const dataURL = sheet.value?.toDataURL("image/png");
  const to300dpi = changeDpiDataUrl(dataURL, 300);

  const { data: sheetData, error: sheetError } = await supabaseClient.storage
    .from("sheet-storage")
    .upload(`public/${imageName.value}`, convertBase64ToBlob(to300dpi), {
      cacheControl: "3600",
      upsert: false,
    });

  const { data: originalData, error: originalError } =
    await supabaseClient.storage
      .from("sheet-storage")
      .upload(
        `public/${imageName.value.replace(".png", "")}-original.png`,
        convertBase64ToBlob(productStore.uploadedImageBase64),
        {
          cacheControl: "3600",
          upsert: false,
        }
      );

  productStore.setProductImages(imageName.value, dataURL as string);

  if (sheetError) {
    return sheetError;
  }

  if (originalError) {
    return originalError;
  }

  return dataURL;
}

function setQuantity(data: any) {
  productStore.setQuantity(data);
}

function setBgcolor(color: string) {
  bgcolor.value = color;
}

async function addToCart() {
  productStore.setLoading("Creating sticker sheet");

  const filename = `${uuidv4()}.png`;
  productStore.setImageName(filename);
  await productStore.addLineItems();
  await saveImage().catch((error) => console.error(error));

  productStore.setLoading("Redirecting");
  await productStore.fetchCheckout();

  window.location.href = checkoutUrl.value;
  //productStore.setBasketOpen(true);
  //disabled.value = true;
}

watch(material, (selectedMaterial) => {
  productStore.setMaterial(selectedMaterial as ProductVariant);
});
</script>

<template>
  <div class="p-8 bg-[#FFE7C1] grid grid-cols-1 md:grid-cols-2 gap-12">
    <div>
      <h3 class="font-bold font-titles tracking-wide text-4xl mb-4">
        Create your sticker sheet
      </h3>
      <p class="mb-8">
        We sell stickers by A4 sheet. Upload your own design and choose how many
        stickers you want per sheet.
      </p>

      <div
        class="bg-[#fff3df] p-4 border-[#F9C066] border mb-4 rounded-md hover:shadow-lg"
        v-if="inStock"
        :class="{ 'pointer-events-none opacity-30': disabled }"
      >
        <p class="font-bold text-2xl mb-4 font-titles tracking-wide">
          Step 1: upload your sticker
        </p>
        <p class="mb-4 text-sm bg-[#F9C066] p-2 rounded-md">
          1. Make sure you upload a <strong>PNG</strong> file with a
          <strong>transparent</strong> background and cropped as close to the
          edge of the sticker as possible.
        </p>

        <p class="text-sm bg-[#F9C066] p-2 rounded-t-md">
          2. If the sticker has multiple seperated parts, make sure they are
          <strong>connected</strong> by a white background.
        </p>

        <CldImage
          src="ppp/ppp-help.png"
          alt="How to submit the correct sticker"
          width="700"
          height="177"
          loading="lazy"
          class="block w-full mb-4 border-[#F9C066] border rounded-b-md"
        />
        <div class="flex items-center mb-4">
          <SfCheckbox
            id="checkbox"
            v-model="readInstructions"
            :value="true"
            class-name="peer"
          />
          <label
            class="ml-3 text-sm text-gray-900 cursor-pointer font-body peer-disabled:text-disabled-900"
            for="checkbox"
          >
            I read the above instructions and I understand how to design my
            sticker
          </label>
        </div>
        <div
          class="mb-2 flex"
          :class="{ 'opacity-20 pointer-events-none': !readInstructions }"
          :disabled="!readInstructions"
        >
          <input
            type="file"
            accept="image/png"
            id="file"
            hidden
            @change="onFileChange"
          />

          <label
            for="file"
            class="file-btn py-2 px-3 font-semibold !bg-neutral-900 hover:opacity-90 hover:underline inline-block text-white rounded cursor-pointer"
            >Select sticker file</label
          >

          <p v-if="fileName" class="ml-4 mt-2">{{ fileName }}</p>
        </div>
      </div>

      <div
        class="bg-[#fff3df] p-4 border-[#F9C066] border mb-4 rounded-md"
        v-else
      >
        <p class="font-bold text-2xl mb-4 font-titles tracking-wide">
          Out of stock
        </p>
        <p class="mb-4 text-sm">
          We apologise but the product is currently out of stock...
        </p>
      </div>

      <div
        class="bg-[#fff3df] p-4 border-[#F9C066] border mb-4 rounded-md hover:shadow-lg"
        v-show="file"
        :class="{ 'pointer-events-none opacity-30': disabled }"
      >
        <p class="font-bold text-2xl mb-4 font-titles tracking-wide">
          Step 2: choose sticker size
        </p>
        <p class="mb-8 text-sm">
          Drag the slider to resize your sticker. The smaller the sticker, the
          more you get per sheet.
        </p>
        <div>
          <input
            type="range"
            id="imageWidth"
            v-model="imageWidthCm"
            min="3"
            max="20"
            step="0.1"
            @input="redrawSheet"
            class="block mb-8"
          />

          <label for="imageWidth" class="uppercase font-bold text-sm mb-2"
            >sticker width: {{ imageWidthCm }}cm ({{
              (imageWidthCm / 2.54).toFixed(1)
            }}
            inch)
          </label>
        </div>
      </div>

      <div
        class="bg-[#fff3df] mb-4 p-8 border-[#F9C066] border rounded-md hover:shadow-lg"
        v-show="file"
        :class="{ 'pointer-events-none opacity-30': disabled }"
      >
        <p class="font-bold text-2xl mb-4 font-titles tracking-wide">
          Step 3: select quantity
        </p>
        <p class="mb-4 text-sm">
          Select how many sheets you want.
          <strong>We will cut the stickers out for you.</strong>
        </p>

        <QuantitySelector @quantity="setQuantity" />
      </div>

      <div
        class="bg-[#fff3df] p-8 border-[#F9C066] border rounded-md hover:shadow-lg"
        v-show="file"
        :class="{ 'pointer-events-none opacity-30': disabled }"
      >
        <p class="font-bold text-2xl mb-4 font-titles tracking-wide">
          Step 4: add to cart
        </p>

        <ul class="mb-4 text-sm list-inside list-disc">
          <li>
            You have selected <strong>{{ quantity }}</strong> sticker sheets at
            <strong>{{ stickersPerSheet }}</strong> stickers per sheet.
          </li>
          <li>
            Sticker width: <strong>{{ imageWidthCm }}cm</strong> ({{
              (imageWidthCm / 2.54).toFixed(1)
            }}
            inch).
          </li>
          <!-- <li>
            Sticker material: <strong>{{ material.title }}</strong
            >.
          </li> -->
          <li>
            Total price: <strong>{{ price }}</strong>
          </li>
        </ul>

        <SfButton
          @click="addToCart"
          :disabled="
            loading === 'Creating sticker sheet' || loading === 'Redirecting'
          "
          :class="{ 'opacity-80 pointer-events-none no-underline': loading }"
          class="font-semibold !bg-neutral-900 hover:opacity-90 hover:underline"
        >
          <template
            v-if="
              loading === 'Creating sticker sheet' || loading === 'Redirecting'
            "
            >{{ loading }}
            <SfLoaderCircular
              size="sm"
              class="!text-white !ring-primary-900 ml-2"
            />
          </template>
          <template v-else> <SfIconShoppingCart size="sm" />Buy now</template>
        </SfButton>
      </div>
    </div>
    <div>
      <div
        class="bg-white border-4 border-[#F9C066] p-4 md:sticky md:top-[120px] rounded-md"
      >
        <div class="flex justify-between">
          <div>
            <p class="uppercase font-bold text-sm">Your Stickers:</p>
            <p class="font-black text-4xl mb-2">
              <span v-if="file">{{ price }}</span>
            </p>
          </div>
          <div v-if="file" class="flex flex-col items-end mb-2">
            <p class="uppercase font-bold text-sm mb-1">
              Change preview bg color
            </p>
            <color-picker @bgcolor="setBgcolor" />
          </div>
        </div>

        <div
          class="border-dashed border-primary-300 border p-2 mb-2"
          :style="{ background: bgcolor }"
        >
          <canvas ref="sheet" class="w-full"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
