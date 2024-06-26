import type { Video } from "~/types";

export const fetchAllVideo = async (): Promise<Video[]> => {
  return await $fetch("/api/video");
};

export const postVideo = async (body: Video) => {
  if (body.id) {
    await $fetch("/api/video", {
      method: "put",
      body: body,
    });
  } else {
    await $fetch("/api/video", {
      method: "post",
      body: body,
    });
  }
};

export const deleteVideoAPI = async (id: number) => {
  await $fetch(`/api/video/${id}`, {
    method: "delete",
  });
};

export const sortVideoAPI = async (oldIndex: number, newIndex: number) => {
  await $fetch("/api/video/sort", {
    method: "put",
    body: {
      oldIndex,
      newIndex,
    },
  });
};
