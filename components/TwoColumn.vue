<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="side-a">
      <slot name="sideA"></slot>
    </div>
    <div class="side-b">
      <slot name="sideB"></slot>
    </div>
  </div>
</template>
