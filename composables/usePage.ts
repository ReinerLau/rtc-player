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

  return {
    page,
    forward,
    backward,
  };
};
