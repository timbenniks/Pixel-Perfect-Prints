import Vueticol from "vueticol";
import "vueticol/dist/vueticol.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vueticol);
})