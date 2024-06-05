import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import type { Video } from "~/types";
import { deleteVideoAPI, fetchAllVideo, postVideo } from "~/utils/api/video";

export const useSetup = () => {
  const toast = useToast();

  const visible = ref(false);

  const videoList = ref<Video[]>([]);

  const showSidebar = async () => {
    visible.value = true;

    await getVideo();
  };

  const videoFormVisible = ref(false);

  const addVideo = () => {
    videoFormVisible.value = true;
    formTitle.value = "添加视频";
  };

  const cancelVideo = () => {
    videoFormVisible.value = false;
    clearVideo();
  };

  const saveVideo = async () => {
    if (!videoData.value.name || !videoData.value.url) {
      toast.add({ severity: "warn", summary: "请补充完整信息" });
      return false;
    }
    await postVideo(videoData.value);
    videoFormVisible.value = false;
    clearVideo();
    const result = await getVideo();
    return result;
  };

  const getVideo = async () => {
    const data = await fetchAllVideo();
    videoList.value = data;
    return data;
  };

  const deleteVideo = async (id: number) => {
    await deleteVideoAPI(id);
    await getVideo();
  };

  const clearVideo = () => {
    videoData.value = {
      name: "",
      url: "",
    };
  };

  const videoData = ref<Video>({
    name: "",
    url: "",
  });

  const editVideo = (data: Video) => {
    videoFormVisible.value = true;
    videoData.value = { ...data };
    formTitle.value = "编辑视频";
  };

  const formTitle = ref("添加视频");

  return {
    visible,
    showSidebar,
    videoList,
    videoFormVisible,
    addVideo,
    saveVideo,
    videoData,
    cancelVideo,
    editVideo,
    formTitle,
    deleteVideo,
  };
};
