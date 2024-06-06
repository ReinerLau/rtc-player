import { useFetch } from "nuxt/app";
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
  const { data } = await useFetch("/api/video");
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
  } = useSetup();

  const videoList = ref<Video[]>([]);

  videoList.value = data.value;

  const { play, closeAll, videoRefs, srsList } = usePlay();
  const { colCount, total, increCount, decreCount } = useLayout(1);
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

  const controlButtons = computed(() => [
    {
      icon: "pi pi-cog",
      command: showSidebar,
    },
    {
      icon: "pi pi-plus",
      command() {
        increCount();
        pullStream();
      },
      disabled: total.value === 9,
    },
    {
      icon: "pi pi-minus",
      command() {
        decreCount();
        pullStream();
      },
      disabled: total.value === 1,
    },
    {
      icon: "pi pi-chevron-right",
      command() {
        forward();
        pullStream();
      },
    },
    {
      icon: "pi pi-chevron-left",
      command() {
        backward();
        pullStream();
      },
      disabled: page.value === 1,
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

  const contextItems = [
    {
      icon: "pi pi-refresh",
      label: "重连",
      command: pullStream,
    },
    {
      icon: "pi pi-expand",
      label: "全屏",
      command: fullScreen,
    },
  ];

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
    pullStream,
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
  };
};
