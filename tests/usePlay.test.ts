import { describe, expect, it, vi } from "vitest";
import { usePlay } from "~/composables/usePlay";
import type { Video } from "~/types";

describe("播放视频", () => {
  const play = vi.hoisted(() => vi.fn());
  vi.mock("rtc-streamer", () => {
    const SrsRtcPlayerAsync = vi.fn(() => ({
      play,
    }));
    return {
      SrsRtcPlayerAsync,
    };
  });

  it("happy path", () => {
    const videoList: Video[] = [
      {
        id: 1,
        name: "test",
        url: "test",
      },
    ];
    const page = 1;
    const elementList = [document.createElement("video")];
    const { playAll } = usePlay(videoList);

    playAll({
      page,
      elementList,
    });

    expect(play).toHaveBeenCalledWith(videoList[0].url);
  });
});
