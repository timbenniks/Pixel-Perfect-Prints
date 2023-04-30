<template>
  <header
    class="fixed top-0 left-0 w-full h-[90px] md:h-[100px] bg-[#FFE7C1] border-b-2 border-[#F9C066] z-10"
  >
    <div class="max-w-7xl mx-auto">
      <logoSmall class="w-[350px] md:w-[400px] pt-4 pl-4" />
    </div>
  </header>
</template>

<style>
header {
  transform: translateY(0);
  transition: transform 300ms ease;
}

header.is-hidden {
  transform: translateY(-112%);
}
</style>
