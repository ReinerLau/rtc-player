<template>
  <div
    class="w-screen h-screen bg-black grid gap-2 p-2 grid-cols-2"
    :style="{
      gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
    }"
  >
    <div
      v-for="item in total"
      class="bg-[#161616] rounded text-white flex justify-center items-center hover:border-2 hover:border-[#00d67d] text-9xl border-2 border-[#161616]"
    >
      {{ item }}
    </div>
    <div class="absolute bottom-10 right-10 flex gap-x-2">
      <UButton
        color="black"
        :ui="{ rounded: 'rounded-full' }"
        icon="i-heroicons-chevron-left"
      />
      <UButton
        :disabled="colCount === 1"
        color="black"
        :ui="{ rounded: 'rounded-full' }"
        icon="i-heroicons-minus"
        @click="decreCount"
      />
      <UButton
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
import { useLayout } from "~/composables/useLayout";

const { colCount, total, increCount, decreCount } = useLayout(1);
</script>

<style>
html {
  background-color: #000;
}
</style>
