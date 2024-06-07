import { ref } from "vue";
import type { Group } from "~/types";
import { postGroup } from "~/utils/api/group";

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

  return {
    addGroup,
    groupFormVisible,
    saveGroup,
    groupData,
    cancelGroup,
  };
};
