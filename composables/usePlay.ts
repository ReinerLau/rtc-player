import type { PlayAllParams, Video } from "~/types";
import { getIndex, SrsRtcPlayerAsync } from "~/utils";

export const usePlay = (videoList: Video[]) => {
  const playAll = ({ page, videoEls }: PlayAllParams) => {
    const total = videoEls.length;
    videoEls.forEach((videoEl, index) => {
      const srs = new SrsRtcPlayerAsync();
      videoEl.srcObject = srs.stream;
      const url = videoList[getIndex(page, total, index)]?.url;
      if (url) {
        srs.play(url);
      }
    });
  };

  return {
    playAll,
  };
};
