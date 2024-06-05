import { useFetch } from "nuxt/app";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import type { Video } from "~/types";
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
  } = useSetup();

  const videoList = ref<Video[]>([]);

  videoList.value = data.value;

  const saveVideoThenUpdate = async () => {
    const result = await saveVideo();
    if (result) {
      videoList.value = result;
    } else {
      toast.add({ severity: "warn", summary: "请补充完整信息" });
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
  };
};
