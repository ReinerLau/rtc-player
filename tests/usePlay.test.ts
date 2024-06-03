import { describe, expect, it, vi } from "vitest";
import { usePlay } from "~/composables/usePlay";
import type { Video } from "~/types";

describe("播放视频", () => {
  const play = vi.hoisted(() => vi.fn());
  const close = vi.hoisted(() => vi.fn());
  vi.mock("~/utils", async (importOriginal) => {
    const mod = await importOriginal<typeof import("~/utils")>();
    return {
      ...mod,
      SrsRtcPlayerAsync: vi.fn(() => ({
        play,
        close,
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

    expect(play).toHaveBeenCalledWith(videoList[0].url);
    expect(play).toHaveBeenCalledWith(videoList[1].url);
  });

  it("每次拉流前先关闭已有视频流", () => {
    const videoList: Video[] = [
      {
        id: 1,
        name: "test",
        url: "test",
      },
    ];
    const { playAll } = usePlay(videoList);

    playAll({
      page,
      videoEls,
    });
    playAll({
      page,
      videoEls,
    });

    expect(close).toBeCalledTimes(2);
  });
});
