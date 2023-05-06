<script setup lang="ts">
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { collectionProducts } = storeToRefs(productStore);
</script>
<template>
  <pre>{{ collectionProducts }}</pre>
</template>
