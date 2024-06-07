import { beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { useSetup } from "~/composables/useSetup";

describe("配置", () => {
  const postVideo = vi.hoisted(() => vi.fn());
  const deleteVideoAPI = vi.hoisted(() => vi.fn());
  const sortVideoAPI = vi.hoisted(() => vi.fn());
  const fetchAllGroup = vi.hoisted(() => vi.fn());
  const fetchVideoByGroup = vi.hoisted(() => vi.fn());

  vi.mock("primevue/usetoast", () => ({
    useToast: vi.fn(() => ({
      add: vi.fn(),
    })),
  }));
  vi.mock("sortablejs", () => ({
    default: vi.fn(),
  }));
  vi.mock("~/utils/api/group", () => ({
    fetchAllGroup,
  }));

  beforeEach(() => {
    vi.mock("~/utils/api/video", () => ({
      postVideo,
      deleteVideoAPI,
      sortVideoAPI,
      fetchVideoByGroup,
    }));
  });

  describe("分组", () => {
    it("显示弹窗后查询所有分组", async () => {
      const { showSidebar } = useSetup();

      await showSidebar();

      expect(fetchAllGroup).toHaveBeenCalled();
    });

    it("选择分组后查询对应分组的视频列表", async () => {
      const { selectedGroup } = useSetup();

      selectedGroup.value = 1;

      await nextTick();
      expect(fetchVideoByGroup).toHaveBeenCalledWith(selectedGroup.value);
    });
  });

  it("点击配置右侧显示弹窗", () => {
    const { visible, showSidebar } = useSetup();

    showSidebar();

    expect(visible.value).toBe(true);
  });

  it("已选择分组情况下显示右侧弹窗后查询对应分组的视频列表", async () => {
    const { showSidebar } = useSetup();

    await showSidebar();

    expect(fetchVideoByGroup).toHaveBeenCalled();
  });

  describe("排序", () => {
    it("显示弹窗后可拖拽视频列表项", async () => {
      const { showSidebar, isSortable, setupVideoRefs } = useSetup();
      setupVideoRefs.value = document.createElement("div");

      await showSidebar();

      expect(isSortable()).toBe(true);
    });

    it("拖拽后更新列表顺序", async () => {
      const { updateOrder } = useSetup();

      await updateOrder(0, 1);

      expect(sortVideoAPI).toHaveBeenCalledWith(0, 1);
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

    it("保存成功后关闭弹窗", async () => {
      const { videoFormVisible, saveVideo } = useSetup();

      await saveVideo();

      expect(videoFormVisible.value).toBe(false);
    });

    it("保存成功后清空表单数据", async () => {
      const { videoData, saveVideo } = useSetup();
      videoData.value = {
        name: "test",
        url: "test",
      };

      await saveVideo();

      expect(videoData.value).toEqual({ name: "", url: "" });
    });

    it("点击保存提交视频信息", () => {
      const { saveVideo, videoData, selectedGroup } = useSetup();
      selectedGroup.value = 1;
      videoData.value = {
        name: "test",
        url: "test",
      };

      saveVideo();

      expect(postVideo).toHaveBeenCalledWith({
        name: videoData.value.name,
        url: videoData.value.url,
        groupId: selectedGroup.value,
      });
    });

    it("保存时带上所在分组信息", () => {
      const { saveVideo, videoData, selectedGroup } = useSetup();
      selectedGroup.value = 1;
      videoData.value = {
        name: "test",
        url: "test",
      };

      saveVideo();

      expect(postVideo).toHaveBeenCalledWith({
        name: videoData.value.name,
        url: videoData.value.url,
        groupId: selectedGroup.value,
      });
    });

    it("点击保存后重新查询视频列表", async () => {
      const { saveVideo, videoData } = useSetup();
      videoData.value = {
        name: "test",
        url: "test",
      };

      await saveVideo();

      expect(fetchVideoByGroup).toHaveBeenCalled();
    });

    it("如果信息没补充完整则提示", async () => {
      const { saveVideo, videoData } = useSetup();
      videoData.value = {
        name: "test",
        url: "",
      };

      const res = await saveVideo();

      expect(res).toBe(false);
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

        curVideoData.name = "test1";

        expect(videoData.value.name).toBe("test");
      });
    });

    describe("删除", () => {
      it("happy path", () => {
        const { deleteVideo } = useSetup();
        const id = 1;

        deleteVideo(id);

        expect(deleteVideoAPI).toHaveBeenCalledWith(id);
      });

      it("删除视频后重新查询视频列表", async () => {
        const { deleteVideo } = useSetup();

        await deleteVideo(1);

        expect(fetchVideoByGroup).toHaveBeenCalled();
      });
    });
  });
});
