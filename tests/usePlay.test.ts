import { describe, expect, it, vi } from "vitest";
import { usePlay } from "~/composables/usePlay";
import type { Video } from "~/types";
import { getIndex } from "~/utils";

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

  it("同时拉取多个视频流", () => {
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
    const total = 4;
    const { play, srsList } = usePlay();

    for (let videoElIndex = 0; videoElIndex < total; videoElIndex++) {
      const videoIndex = getIndex(1, total, videoElIndex);
      const url = videoList[videoIndex]?.url;
      play(url);
    }

    expect(srsList.value).toHaveLength(4);
  });

  it("每次拉流前先关闭已有视频流", () => {
    const videoList: Video[] = [
      {
        id: 1,
        name: "test",
        url: "test",
      },
    ];
    const { closeAll, play, videoRefs } = usePlay();
    videoRefs.value = [document.createElement("video")];

    play(videoList[0].url);
    closeAll();

    expect(
      videoRefs.value?.every((videoEl) => videoEl.srcObject === null)
    ).toBe(true);
  });
});
