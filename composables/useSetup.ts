import { ref } from "vue";
import type { Video } from "~/types";
import { fetchAllVideo, postVideo } from "~/utils/api/video";

export const useSetup = () => {
  const visible = ref(false);

  const videoList = ref<Video[]>([]);

  const showSidebar = async () => {
    visible.value = true;

    await getVideo();
  };

  const videoFormVisible = ref(false);

  const addVideo = () => {
    videoFormVisible.value = true;
  };

  const cancelVideo = () => {
    videoFormVisible.value = false;
    clearVideo();
  };

  const saveVideo = async () => {
    videoFormVisible.value = false;
    await postVideo(videoData.value);
    clearVideo();
    await getVideo();
  };

  const getVideo = async () => {
    const data = await fetchAllVideo();
    videoList.value = data;
  };

  const clearVideo = () => {
    videoData.value = {
      name: "",
      url: "",
    };
  };

  const videoData = ref({
    name: "",
    url: "",
  });

  return {
    visible,
    showSidebar,
    videoList,
    videoFormVisible,
    addVideo,
    saveVideo,
    videoData,
    cancelVideo,
  };
};
