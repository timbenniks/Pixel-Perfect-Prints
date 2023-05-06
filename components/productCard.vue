<script lang="ts" setup>
import { SfLink, SfButton, SfIconShoppingCart } from "@storefront-ui/vue";
defineProps(["product"]);
</script>

<template>
  <div
    class="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]"
  >
    <div class="relative">
      <SfLink href="#">
        <img
          src=""
          alt="Great product"
          class="block object-cover h-auto rounded-md aspect-square"
          :width="300"
          :height="300"
        />
      </SfLink>
    </div>
    <div class="p-4 border-t border-neutral-200">
      <SfLink href="#" variant="secondary" class="no-underline">
        Athletic mens walking sneakers
      </SfLink>

      <p
        class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700"
      >
        Lightweight • Non slip • Flexible outsole • Easy to wear on and off
      </p>
      <span class="block pb-2 font-bold typography-text-lg">$2345,99</span>
      <SfButton type="button" size="sm">
        <template #prefix>
          <SfIconShoppingCart size="sm" />
        </template>
        Add to cart
      </SfButton>
    </div>
  </div>
</template>
