<script setup lang="ts">
const color = ref("");
const emit = defineEmits(["bgcolor"]);

watch(color, (val) => {
  emit("bgcolor", val);
});
</script>

<template>
  <vueticol v-model="color" style="circle" />
</template>
