<script lang="ts" setup>
import type {
  ComponentInstance,
  RootComponentInstance,
} from "@uniformdev/canvas";

import { DefaultNotImplementedComponent } from "@uniformdev/canvas-vue";

import CardCtaGetStarted from "./card-cta-get-started.vue";
import CardCtaPng from "./card-cta-png.vue";
import StickerCreator from "./StickerCreator.vue";
import ProductGrid from "./productGrid.vue";
import TwoColumn from "./TwoColumn.vue";
import Welcome from "./Welcome.vue";

const componentResolver = (component: ComponentInstance) => {
  if (component.type == "cardCtaGetStarted") {
    return CardCtaGetStarted;
  }
  if (component.type == "cardCtaPng") {
    return CardCtaPng;
  }
  if (component.type == "stickerCreator") {
    return StickerCreator;
  }
  if (component.type == "productGrid") {
    return ProductGrid;
  }
  if (component.type == "welcome") {
    return Welcome;
  }
  if (component.type == "twoColumn") {
    return TwoColumn;
  }

  return DefaultNotImplementedComponent;
};

interface Props {
  composition: RootComponentInstance;
}

const props = defineProps<Props>();

const { composition } = props;
</script>

<template>
  <global-header />

  <UniformComposition :data="composition" :resolveRenderer="componentResolver">
    <UniformSlot name="content" />
  </UniformComposition>

  <global-footer />
  <basket />
</template>
