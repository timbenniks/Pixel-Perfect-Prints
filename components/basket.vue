<script lang="ts" setup>
import { SfDrawer, SfIconCancel, SfButton } from "@storefront-ui/vue";
import { storeToRefs } from "pinia";
const productStore = useProductStore();
const { basketOpen, lineItems, checkoutUrl } = storeToRefs(productStore);

function closeBasket() {
  productStore.setBasketOpen(false);
}

function getImage(filename: string) {
  return productStore.imageByFilename(filename);
}

const money = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

const basketContents = computed(() => {
  const res = lineItems.value.map((item: any) => {
    return {
      title: item.title,
      quantity: item.quantity,
      image:
        item.customAttributes &&
        getImage(
          item.customAttributes.find(
            (attr: any) => attr.key === "Sheet filename"
          )?.value || ""
        ),
      customAttributes: item.customAttributes.filter(
        (attr: any) => attr.key !== "Sheet filename"
      ),
      total: money.format(item.quantity * item.variant.priceV2.amount),
      variant: {
        id: item.variant.id,
        title: item.variant.title,
        price: item.variant.priceV2.amount,
        image: {
          src: item.variant.image.src,
          alt: item.variant.image.alt,
          width: item.variant.image.width,
          height: item.variant.image.height,
        },
      },
    };
  });

  return res;
});
</script>
<template>
  <transition
    enter-active-class="transition duration-500 ease-in-out"
    leave-active-class="transition duration-500 ease-in-out"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <SfDrawer
      v-model="basketOpen"
      placement="right"
      class="z-100 top-[6rem] w-full md:w-2/4 lg:w-1/3 bg-[#FFE7C1] border-[#F9C066] border-l-2 h-[calc(100%-6rem)] overflow-y-auto"
    >
      <header class="w-full pt-8 pb-6 px-6 bg-primary-950 text-white">
        <button class="absolute top-9 right-6" @click="closeBasket()">
          <SfIconCancel size="lg" />
        </button>
        <h3 class="font-bold font-titles tracking-wide text-4xl mb-2">
          Shopping Cart
        </h3>
        <p class="text-sm">
          Checkout is provided by our partner:
          <a
            href="https://princessnuggetcrafts.fr/en"
            target="_blank"
            class="underline"
            >Princess Nugget Crafts</a
          >
        </p>
      </header>

      <div class="p-4">
        <p v-if="basketContents.length === 0">No products selected</p>
        <div v-else>
          <basket-product-card
            v-for="item in basketContents"
            :key="item.title"
            :item="item"
          />
          <div class="flex mt-4">
            <SfButton
              :href="checkoutUrl"
              tag="a"
              target="_blank"
              v-if="lineItems"
              class="font-semibold !bg-neutral-900 hover:opacity-90 hover:underline"
            >
              Go to checkout
            </SfButton>
          </div>
        </div>
      </div>
    </SfDrawer>
  </transition>
</template>
