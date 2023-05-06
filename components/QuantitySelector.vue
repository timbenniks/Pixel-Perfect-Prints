<template>
  <div class="flex border border-[#F9C066] rounded-md max-w-[130px] bg-white">
    <SfButton
      type="button"
      variant="tertiary"
      :disabled="count <= min"
      square
      class="rounded-r-none"
      :aria-controls="inputId"
      aria-label="Decrease value"
      @click="dec()"
    >
      <SfIconRemove />
    </SfButton>
    <input
      :id="inputId"
      v-model="count"
      type="number"
      role="spinbutton"
      class="appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
      :min="min"
      :max="max"
      @input="handleOnChange"
    />
    <SfButton
      type="button"
      variant="tertiary"
      :disabled="count >= max"
      square
      class="rounded-l-none"
      :aria-controls="inputId"
      aria-label="Increase value"
      @click="inc()"
    >
      <SfIconAdd />
    </SfButton>
  </div>
</template>

<script lang="ts" setup>
import { useCounter } from "@vueuse/core";
import { SfButton, SfIconAdd, SfIconRemove, useId } from "@storefront-ui/vue";
import { clamp } from "@storefront-ui/shared";

const emit = defineEmits(["quantity"]);
const min = ref(1);
const max = ref(20);
const inputId = useId();
const { count, inc, dec, set } = useCounter(1, {
  min: min.value,
  max: max.value,
});

function handleOnChange(event: Event) {
  const currentValue = (event.target as HTMLInputElement)?.value;
  const nextValue = parseFloat(currentValue);
  set(Number(clamp(nextValue, min.value, max.value)));
}

watch(count, (val) => {
  emit("quantity", val);
});
</script>
