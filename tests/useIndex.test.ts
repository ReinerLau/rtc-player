import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { useIndex } from "~/composables/useIndex";

describe("主页", () => {
  const useFetch = vi.hoisted(() => vi.fn());

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

  it("主页视频列表与配置视频列表同步", async () => {
    const mockedData = [{ id: 1, name: "test", url: "test", order: 1 }];
    const { videoList, setupVideoList, videoRefs } = await useIndex();

    setupVideoList.value = mockedData;

    await nextTick();
    expect(videoList.value).toEqual(mockedData);
  });

  it("同步视频列表后重新拉流", async () => {
    const mockedData = [{ id: 1, name: "test", url: "test", order: 1 }];
    const { setupVideoList, srsList, videoRefs } = await useIndex();

    setupVideoList.value = mockedData;

    await nextTick();
    expect(srsList.value).toHaveLength(1);
  });
});
