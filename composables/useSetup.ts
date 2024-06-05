import Sortable from "sortablejs";
import { ref } from "vue";
import type { Video } from "~/types";
import { deleteVideoAPI, fetchAllVideo, postVideo } from "~/utils/api/video";

export const useSetup = () => {
  const visible = ref(false);

  const videoList = ref<Video[]>([]);

  let sortable: Sortable;
  const setupVideoRefs = ref<HTMLElement>();

  const showSidebar = async () => {
    visible.value = true;

    await getVideo();

    sortable = new Sortable(setupVideoRefs.value!, {
      animation: 150,
    });
  };

  const isSortable = () => {
    return sortable ? true : false;
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
    setupVideoRefs,
    isSortable,
  };
};
