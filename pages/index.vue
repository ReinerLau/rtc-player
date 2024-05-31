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
        {{ videoList[getIndex(total, index) - 1]?.name || "" }}
      </div>
      <span class="text-9xl">
        {{ getIndex(total, index) }}
      </span>
    </div>
    <SpeedDial
      :model="controlButtons"
      direction="left"
      class="bottom-10 right-10"
      :hideOnClickOutside="false"
    />
  </div>
  <Sidebar v-model:visible="visible" position="right">
    <template #header>
      <div class="text-right">
        <Button class="mb-2" icon="pi pi-plus" size="small" @click="addVideo" />
      </div>
    </template>
    <Panel class="mb-2" v-for="video in setupVideoList" :header="video.name">
      <template #icons>
        <Button icon="pi pi-cog" size="small" text rounded />
      </template>
      <template #default>
        {{ video.url }}
      </template>
    </Panel>
  </Sidebar>
  <Dialog
    v-model:visible="videoFormVisible"
    modal
    header="添加视频"
    @hide="cancelVideo"
  >
    <template #default>
      <div class="flex items-center gap-3 mb-2">
        <span>名称</span>
        <InputText
          v-model="videoData.name"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-3 mb-2">
        <span>地址</span>
        <InputText
          v-model="videoData.url"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
    </template>
    <template #footer>
      <Button severity="secondary" label="取消" @click="cancelVideo"></Button>
      <Button label="保存" @click="saveVideo"></Button>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { useFetch } from "nuxt/app";
import { computed, ref } from "vue";
import { useLayout } from "~/composables/useLayout";
import { useSetup } from "~/composables/useSetup";
import { usePage } from "../composables/usePage";
import type { Video } from "../types";

const { colCount, total, increCount, decreCount } = useLayout(1);

const { page, forward, backward, getIndex } = usePage();

const {
  visible,
  showSidebar,
  videoList: setupVideoList,
  videoFormVisible,
  addVideo,
  cancelVideo,
  saveVideo,
  videoData,
} = useSetup();

const { data } = await useFetch("/api/video");

const videoList = ref<Video[]>([]);

videoList.value = data.value;

const controlButtons = computed(() => [
  {
    icon: "pi pi-cog",
    command: showSidebar,
  },
  {
    icon: "pi pi-plus",
    command: increCount,
    disabled: total.value === 9,
  },
  {
    icon: "pi pi-minus",
    command: decreCount,
    disabled: total.value === 1,
  },
  {
    icon: "pi pi-chevron-right",
    command: forward,
  },
  {
    icon: "pi pi-chevron-left",
    command: backward,
    disabled: page.value === 1,
  },
]);
</script>

<style>
html {
  background-color: #000;
}
</style>
