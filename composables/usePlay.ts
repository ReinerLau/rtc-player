import { SrsRtcPlayerAsync } from "rtc-streamer";
import type { PlayAllParams, Video } from "~/types";

export const usePlay = (videoList: Video[]) => {
  const playAll = ({ page, elementList }: PlayAllParams) => {
    const total = elementList.length;
    elementList.forEach((videoEl, index) => {
      const srs = new SrsRtcPlayerAsync();
      videoEl.srcObject = srs.stream;
      srs.play(videoList[getIndex(page, total, index)].url);
    });
  };

  const getIndex = (page: number, total: number, index: number) => {
    return (page - 1) * total + index;
  };

  return {
    playAll,
  };
};
