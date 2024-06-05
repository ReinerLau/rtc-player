import { ref } from "vue";
import type { PlayAllParams, Video } from "~/types";
import { getIndex, SrsRtcPlayerAsync } from "~/utils";

export const usePlay = (videoList: Video[]) => {
  const srsList: SrsRtcPlayerAsync[] = [];
  const videoRefs = ref<HTMLVideoElement[]>();

  const playAll = ({ page }: PlayAllParams) => {
    const videoEls = videoRefs.value!;
    const total = videoEls.length;
    videoEls.forEach((videoEl, index) => {
      const video = videoList[getIndex(page, total, index)];
      const url = video?.url;
      if (url) {
        const srs = new SrsRtcPlayerAsync();
        srsList.push(srs);
        videoEl.srcObject = srs.stream;
        video.isPlaying = true;
        srs.play(url);
      }
    });
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
    playAll,
    closeAll,
    videoRefs,
  };
};
