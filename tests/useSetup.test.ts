import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSetup } from "~/composables/useSetup";

describe("配置", () => {
  const fetchAllVideo = vi.hoisted(() => vi.fn());
  const postVideo = vi.hoisted(() => vi.fn());

  beforeEach(() => {
    vi.mock("~/utils/api/video", () => ({
      fetchAllVideo,
      postVideo,
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("视频列表", () => {
    it("点击配置右侧显示弹窗", () => {
      const { visible, showSidebar } = useSetup();

      showSidebar();

      expect(visible.value).toBe(true);
    });

    it("显示右侧弹窗后查找所有视频", async () => {
      const mockedData = [{ id: 1, name: "test" }];
      fetchAllVideo.mockResolvedValue(mockedData);
      const { showSidebar, videoList } = useSetup();

      await showSidebar();

      expect(videoList.value).toEqual(mockedData);
    });
  });

  describe("表单弹窗", () => {
    it("点击新增显示中间表单弹窗", async () => {
      const { videoFormVisible, addVideo } = useSetup();

      addVideo();

      expect(videoFormVisible.value).toBe(true);
    });

    it("点击新增表单弹窗头部显示添加视频", () => {
      const { formTitle, addVideo } = useSetup();

      addVideo();

      expect(formTitle.value).toBe("添加视频");
    });

    it("点击取消关闭弹窗", () => {
      const { videoFormVisible, addVideo, cancelVideo } = useSetup();

      addVideo();
      cancelVideo();

      expect(videoFormVisible.value).toBe(false);
    });

    it("点击取消清空表单数据", () => {
      const { videoData, cancelVideo } = useSetup();
      videoData.value = {
        name: "test",
        url: "test",
      };

      cancelVideo();

      expect(videoData.value).toEqual({ name: "", url: "" });
    });

    it("点击保存关闭弹窗", () => {
      const { videoFormVisible, saveVideo } = useSetup();

      saveVideo();

      expect(videoFormVisible.value).toBe(false);
    });

    it("点击保存清空表单数据", async () => {
      const { videoData, saveVideo } = useSetup();
      videoData.value = {
        name: "test",
        url: "test",
      };

      await saveVideo();

      expect(videoData.value).toEqual({ name: "", url: "" });
    });

    it("点击保存提交视频信息", () => {
      const { saveVideo, videoData } = useSetup();
      videoData.value = {
        name: "test",
        url: "test",
      };

      saveVideo();

      expect(postVideo).toHaveBeenCalledWith({
        name: videoData.value.name,
        url: videoData.value.url,
      });
    });

    it("点击保存后重新查询视频列表", async () => {
      const mockedData = [{ id: 1, name: "test" }];
      fetchAllVideo.mockResolvedValue(mockedData);
      const { saveVideo, videoList } = useSetup();

      await saveVideo();

      expect(videoList.value).toEqual(mockedData);
    });

    describe("编辑", () => {
      const curVideoData = {
        id: 1,
        name: "test",
        url: "test",
      };
      it("点击编辑显示表单弹窗", () => {
        const { editVideo, videoFormVisible } = useSetup();

        editVideo(curVideoData);

        expect(videoFormVisible.value).toBe(true);
      });

      it("点击编辑表单顶部显示编辑视频", () => {
        const { formTitle, editVideo } = useSetup();

        editVideo(curVideoData);

        expect(formTitle.value).toBe("编辑视频");
      });

      it("点击编辑表单显示视频信息", () => {
        const { editVideo, videoData } = useSetup();

        editVideo(curVideoData);

        expect(videoData.value).toEqual(curVideoData);
      });

      it("点击编辑复制视频信息", () => {
        const { editVideo, videoData } = useSetup();

        editVideo(curVideoData);

        expect(videoData.value).not.toBe(curVideoData);
      });
    });
  });
});
