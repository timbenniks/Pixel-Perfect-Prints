<script setup lang="ts">
useServerSeoMeta({
  ogTitle: "Pixel Perfect Prints",
  description:
    "Elevate your laptop game with a touch of French elegance and unleash your creativity with Pixel Perfect Prints!",
  ogDescription:
    "Elevate your laptop game with a touch of French elegance and unleash your creativity with Pixel Perfect Prints!",
  ogImage:
    "https://res.cloudinary.com/dwfcofnrd/image/upload/f_auto,q_auto,w_900/ppp/hero_banner_mobile",
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
</template>
