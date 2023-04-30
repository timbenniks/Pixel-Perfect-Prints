<script setup lang="ts">
import {
  SfButton,
  SfInput,
  SfIconPerson,
  SfIconLock,
} from "@storefront-ui/vue";

const user = useSupabaseUser();
const authClient = useSupabaseAuthClient();
const client = useSupabaseClient();

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const login = async () => {
  const { error } = await authClient.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  email.value = "";
  password.value = "";

  if (error) {
    errorMessage.value = error.message;
  }
};

const { data: sheets, error } = await client.storage
  .from("sheet-storage")
  .list("public");

const baseUrl =
  "https://uxpbzvebrdnnuxomvqoz.supabase.co/storage/v1/object/public/sheet-storage/public/";
const sheetsToList = computed(() => {
  return sheets?.filter((sheet) => sheet.name != ".emptyFolderPlaceholder");
});

function imageUlr(filename: string) {
  const url = baseUrl + filename;

  return url;
}

async function downloadSheet(filename: string) {
  const blob = await client.storage
    .from("sheet-storage")
    .download(`public/${filename}`);

  const blobUrl = window.URL.createObjectURL(blob.data as Blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(blobUrl);
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
</script>

<template>
  <header
    class="sticky top-0 left-0 w-full h-[100px] bg-[#FFE7C1] border-b-2 border-[#F9C066]"
  >
    <div class="max-w-7xl mx-auto">
      <logoSmall class="w-[400px] pt-4 pl-4" />
    </div>
  </header>

  <div class="max-w-7xl mx-auto mt-8">
    <form
      v-if="!user"
      @submit.prevent="login"
      class="max-w-3xl mx-auto p-8 bg-[#fff] border-[#F9C066] border rounded"
    >
      <div
        v-if="errorMessage"
        role="alert"
        class="shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm py-1 rounded mb-4"
      >
        <p class="py-2 mr-2">{{ errorMessage }}</p>
      </div>

      <div class="mb-4">
        <label>
          <span class="text-sm font-medium">Email</span>
          <SfInput v-model="email" type="email" required>
            <template #prefix><SfIconPerson /></template>
          </SfInput>
        </label>
      </div>

      <div class="mb-4">
        <label>
          <span class="text-sm font-medium">Password</span>
          <SfInput v-model="password" type="password" required>
            <template #prefix><SfIconLock /></template>
          </SfInput>
        </label>
      </div>
      <SfButton type="submit">login</SfButton>
    </form>

    <div v-else>
      <ul>
        <li
          v-for="sheet in sheetsToList"
          :key="sheet.id"
          class="flex mb-4 bg-white p-2"
        >
          <img
            :src="imageUlr(sheet.name)"
            :alt="sheet.name"
            width="150"
            class="mr-4 border-2 border-[#F9C066] p-2 bg-white cursor-pointer"
            @click="downloadSheet(sheet.name)"
          />
          <ul class="flex flex-col justify-center">
            <li class="font-bold text-lg mb-2">
              {{
                new Date(sheet.created_at).toLocaleDateString("nl-NL", {
                  dateStyle: "full",
                })
              }}
            </li>
            <li class="text-sm">
              {{ sheet.name }}
            </li>
            <li class="text-sm">
              {{ sheet.metadata.mimetype }},
              {{ formatBytes(sheet.metadata.size) }}
            </li>
            <li class="mt-4">
              <SfButton size="sm" @click="downloadSheet(sheet.name)"
                >Download</SfButton
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
