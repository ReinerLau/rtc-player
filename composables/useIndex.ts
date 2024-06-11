import { useToast } from "primevue/usetoast";
import { computed, nextTick, ref, watch } from "vue";
import type { Video } from "~/types";
import { getIndex } from "~/utils";
import { useLayout } from "./useLayout";
import { usePage } from "./usePage";
import { usePlay } from "./usePlay";
import { useSetup } from "./useSetup";

export const useIndex = async () => {
  const toast = useToast();
  const {
    visible,
    showSidebar,
    videoList: setupVideoList,
    videoFormVisible,
    addVideo,
    cancelVideo,
    saveVideo,
    videoData,
    editVideo,
    formTitle,
    deleteVideo,
    setupVideoRefs,
    groupList,
    selectedGroup,
    groupRelevantButtonVisible,
    groupFormVisible,
    addGroup,
    saveGroup,
    groupData,
    cancelGroup,
    groupFormTitle,
    editGroup,
    deleteGroup,
  } = useSetup();

  const videoList = ref<Video[]>([]);

  const { play, closeAll, videoRefs, srsList } = usePlay();
  const { colCount, total, increCount, decreCount } = useLayout(2);
  const { page, forward, backward } = usePage();

  watch(setupVideoList, async () => {
    videoList.value = setupVideoList.value;
    pullStream();
  });

  const afterSaveVideo = async () => {
    const result = await saveVideo();
    if (!result) {
      toast.add({ severity: "warn", summary: "请补充完整信息" });
    }
  };

  const pullStream = async () => {
    closeAll();
    for (let videoElIndex = 0; videoElIndex < total.value; videoElIndex++) {
      const videoIndex = getIndex(page.value, total.value, videoElIndex);
      const url = videoList.value[videoIndex]?.url;
      play(url);
    }
    await nextTick();
    srsList.value.forEach((srs, index) => {
      if (videoRefs.value) {
        const videoEl = videoRefs.value[index];
        videoEl.srcObject = srs.stream;
      }
    });
  };

  const increVideoCount = () => {
    const oldMinIndex = getIndex(page.value, total.value, 0);
    increCount();
    let newMinIndex = getIndex(page.value, total.value, 0);
    while (oldMinIndex < newMinIndex) {
      page.value--;
      newMinIndex = getIndex(page.value, total.value, 0);
    }
  };

  const decreVideoCount = () => {
    const oldMinIndex = getIndex(page.value, total.value, 0);
    decreCount();
    let newMaxIndex = getIndex(page.value, total.value, total.value - 1);
    while (oldMinIndex > newMaxIndex) {
      page.value++;
      newMaxIndex = getIndex(page.value, total.value, total.value - 1);
    }
  };

  const controlButtons = computed(() => [
    {
      icon: "pi pi-cog",
      command: showSidebar,
    },
    {
      icon: "pi pi-chevron-right",
      command() {
        forward();
        pullStream();
      },
      disabled: total.value === 4 || page.value === 4,
    },
    {
      icon: "pi pi-chevron-left",
      command() {
        backward();
        pullStream();
      },
      disabled: total.value === 4 || page.value === 1,
    },
  ]);

  let curVideoIndex: number;

  const getCurVideoIndex = () => {
    return curVideoIndex;
  };

  const onContextMenu = (index: number) => {
    curVideoIndex = index;
  };

  const fullScreen = () => {
    page.value = curVideoIndex + 1;
    colCount.value = 1;
    pullStream();
  };

  const exitFullScreen = () => {
    page.value = 1;
    colCount.value = 2;
    pullStream();
  };

  const contextItems = computed(() => [
    {
      icon: "pi pi-refresh",
      label: "重连",
      command: pullStream,
    },
    {
      icon: `pi ${
        total.value === 4
          ? "pi-arrow-up-right-and-arrow-down-left-from-center"
          : "pi-arrow-down-left-and-arrow-up-right-to-center"
      }`,
      label: total.value === 4 ? "全屏" : "退出全屏",
      command: total.value === 4 ? fullScreen : exitFullScreen,
    },
  ]);

  const videoIndex = (index: number) => {
    return getIndex(page.value, total.value, index - 1);
  };

  return {
    videoList,
    afterSaveVideo,
    visible,
    setupVideoList,
    videoFormVisible,
    addVideo,
    cancelVideo,
    saveVideo,
    videoData,
    editVideo,
    formTitle,
    deleteVideo,
    setupVideoRefs,
    play,
    videoRefs,
    colCount,
    total,
    page,
    srsList,
    controlButtons,
    contextItems,
    onContextMenu,
    getCurVideoIndex,
    fullScreen,
    videoIndex,
    increVideoCount,
    decreVideoCount,
    groupList,
    selectedGroup,
    groupRelevantButtonVisible,
    groupFormVisible,
    addGroup,
    saveGroup,
    groupData,
    cancelGroup,
    groupFormTitle,
    editGroup,
    deleteGroup,
    exitFullScreen,
  };
};
