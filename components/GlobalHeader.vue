<script setup lang="ts">
import { SfCounter, SfIconShoppingCart } from "@storefront-ui/vue";

import { storeToRefs } from "pinia";
const productStore = useProductStore();
const { quantityInBasket, basketOpen } = storeToRefs(productStore);

function openBasket() {
  productStore.setBasketOpen(true);
}
</script>
<template>
  <header
    class="fixed top-0 left-0 w-full h-[90px] md:h-[100px] bg-[#FFE7C1] border-b-2 border-[#F9C066] z-10"
  >
    <div class="max-w-7xl mx-auto flex justify-between">
      <logoSmall class="w-[300px] md:w-[400px] pt-6 md:pt-4 pl-4" />

      <div class="relative mt-8 mr-6">
        <button @click="openBasket()">
          <SfIconShoppingCart size="lg" class="" />

          <SfCounter
            size="xs"
            pill
            class="!text-white bg-primary-800 ring-primary-800 absolute -top-2 left-6"
          >
            {{ quantityInBasket }}
          </SfCounter>
        </button>
      </div>
    </div>
  </header>
</template>

<style>
header {
  transform: translateY(0);
  transition: transform 300ms ease;
}

header.is-hidden {
  transform: translateY(-112%);
}
</style>
