<script setup lang="ts">
import { ComponentInstance } from "@uniformdev/canvas";

//import { UniformText } from "@uniformdev/canvas-vue";

interface Props {
  title: string;
  description: string;
  component: ComponentInstance;
}

defineProps<Props>();
</script>

<template>
  <div class="bg-[#eedad7] lg:aspect-[1000/620] lg:relative">
    <!-- <NuxtImg
      provider="cloudinary"
      src="ppp/princess_nugget_cratfts_2.png"
      alt="princess nugget cratfts"
      width="1000"
      height="620"
      loading="eager"
      class="hidden lg:block w-full object-contain lg:absolute"
    /> -->

    <CldImage
      src="ppp/princess_nugget_cratfts_2.png"
      alt="princess nugget cratfts"
      width="1000"
      height="620"
      loading="eager"
      class="hidden lg:block w-full object-contain lg:absolute"
    />

    <article
      class="flex flex-col justify-center lg:absolute top-0 lg:h-full left-72 w-full lg:w-72 p-6 lg:p-0"
    >
      <h3 class="text-3xl font-titles tracking-wide" v-if="title">
        {{ title }}
      </h3>
      <p class="mb-4" v-if="description" v-html="description"></p>
    </article>

    <!-- <NuxtImg
      provider="cloudinary"
      src="ppp/princess_nugget_cratfts_mobile.png"
      alt="princess nugget cratfts"
      width="463"
      height="620"
      loading="eager"
      class="lg:hidden w-full object-contain block"
    /> -->

    <CldImage
      src="ppp/princess_nugget_cratfts_mobile.png"
      alt="princess nugget cratfts"
      width="463"
      height="620"
      loading="eager"
      class="lg:hidden w-full object-contain block"
    />
  </div>
</template>
