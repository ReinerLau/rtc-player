import { ref, watch } from "vue";
import type { Group } from "~/types";
import { deleteGroupAPI, fetchAllGroup, postGroup } from "~/utils/api/group";

export const useGroup = () => {
  const groupFormVisible = ref(false);

  const addGroup = () => {
    groupFormVisible.value = true;
    groupFormTitle.value = "新增分组";
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

  const selectedGroup = ref<number | null>(null);

  const groupRelevantButtonVisible = ref(false);

  watch(selectedGroup, (value) => {
    if (value) {
      groupRelevantButtonVisible.value = true;
    } else {
      groupRelevantButtonVisible.value = false;
    }
  });

  const groupFormTitle = ref("新增分组");

  const editGroup = () => {
    groupFormVisible.value = true;
    groupFormTitle.value = "编辑分组";
    groupData.value = {
      ...groupList.value.find((item) => item.id === selectedGroup.value)!,
    };
  };

  const deleteGroup = async () => {
    await deleteGroupAPI(selectedGroup.value!);
    selectedGroup.value = null;
    await getGroup();
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
    editGroup,
    groupFormTitle,
    deleteGroup,
  };
};
