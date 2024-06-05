import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { useIndex } from "~/composables/useIndex";

describe("主页", () => {
  const useFetch = vi.hoisted(() => vi.fn());
  const fetchAllVideo = vi.hoisted(() => vi.fn());
  const postVideo = vi.hoisted(() => vi.fn());

  beforeAll(() => {
    vi.mock("primevue/usetoast", () => ({
      useToast: vi.fn(() => ({
        add: vi.fn(),
      })),
    }));
  });

  beforeEach(() => {
    vi.mock("nuxt/app", () => ({
      useFetch,
    }));
    vi.mock("~/utils/api/video", () => ({
      fetchAllVideo,
      postVideo,
    }));
  });

  it("进入主页查询视频列表", async () => {
    const mockedData = [{ id: 1, name: "test" }];
    useFetch.mockResolvedValue({
      data: {
        value: mockedData,
      },
    });
    const { videoList } = await useIndex();

    expect(videoList.value).toEqual(mockedData);
  });

  it("保存视频后更新主页视频列表", async () => {
    const mockedData = [{ id: 1, name: "test" }];
    fetchAllVideo.mockResolvedValue(mockedData);
    const { videoList, saveVideoThenUpdate } = await useIndex();

    await saveVideoThenUpdate();

    expect(videoList.value).toEqual(mockedData);
  });
});
