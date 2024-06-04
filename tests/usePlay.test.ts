import { describe, expect, it, vi } from "vitest";
import { usePlay } from "~/composables/usePlay";
import type { Video } from "~/types";

describe("播放视频", () => {
  vi.mock("~/utils", async (importOriginal) => {
    const mod = await importOriginal<typeof import("~/utils")>();
    return {
      ...mod,
      SrsRtcPlayerAsync: vi.fn(() => ({
        play: vi.fn(),
        close: vi.fn(),
      })),
    };
  });
  const videoList: Video[] = [
    {
      id: 1,
      name: "test",
      url: "test",
    },
    {
      id: 2,
      name: "test1",
      url: "test1",
    },
  ];
  const page = 1;
  const videoEls = [
    document.createElement("video"),
    document.createElement("video"),
  ];

  it("happy path", () => {
    const { playAll } = usePlay(videoList);

    playAll({
      page,
      videoEls,
    });
    const isPlayingVideoCount = videoList.filter(
      (video) => video.isPlaying
    ).length;

    expect(isPlayingVideoCount).toBe(2);
  });

  it("每次拉流前先关闭已有视频流", () => {
    const { closeAll, playAll } = usePlay(videoList);

    playAll({
      page,
      videoEls,
    });

    closeAll();

    const isPlayingVideoCount = videoList.filter(
      (video) => video.isPlaying
    ).length;

    expect(isPlayingVideoCount).toBe(0);
  });
});
