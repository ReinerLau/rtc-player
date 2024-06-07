import { describe, expect, it, vi } from "vitest";
import { useGroup } from "~/composables/useGroup";

describe("分组", () => {
  const postGroup = vi.hoisted(() => vi.fn());
  const fetchAllGroup = vi.hoisted(() => vi.fn());
  vi.mock("~/utils/api/group", () => ({
    fetchAllGroup,
    postGroup,
  }));

  it("点击新增显示表单弹窗", () => {
    const { addGroup, groupFormVisible } = useGroup();

    addGroup();

    expect(groupFormVisible.value).toBe(true);
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

  it("没选择分组前不显示相关按钮", () => {
    const { groupRelevantButtonVisible } = useGroup();

    expect(groupRelevantButtonVisible.value).toBe(false);
  });

  it("选择分组后显示添加视频按钮", () => {
    const { selectGroup, groupRelevantButtonVisible } = useGroup();

    selectGroup(1);

    expect(groupRelevantButtonVisible.value).toBe(true);
  });
});
