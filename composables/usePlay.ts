import type { PlayAllParams, Video } from "~/types";
import { getIndex, SrsRtcPlayerAsync } from "~/utils";

export const usePlay = (videoList: Video[]) => {
  const srsList: SrsRtcPlayerAsync[] = [];

  const playAll = ({ page, videoEls }: PlayAllParams) => {
    closeAll();
    const total = videoEls.length;
    videoEls.forEach((videoEl, index) => {
      const srs = new SrsRtcPlayerAsync();
      srsList.push(srs);
      videoEl.srcObject = srs.stream;
      const url = videoList[getIndex(page, total, index)]?.url;
      if (url) {
        srs.play(url);
      }
    });
  };

  const closeAll = () => {
    srsList.forEach((srs) => {
      srs.close();
    });
    srsList.length = 0;
  };

  return {
    playAll,
  };
};
