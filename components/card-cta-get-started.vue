<template>
  <div class="bg-negative-100 flex flex-col-reverse lg:flex-row">
    <NuxtImg
      provider="cloudinary"
      src="mockup1.png"
      alt="custom sticker"
      width="1600"
      height="2000"
      loading="eager"
      class="w-full lg:w-1/2 object-contain block"
    />
    <article class="flex flex-col justify-center w-full lg:w-72 p-6 lg:p-0">
      <h3 class="text-3xl font-titles tracking-wide">Custom stickers</h3>
      <p class="mb-4">
        We have created a design tool that let's you cusomize sticker size and
        matierial in a visual way.
      </p>

      <a
        href="#sticker-creator"
        class="font-semibold !bg-neutral-900 inline-block hover:opacity-90 hover:underline py-2 px-3 text-white rounded-md self-start"
        >Get started</a
      >
    </article>
  </div>
</template>
