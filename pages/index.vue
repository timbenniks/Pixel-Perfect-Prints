<script setup lang="ts">
useServerSeoMeta({
  ogTitle: "Pixel Perfect Prints",
  description:
    "Elevate your laptop game with a touch of French elegance and unleash your creativity with Pixel Perfect Prints!",
  ogDescription:
    "Elevate your laptop game with a touch of French elegance and unleash your creativity with Pixel Perfect Prints!",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});

useSeoMeta({
  title: "Pixel Perfect Prints",
});

const productStore = useProductStore();
await productStore.createCheckout();
await productStore.fetchCollection("gid://shopify/Collection/220283764886");

const { composition, error } = await useUniformEnhancedComposition({
  slug: "/",
});

if (error?.value) {
  console.error(
    "Error fetching composition from Uniform",
    error.value.data.message
  );
}
</script>
<template>
  <PageComposition v-if="composition" :composition="composition" />
  <!-- <welcome />

  <two-column class="max-w-7xl mx-auto px-8 lg:p-0 mb-8">
    <template v-slot:sideA>
      <card-cta-png />
    </template>
    <template v-slot:sideB>
      <card-cta-get-started />
    </template>
  </two-column>

  <sticker-creator />
  <product-grid /> -->
</template>
