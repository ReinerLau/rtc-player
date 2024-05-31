import { describe, expect, it, vi } from "vitest";
import { useSetup } from "~/composables/useSetup";

describe("配置视频流", () => {
  it("显示配置弹窗", () => {
    const { visible, showSidebar } = useSetup();

    showSidebar();

    expect(visible.value).toBe(true);
  });

  it("显示弹窗后查找所有视频", async () => {
    const fetchAllVideo = vi.hoisted(() => vi.fn());
    vi.mock("~/utils/api/video", () => ({
      fetchAllVideo,
    }));
    const mockedData = [{ id: 1, name: "test" }];
    fetchAllVideo.mockResolvedValue(mockedData);
    const { showSidebar, videoList } = useSetup();

    await showSidebar();

    expect(videoList.value).toEqual(mockedData);
  });
});
