<template>
  <div
    class="w-screen h-screen bg-black grid gap-2 p-2 grid-cols-2"
    :style="{
      gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
    }"
  >
    <div
      v-for="index in total"
      class="relative bg-[#161616] rounded text-white flex justify-center items-center hover:border-2 hover:border-[#00d67d] border-2 border-[#161616] cursor-pointer select-none overflow-hidden"
    >
      <div class="absolute top-5 left-5">
        {{ videoList[getIndex(page, total, index - 1)]?.name || "" }}
      </div>
      <span class="absolute top-5 right-5">
        {{ getIndex(page, total, index - 1) + 1 }}
      </span>
      <video
        class="w-full h-full object-fill"
        ref="videoRefs"
        autoplay
        muted
        loop
      />
    </div>
    <ContextMenu global :model="contextItems" />
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
    <template #default>
      <div ref="setupVideoRefs">
        <div v-for="video in setupVideoList" :key="video.id">
          <Panel class="mb-2" :header="video.name">
            <template #icons>
              <Button
                icon="pi pi-cog"
                size="small"
                text
                rounded
                @click="() => editVideo(video)"
              />
              <Button
                icon="pi pi-trash"
                size="small"
                text
                rounded
                @click="() => deleteVideo(video.id!)"
              />
            </template>
            <template #default>
              <div class="text-ellipsis overflow-hidden">
                {{ video.url }}
              </div>
            </template>
          </Panel>
        </div>
      </div>
    </template>
  </Sidebar>
  <Dialog
    v-model:visible="videoFormVisible"
    modal
    :header="formTitle"
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
      <Button label="保存" @click="afterSaveVideo"></Button>
    </template>
  </Dialog>
  <Toast />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useIndex } from "~/composables/useIndex";
import { getIndex } from "../utils";

const {
  videoList,
  afterSaveVideo,
  visible,
  videoList: setupVideoList,
  videoFormVisible,
  addVideo,
  cancelVideo,
  videoData,
  editVideo,
  formTitle,
  deleteVideo,
  setupVideoRefs,
  videoRefs,
  pullStream,
  total,
  page,
  colCount,
  controlButtons,
  contextItems,
} = await useIndex();

onMounted(() => {
  pullStream();
});
</script>

<style>
html {
  background-color: #000;
}
</style>
