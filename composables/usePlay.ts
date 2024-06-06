import { ref } from "vue";
import { SrsRtcPlayerAsync } from "~/utils";

export const usePlay = () => {
  const srsList = ref<SrsRtcPlayerAsync[]>([]);
  const videoRefs = ref<HTMLVideoElement[]>();

  const play = (url: string) => {
    const srs = new SrsRtcPlayerAsync();
    srsList.value.push(srs);
    if (url) {
      srs.play(url);
    }
  };

  const closeAll = () => {
    srsList.value.forEach((srs) => {
      srs.close();
    });
    srsList.value.length = 0;
    videoRefs.value?.forEach((videoEl) => {
      videoEl.srcObject = null;
    });
  };

  return {
    play,
    closeAll,
    videoRefs,
    srsList,
  };
};
