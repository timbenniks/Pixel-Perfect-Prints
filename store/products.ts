import { defineStore } from 'pinia'
import Client from 'shopify-buy';
import type { Product, Checkout, ProductVariant, Collection } from 'shopify-buy'

const shopifyClient = Client.buildClient({
  apiVersion: '2023-04',
  domain: 'princess-nugget-shop.myshopify.com',
  storefrontAccessToken: '7feed2256a3351d5924cba3fef5862fb'
});

type productImage = {
  filename: string;
  imageUrl: string;
}

export const useProductStore = defineStore({
  id: 'product-store',
  state: () => {
    return {
      product: {} as Product,
      collection: {} as Collection,
      pxPerMm: 11.81,
      sheetWidth: 188,
      sheetHeight: 265,
      imageWidthCm: 4.4,
      margin: 40,
      fileName: "",
      price: "0",
      quantity: 1,
      material: {} as ProductVariant,
      checkout: {} as Checkout,
      lineItems: [],
      stickersPerSheet: 0,
      checkoutUrl: "",
      loading: false,
      imageName: "",
      basketOpen: false,
      productImages: [] as productImage[]
    }
  },
  actions: {
    async fetchProduct() {
      const product = await shopifyClient.product.fetch('gid://shopify/Product/5628663595158')
      this.product = JSON.parse(JSON.stringify(product))
    },

    async fetchCollection(id: string) {
      const collection = await shopifyClient.collection.fetchWithProducts(id)
      this.collection = JSON.parse(JSON.stringify(collection))
    },

    async createCheckout() {
      const checkout = await shopifyClient.checkout.create();
      this.checkout = JSON.parse(JSON.stringify(checkout))
    },

    async fetchCheckout() {
      const checkout = await shopifyClient.checkout.fetch(this.checkout.id)
      this.lineItems = JSON.parse(JSON.stringify(checkout)).lineItems
    },

    async addLineItems() {
      const checkoutId = this.checkout.id
      const lineItemsToAdd = [
        {
          variantId: this.material.id,
          quantity: this.quantity,
          customAttributes: [
            { key: "Sticker width", value: `${this.imageWidthCm}cm` },
            { key: "Stickers per sheet", value: this.stickersPerSheet.toString() },
            { key: "Sheet filename", value: this.imageName },
          ]
        }
      ];

      await shopifyClient.checkout.addLineItems(checkoutId, lineItemsToAdd)
      this.checkoutUrl = `${this.checkout.webUrl.replace("princess-nugget-shop.myshopify.com", "princessnugget.com")}&locale=en`
    },

    setQuantity(quantity: number) {
      this.quantity = quantity

      const money = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });
      this.price = money.format(this.material.price.amount * quantity)
    },

    setStickersPerSheet(stickersPerSheet: number) {
      this.stickersPerSheet = stickersPerSheet
    },

    setMaterial(material: ProductVariant) {
      this.material = material

      const money = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });
      this.price = money.format(material.price.amount * this.quantity)
    },

    setLoading(which: boolean) {
      this.loading = which
    },

    setImageName(name: string) {
      this.imageName = name
    },

    setBasketOpen(which: boolean) {
      this.basketOpen = which
    },

    setProductImages(filename: string, imageUrl: string) {
      this.productImages.push({ filename, imageUrl })
    }
  },

  getters: {
    variants: state => state.product.variants,
    inStock: state => state.product.availableForSale,
    quantityInBasket: state => {
      let quantity = 0;

      state.lineItems.forEach((item: any) => {
        quantity += item.quantity
      })

      return quantity
    },
    imageByFilename: (state) => {
      return (filename: string) => state.productImages.find((image) => image.filename === filename)?.imageUrl
    },
    collectionProducts: state => state.collection.products
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}