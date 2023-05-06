<script lang="ts" setup>
import { SfButton, SfIconShoppingCart } from "@storefront-ui/vue";
const productStore = useProductStore();

async function addToCard(id: string) {
  await productStore.addLineItemForVariant(id, 1);
  await productStore.fetchCheckout();
}

defineProps(["product"]);
</script>

<template>
  <div class="border border-negative-400 rounded-md hover:shadow-lg bg-white">
    <div class="relative">
      <img
        :src="product.images[0].src"
        :alt="product.title"
        class="block object-cover h-auto rounded-t-md aspect-square"
        :width="product.images[0].width"
        :height="product.images[0].height"
      />
    </div>
    <div class="p-4 border-t border-neutral-200">
      <p class="text-xl font-bold line-clamp-1">{{ product.title }}</p>

      <p class="block py-2 font-normal leading-5 text-sm text-neutral-700">
        <span class="line-clamp-2">{{ product.description }}</span>
      </p>
      <span class="block pb-2 font-bold text-lg">{{ product.price }}</span>

      <SfButton
        @click="addToCard(product.variant.id)"
        type="button"
        class="font-semibold !bg-neutral-900 hover:opacity-90 hover:underline"
      >
        <template #prefix>
          <SfIconShoppingCart size="sm" />
        </template>
        Add to cart
      </SfButton>
    </div>
  </div>
</template>
