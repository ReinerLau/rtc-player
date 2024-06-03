import { ref } from "vue";
import type { Video } from "~/types";
import { deleteVideoAPI, fetchAllVideo, postVideo } from "~/utils/api/video";

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
    formTitle.value = "添加视频";
  };

  const cancelVideo = () => {
    videoFormVisible.value = false;
    clearVideo();
  };

  const saveVideo = async () => {
    await postVideo(videoData.value);
    videoFormVisible.value = false;
    clearVideo();
    await getVideo();
  };

  const getVideo = async () => {
    const data = await fetchAllVideo();
    videoList.value = data;
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
