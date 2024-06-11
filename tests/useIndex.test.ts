import { beforeAll, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { useIndex } from "~/composables/useIndex";
import { getIndex } from "~/utils";

describe("主页", () => {
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

  it("主页视频列表与配置视频列表同步", async () => {
    const mockedData = [{ id: 1, name: "test", url: "test", order: 1 }];
    const { videoList, setupVideoList } = await useIndex();

    setupVideoList.value = mockedData;

    await nextTick();
    expect(videoList.value).toEqual(mockedData);
  });

  it("同步视频列表后重新拉流", async () => {
    const mockedData = [{ id: 1, name: "test", url: "test", order: 1 }];
    const { setupVideoList, srsList } = await useIndex();

    setupVideoList.value = mockedData;

    await nextTick();
    expect(srsList.value).toHaveLength(4);
  });

  it("获取视频顺序", async () => {
    const { videoIndex, page, colCount } = await useIndex();
    page.value = 2;
    colCount.value = 2;

    const index = videoIndex(3);

    expect(index).toBe(6);
  });

  it("右键获取对应视频顺序", async () => {
    const { onContextMenu, getCurVideoIndex } = await useIndex();

    onContextMenu(6);

    expect(getCurVideoIndex()).toBe(6);
  });

  describe("全屏", () => {
    it("全屏", async () => {
      const { fullScreen, page, onContextMenu, total } = await useIndex();

      onContextMenu(6);
      fullScreen();

      expect(getIndex(page.value, total.value, 0)).toBe(6);
    });

    it("退出全屏", async () => {
      const { exitFullScreen, fullScreen, page, onContextMenu, total } =
        await useIndex();

      onContextMenu(6);
      fullScreen();
      exitFullScreen();

      expect(total.value).toBe(4);
      expect(page.value).toBe(1);
    });

    it("全屏后重新拉流", async () => {
      const { fullScreen, onContextMenu, srsList } = await useIndex();

      onContextMenu(6);
      fullScreen();

      expect(srsList.value).toHaveLength(1);
    });
  });

  it("当前视频总数为1，页码为2，新增视频总数后，页码为1", async () => {
    const { increVideoCount, page, colCount } = await useIndex();
    page.value = 2;
    colCount.value = 1;

    increVideoCount();

    expect(page.value).toBe(1);
  });

  it("当前视频总数为4，页码为2，减少视频总数后，页码为5", async () => {
    const { decreVideoCount, page, colCount } = await useIndex();
    page.value = 2;
    colCount.value = 2;

    decreVideoCount();

    expect(page.value).toBe(5);
  });

  it("默认显示4个视频", async () => {
    const { total } = await useIndex();

    expect(total.value).toBe(4);
  });
});
