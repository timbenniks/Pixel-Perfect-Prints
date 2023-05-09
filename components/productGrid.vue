<script setup lang="ts">
import { ComponentInstance } from "@uniformdev/canvas";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { collection } = storeToRefs(productStore);

interface Props {
  title: string;
  description: string;
  products: any;
  component: ComponentInstance;
}

defineProps<Props>();
</script>
<template>
  <div class="max-w-7xl mx-auto bg-negative-100 p-6">
    <h3 class="font-bold font-titles tracking-wide text-4xl mb-4" v-if="title">
      {{ title }}
    </h3>
    <p class="mb-8" v-if="description">
      {{ description }}
    </p>

    <ul class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <li v-for="product in collection" :key="product.id">
        <ProductCard :product="product" v-if="product.availableForSale" />
      </li>
    </ul>
  </div>
</template>
