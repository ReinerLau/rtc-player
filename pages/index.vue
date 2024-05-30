<template>
  <div
    class="w-screen h-screen bg-black grid gap-2 p-2 grid-cols-2"
    :style="{
      gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
    }"
  >
    <div
      v-for="index in total"
      class="relative bg-[#161616] rounded text-white flex justify-center items-center hover:border-2 hover:border-[#00d67d] border-2 border-[#161616] cursor-pointer select-none"
    >
      <div class="absolute top-5 left-5">
        {{ videoList[index - 1]?.name || "" }}
      </div>
      <span class="text-9xl">
        {{ index }}
      </span>
    </div>
    <div class="absolute bottom-10 right-10 flex gap-x-2">
      <UButton
        color="black"
        :ui="{ rounded: 'rounded-full' }"
        icon="i-heroicons-chevron-left"
      />
      <UButton
        :disabled="total === 1"
        color="black"
        :ui="{ rounded: 'rounded-full' }"
        icon="i-heroicons-minus"
        @click="decreCount"
      />
      <UButton
        :disabled="total === 9"
        :ui="{ rounded: 'rounded-full' }"
        icon="i-heroicons-plus"
        @click="increCount"
      />
      <UButton
        color="black"
        :ui="{ rounded: 'rounded-full' }"
        icon="i-heroicons-chevron-right"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFetch } from "nuxt/app";
import { ref } from "vue";
import { useLayout } from "~/composables/useLayout";
import type { Video } from "../types";

const { colCount, total, increCount, decreCount } = useLayout(1);

const { data } = await useFetch("/api/video");

const videoList = ref<Video[]>([]);

videoList.value = data.value;
</script>

<style>
html {
  background-color: #000;
}
</style>
