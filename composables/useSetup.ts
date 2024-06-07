import Sortable, { type SortableEvent } from "sortablejs";
import { ref } from "vue";
import type { Video } from "~/types";
import {
  deleteVideoAPI,
  fetchAllVideo,
  postVideo,
  sortVideoAPI,
} from "~/utils/api/video";
import { useGroup } from "./useGroup";
export const enum Mode {
  GROUP,
  VIDEO,
}

export const useSetup = () => {
  const {
    addGroup,
    groupFormVisible,
    saveGroup,
    groupData,
    cancelGroup,
    groupList,
    getGroup,
    selectedGroup,
    groupRelevantButtonVisible,
    groupFormTitle,
    editGroup,
    deleteGroup,
  } = useGroup();

  const visible = ref(false);

  const videoList = ref<Video[]>([]);

  let sortable: Sortable;
  const setupVideoRefs = ref<HTMLElement>();

  const showSidebar = async () => {
    visible.value = true;

    await getVideo();
    await getGroup();

    sortable = new Sortable(setupVideoRefs.value!, {
      animation: 150,
      onEnd: onSortEnd,
    });
  };

  const isSortable = () => {
    return sortable ? true : false;
  };

  const onSortEnd = ({ oldIndex, newIndex }: SortableEvent) => {
    updateOrder(oldIndex!, newIndex!);
  };

  const updateOrder = async (oldIndex: number, newIndex: number) => {
    await sortVideoAPI(oldIndex, newIndex);
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
      return false;
    }
    await postVideo({
      ...videoData.value,
      groupId: selectedGroup.value!,
    });
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
    updateOrder,
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
  };
};
