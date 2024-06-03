import { SrsRtcPlayerAsync } from "rtc-streamer";
import type { PlayAllParams, Video } from "~/types";
import { getIndex } from "~/utils";

export const usePlay = (videoList: Video[]) => {
  const playAll = ({ page, elementList }: PlayAllParams) => {
    const total = elementList.length;
    elementList.forEach((videoEl, index) => {
      const srs = new SrsRtcPlayerAsync();
      videoEl.srcObject = srs.stream;
      srs.play(videoList[getIndex(page, total, index)].url);
    });
  };

  return {
    playAll,
  };
};
