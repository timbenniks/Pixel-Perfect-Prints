<template>
  <div class="bg-[#eedad7] lg:aspect-[1000/620] lg:relative">
    <NuxtImg
      provider="cloudinary"
      src="princess_nugget_cratfts_2.png"
      alt="princess nugget cratfts"
      width="1000"
      height="620"
      loading="eager"
      class="hidden lg:block w-full object-contain lg:absolute"
    />

    <article
      class="flex flex-col justify-center lg:absolute top-0 lg:h-full left-72 w-full lg:w-72 p-6 lg:p-0"
    >
      <h3 class="text-3xl font-titles tracking-wide">Our partner</h3>
      <p class="mb-4">
        We are working with
        <a
          href="https://princessnugget.com"
          alt="Princess Nugget Crafts"
          target="_blank"
          class="underline"
          >Princess Nugget Crafts</a
        >, a French artisinal crafts atelier.
      </p>
    </article>

    <NuxtImg
      provider="cloudinary"
      src="princess_nugget_cratfts_mobile.png"
      alt="princess nugget cratfts"
      width="463"
      height="620"
      loading="eager"
      class="lg:hidden w-full object-contain block"
    />
  </div>
</template>
