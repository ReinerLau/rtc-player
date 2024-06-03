import { describe, expect, it, vi } from "vitest";
import { usePlay } from "~/composables/usePlay";
import type { Video } from "~/types";

describe("播放视频", () => {
  const play = vi.hoisted(() => vi.fn());
  vi.mock("~/utils", async (importOriginal) => {
    const mod = await importOriginal<typeof import("~/utils")>();
    return {
      ...mod,
      SrsRtcPlayerAsync: vi.fn(() => ({
        play,
      })),
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
    const videoEls = [document.createElement("video")];
    const { playAll } = usePlay(videoList);

    playAll({
      page,
      videoEls,
    });

    expect(play).toHaveBeenCalledWith(videoList[0].url);
  });
});
