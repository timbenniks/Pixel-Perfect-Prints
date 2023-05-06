<script setup lang="ts">
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { collection } = storeToRefs(productStore);
</script>
<template>
  <div class="max-w-7xl mx-auto bg-negative-100 p-6">
    <h3 class="font-bold font-titles tracking-wide text-4xl mb-4">
      Our designs
    </h3>
    <p class="mb-8">
      We have a range of our of sticker design for you to choose from.
    </p>

    <ul class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <li v-for="product in collection" :key="product.id">
        <ProductCard :product="product" v-if="product.availableForSale" />
      </li>
    </ul>
  </div>
</template>
