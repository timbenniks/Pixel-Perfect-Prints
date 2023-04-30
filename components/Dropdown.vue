<template>
  <label>
    <span class="pb-1 text-sm font-medium text-neutral-900 font-body">
      Which sticker material would you like?
    </span>
    <SfSelect>
      <template #chevron>
        <SfIconUnfoldMore
          class="absolute pointer-events-none top-2 right-4 text-neutral-500"
        />
      </template>
      <option v-for="{ value, label } in options" :key="value" :value="value">
        {{ label }}
      </option>
    </SfSelect>
  </label>
</template>

<script lang="ts" setup>
import { SfSelect, SfIconUnfoldMore } from "@storefront-ui/vue";

const options = [
  { label: "Matte", value: "matte", selected: true },
  { label: "Glossy", value: "glossy" },
  { label: "Fancy", value: "fancy" },
];
</script>
