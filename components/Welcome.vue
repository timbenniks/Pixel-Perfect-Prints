<script lang="ts" setup>
import { generateSrcSet } from "../helpers/images";
</script>

<template>
  <div
    class="mt-[6rem] bg-[#FFE7C1] max-w-7xl mx-auto relative md:spect-[2560/1210] mb-8"
  >
    <picture>
      <source
        :srcset="
          generateSrcSet([1024, 1280, 1330, 1440, 1600], 'hero_banner.png')
        "
        media="(min-width: 768px)"
        sizes="100vw"
      />

      <source
        :srcset="
          generateSrcSet(
            [320, 375, 460, 550, 600, 800, 900],
            'hero_banner_mobile.png'
          )
        "
        media="(max-width: 767px)"
        sizes="100vw"
      />

      <img
        alt="Welcome to Pixel Perfet Prints"
        :src="`https://res.cloudinary.com/dwfcofnrd/image/upload/f_auto,q_auto,w_600/ppp/hero_banner.png`"
        loading="eager"
        :width="2560"
        :height="1210"
      />
    </picture>

    <article
      class="md:absolute top-2/4 md:-translate-y-2/4 left-8 w-full md:w-[600px] bg-[#FFE7C1] border-b-4 border-[#F9C066] p-8"
    >
      <h1 class="font-bold text-5xl mb-4 font-titles tracking-wide">
        Elevate your laptop game with a touch of French elegance.
      </h1>
      <p class="mb-4 text-xl">
        Unleash your creativity with Pixel Perfect Prints!
      </p>

      <a
        href="#sticker-creator"
        class="font-semibold !bg-neutral-900 inline-block hover:opacity-90 hover:underline py-2 px-3 text-white rounded-md self-start"
        >Upload your own design</a
      >
    </article>
  </div>
</template>
