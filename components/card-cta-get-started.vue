<script setup lang="ts">
import { ComponentInstance } from "@uniformdev/canvas";

//import { UniformText } from "@uniformdev/canvas-vue";

interface Props {
  title: string;
  description?: string;
  image: any;
  ctaText: string;
  ctaLink: any;
  component: ComponentInstance;
}

defineProps<Props>();
</script>
<template>
  <div class="bg-negative-100 flex flex-col-reverse lg:flex-row">
    <NuxtImg
      provider="cloudinary"
      :src="image[0].publicId"
      alt="custom sticker"
      width="1600"
      height="2000"
      loading="eager"
      class="w-full lg:w-1/2 object-contain block"
    />
    <article class="flex flex-col justify-center w-full lg:w-72 p-6 lg:p-0">
      <h3 class="text-3xl font-titles tracking-wide" v-if="title">
        {{ title }}
      </h3>
      <p class="mb-4" v-if="description">
        {{ description }}
      </p>
      <a
        v-if="ctaText"
        :href="ctaLink.path"
        class="font-semibold !bg-neutral-900 inline-block hover:opacity-90 hover:underline py-2 px-3 text-white rounded-md self-start"
        >{{ ctaText }}</a
      >
    </article>
  </div>
</template>
