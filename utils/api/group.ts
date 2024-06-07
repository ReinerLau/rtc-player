import type { Group } from "~/types";

export const fetchAllGroup = async () => {
  return await $fetch("/api/group");
};

export const postGroup = async (body: Group) => {
  await $fetch("/api/group", {
    method: "post",
    body,
  });
};
