import type { Video } from "~/types";

export const fetchVideoByGroup = async (groupId: number): Promise<Video[]> => {
  return await $fetch("/api/video", {
    method: "get",
    query: {
      groupId,
    },
  });
};

export const postVideo = async (body: Video) => {
  if (body.id) {
    await $fetch("/api/video", {
      method: "put",
      body,
    });
  } else {
    await $fetch("/api/video", {
      method: "post",
      body,
    });
  }
};

export const deleteVideoAPI = async (id: number) => {
  await $fetch(`/api/video/${id}`, {
    method: "delete",
  });
};

export const sortVideoAPI = async (
  oldIndex: number,
  newIndex: number,
  groupId: number
) => {
  await $fetch("/api/video/sort", {
    method: "put",
    body: {
      oldIndex,
      newIndex,
      groupId,
    },
  });
};
