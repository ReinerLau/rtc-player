import { ref } from "vue";
import type { Video } from "~/types";
import { SrsRtcPlayerAsync } from "~/utils";

export const usePlay = (videoList: Video[]) => {
  const srsList: SrsRtcPlayerAsync[] = [];
  const videoRefs = ref<HTMLVideoElement[]>();

  const play = (index: number, videoEl: HTMLVideoElement) => {
    const video = videoList[index];
    const url = video?.url;
    if (url) {
      const srs = new SrsRtcPlayerAsync();
      srsList.push(srs);
      videoEl.srcObject = srs.stream;
      video.isPlaying = true;
      srs.play(url);
    }
  };

  const closeAll = () => {
    srsList.forEach((srs) => {
      srs.close();
    });
    srsList.length = 0;
    videoList.forEach((video) => {
      video.isPlaying = false;
    });
  };

  return {
    play,
    closeAll,
    videoRefs,
  };
};
