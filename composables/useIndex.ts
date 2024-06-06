import { useFetch } from "nuxt/app";
import { useToast } from "primevue/usetoast";
import { nextTick, ref, watch } from "vue";
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

  const { play, closeAll, videoRefs } = usePlay(videoList.value);
  const { colCount, total, increCount, decreCount } = useLayout(1);
  const { page, forward, backward } = usePage();

  watch(setupVideoList, () => {
    videoList.value = setupVideoList.value;
  });

  const saveVideoThenUpdate = async () => {
    const result = await saveVideo();
    if (!result) {
      toast.add({ severity: "warn", summary: "请补充完整信息" });
    }
  };

  const pullStream = async () => {
    await nextTick();
    closeAll();
    for (let videoElIndex = 0; videoElIndex < total.value; videoElIndex++) {
      const videoIndex = getIndex(page.value, total.value, videoElIndex);
      const videoEl = videoRefs.value![videoElIndex];
      play(videoIndex, videoEl);
    }
  };

  return {
    videoList,
    saveVideoThenUpdate,
    visible,
    showSidebar,
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
    increCount,
    colCount,
    decreCount,
    forward,
    backward,
    total,
    page,
  };
};
