import { describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { useGroup } from "~/composables/useGroup";

describe("分组", () => {
  const postGroup = vi.hoisted(() => vi.fn());
  const fetchAllGroup = vi.hoisted(() => vi.fn());
  const deleteGroupAPI = vi.hoisted(() => vi.fn());
  vi.mock("~/utils/api/group", () => ({
    fetchAllGroup,
    postGroup,
    deleteGroupAPI,
  }));

  describe("新增", () => {
    it("点击新增显示表单弹窗", () => {
      const { addGroup, groupFormVisible } = useGroup();

      addGroup();

      expect(groupFormVisible.value).toBe(true);
    });

    it("点击新增弹窗标题显示新增分组", () => {
      const { addGroup, groupFormTitle, editGroup } = useGroup();

      editGroup();
      addGroup();

      expect(groupFormTitle.value).toBe("新增分组");
    });
  });

  it("点击保存提交分组信息", () => {
    const { groupData, saveGroup } = useGroup();
    groupData.value = {
      name: "test",
    };

    saveGroup();

    expect(postGroup).toHaveBeenCalledWith(groupData.value);
  });

  it("保存成功后关闭弹窗", async () => {
    const { groupFormVisible, addGroup, saveGroup } = useGroup();

    addGroup();
    await saveGroup();

    expect(groupFormVisible.value).toBe(false);
  });

  it("保存成功后清空表单数据", async () => {
    const { groupData, saveGroup } = useGroup();
    groupData.value = {
      name: "test",
    };

    await saveGroup();

    expect(groupData.value).toEqual({ name: "" });
  });

  it("点击取消关闭弹窗", () => {
    const { groupFormVisible, addGroup, cancelGroup } = useGroup();

    addGroup();
    cancelGroup();

    expect(groupFormVisible.value).toBe(false);
  });

  it("点击取消清空表单数据", () => {
    const { groupData, cancelGroup } = useGroup();
    groupData.value = {
      name: "test",
    };

    cancelGroup();

    expect(groupData.value).toEqual({ name: "" });
  });

  it("保存后重新查询分组列表", async () => {
    const mockedData = [{ id: 1, name: "test" }];
    fetchAllGroup.mockResolvedValue(mockedData);
    const { groupList, saveGroup } = useGroup();

    await saveGroup();

    expect(groupList.value).toEqual(mockedData);
  });

  it("没选择分组前不显示相关按钮", async () => {
    const { groupRelevantButtonVisible, selectedGroup } = useGroup();

    selectedGroup.value = 1;
    await nextTick();
    selectedGroup.value = null;
    await nextTick();

    expect(groupRelevantButtonVisible.value).toBe(false);
  });

  it("选择分组后显示添加视频按钮", async () => {
    const { selectedGroup, groupRelevantButtonVisible } = useGroup();

    selectedGroup.value = 1;
    await nextTick();

    expect(groupRelevantButtonVisible.value).toBe(true);
  });

  describe("编辑", () => {
    it("点击编辑显示表单弹窗", () => {
      const { editGroup, groupFormVisible } = useGroup();

      editGroup();

      expect(groupFormVisible.value).toBe(true);
    });

    it("点击编辑后弹窗标题显示编辑分组", () => {
      const { groupFormTitle, editGroup } = useGroup();

      editGroup();

      expect(groupFormTitle.value).toBe("编辑分组");
    });

    it("点击编辑表单显示分组信息", () => {
      const { editGroup, groupList, groupData, selectedGroup } = useGroup();
      groupList.value = [{ id: 1, name: "test" }];
      selectedGroup.value = 1;

      editGroup();

      expect(groupData.value).toEqual(groupList.value[0]);
    });
  });

  describe("删除", () => {
    it("删除后查询分组信息", async () => {
      const mockedData = [{ id: 1, name: "test" }];
      fetchAllGroup.mockResolvedValue(mockedData);
      const { deleteGroup, groupList } = useGroup();

      await deleteGroup();

      expect(groupList.value).toEqual(mockedData);
    });

    it("删除后清空选中分组", async () => {
      const { deleteGroup, selectedGroup } = useGroup();
      selectedGroup.value = 1;

      await deleteGroup();

      expect(selectedGroup.value).toBe(null);
    });
  });
});
