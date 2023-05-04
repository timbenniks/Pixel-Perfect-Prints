<script lang="ts" setup>
import { SfDrawer, SfIconCancel } from "@storefront-ui/vue";
import { storeToRefs } from "pinia";
const productStore = useProductStore();
const { basketOpen, lineItems } = storeToRefs(productStore);

function closeBasket() {
  productStore.setBasketOpen(false);
}

const basketContents = computed(() => {
  const res = lineItems.value.map((item: any) => {
    return {
      title: item.title,
      quantity: item.quantity,
      customAttributes: item.customAttributes,
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
      class="z-100 top-[6rem] w-full md:w-2/4 lg:w-1/3 bg-neutral-900 text-white p-8 h-[calc(100%-6rem)] overflow-y-auto"
    >
      <button class="absolute top-6 right-6" @click="closeBasket()">
        <SfIconCancel size="lg" />
      </button>
      <h3 class="font-bold font-titles tracking-wide text-4xl mb-4">
        Shopping Basket
      </h3>

      <pre>{{ basketContents }}</pre>
    </SfDrawer>
  </transition>
</template>
