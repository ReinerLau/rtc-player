import type { Group } from "~/types";

export const fetchAllGroup = async () => {
  return await $fetch("/api/group");
};

export const postGroup = async (body: Group) => {
  if (body.id) {
    await $fetch("/api/group", {
      method: "put",
      body,
    });
  } else {
    await $fetch("/api/group", {
      method: "post",
      body,
    });
  }
};

export const deleteGroupAPI = async (id: number) => {
  await $fetch(`/api/group/${id}`, {
    method: "delete",
  });
};
