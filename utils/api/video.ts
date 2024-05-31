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
