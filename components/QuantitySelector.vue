<template>
  <div class="flex">
    <SfButton
      type="button"
      square
      size="sm"
      class="!rounded-full"
      :disabled="count <= min"
      :aria-controls="inputId"
      aria-label="Decrease value"
      @click="dec()"
    >
      <SfIconRemove size="sm" />
    </SfButton>
    <input
      :id="inputId"
      v-model="count"
      type="number"
      role="spinbutton"
      class="appearance-none px-2 mx-2 w-7 font-bold text-center bg-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
      :min="min"
      :max="max"
      @input="handleOnChange"
    />

    <SfButton
      type="button"
      square
      class="!rounded-full"
      :disabled="count >= max"
      :aria-controls="inputId"
      aria-label="Increase value"
      @click="inc()"
    >
      <SfIconAdd size="sm" />
    </SfButton>
    <p class="mt-[7px] ml-4">Sheets selected</p>
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
