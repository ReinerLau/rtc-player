import { ref } from "vue";

export const useGroup = () => {
  const groupFormVisible = ref(false);

  const addGroup = () => {
    groupFormVisible.value = true;
  };

  return {
    addGroup,
    groupFormVisible,
  };
};
