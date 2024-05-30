import { ref } from "vue";

export const usePage = (initialPage: number = 1) => {
  const page = ref(initialPage);

  const forward = () => {
    page.value++;
  };

  const backward = () => {
    if (page.value > 1) {
      page.value--;
    }
  };

  const getIndex = (total: number, index: number) => {
    return (page.value - 1) * total + index;
  };

  return {
    page,
    forward,
    backward,
    getIndex,
  };
};
