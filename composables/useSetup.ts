import { ref } from "vue";
import type { Video } from "~/types";
import { fetchAllVideo } from "~/utils/api/video";

export const useSetup = () => {
  const visible = ref(false);

  const videoList = ref<Video[]>([]);

  const showSidebar = async () => {
    visible.value = true;

    const data = await fetchAllVideo();
    videoList.value = data;
  };

  return {
    visible,
    showSidebar,
    videoList,
  };
};
