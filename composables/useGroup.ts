import { ref } from "vue";
import type { Group } from "~/types";
import { fetchAllGroup, postGroup } from "~/utils/api/group";

export const useGroup = () => {
  const groupFormVisible = ref(false);

  const addGroup = () => {
    groupFormVisible.value = true;
  };

  const groupData = ref<Group>({
    name: "",
  });

  const saveGroup = async () => {
    await postGroup(groupData.value);
    groupFormVisible.value = false;
    clearGroup();
    await getGroup();
  };

  const clearGroup = () => {
    groupData.value = {
      name: "",
    };
  };

  const cancelGroup = () => {
    groupFormVisible.value = false;
    clearGroup();
  };

  const groupList = ref<Group[]>([]);

  const getGroup = async () => {
    const data = await fetchAllGroup();
    groupList.value = data;
  };

  const selectedGroup = ref<number>();

  const groupRelevantButtonVisible = ref(false);

  const selectGroup = (value: number) => {
    if (value) {
      groupRelevantButtonVisible.value = true;
    }
  };

  return {
    addGroup,
    groupFormVisible,
    saveGroup,
    groupData,
    cancelGroup,
    groupList,
    getGroup,
    selectedGroup,
    groupRelevantButtonVisible,
    selectGroup,
  };
};
