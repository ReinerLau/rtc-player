import { computed, ref } from "vue";

export const useLayout = (col: number) => {
  const colCount = ref(col);

  const total = computed(() => colCount.value * colCount.value);

  const increCount = () => {
    if (colCount.value < 3) {
      colCount.value++;
    }
  };

  const decreCount = () => {
    if (colCount.value > 1) {
      colCount.value--;
    }
  };

  return {
    colCount,
    total,
    increCount,
    decreCount,
  };
};
