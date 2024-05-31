import type { Video } from "~/types";

export const fetchAllVideo = async (): Promise<Video[]> => {
  return await $fetch("/api/video");
};
