<template>
  <div class="max-w-7xl mx-auto px-8 lg:p-0 mb-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="side-a">
        <slot name="sideA" />
      </div>
      <div class="side-b">
        <slot name="sideB" />
      </div>
    </div>
  </div>
</template>
