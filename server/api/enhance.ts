import { H3Event } from "h3";
// import { enhance, EnhancerBuilder } from "@uniformdev/canvas";

// import {
//   createEnhancer,
//   ShopifyClient,
//   SHOPIFY_PARAMETER_TYPES,
// } from '@uniformdev/canvas-shopify';

// const client = new ShopifyClient({
//   developmentStore: process.env.SHOPIFY_STORE,
//   webhookVersion: process.env.SHOPIFY_SHOPIFY_API_VERSION,
//   accessToken: process.env.SHOPIFY_TOKEN,
// });

// const shopifyEnhancer = createEnhancer({ clients: client });

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const composition = body.composition;
  // await enhance({
  //   composition,
  //   enhancers: new EnhancerBuilder().parameterType(
  //     SHOPIFY_PARAMETER_TYPES,
  //     shopifyEnhancer
  //   ),
  //   context: {},
  // });

  return { composition };
});