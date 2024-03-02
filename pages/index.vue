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
</script>
<template>
  <global-header />
  <Welcome
    title="Elevate your laptop game with a touch of French elegance."
    description="Unleash your creativity with Pixel Perfect Prints!"
    :imageDesktop="[{ publicId: 'ppp/hero_banner' }]"
    :imageMobile="[{ publicId: 'ppp/hero_banner_mobile' }]"
    ctaText="Upload your own design"
    ctaLink="#sticker-creator"
  />

  <TwoColumn>
    <template v-slot:sideA>
      <cardCtaPng />
    </template>
    <template v-slot:sideB>
      <cardCtaGetStarted
        :image="[{ publicId: 'ppp/mockup1' }]"
        title="Custom stickers"
        ctaLink="#sticker-creator"
        ctaText="Get Started"
        description="We have created a design tool that let's you cusomize sticker size and matierial in a visual way."
        backgroundColor="bg-negative-100"
      />
    </template>
  </TwoColumn>

  <stickerCreator />

  <global-footer />
  <basket />
</template>
