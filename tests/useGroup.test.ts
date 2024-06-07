import { describe, expect, it } from "vitest";
import { useGroup } from "~/composables/useGroup";

describe("分组", () => {
  it("点击新增显示表单弹窗", () => {
    const { addGroup, groupFormVisible } = useGroup();

    addGroup();

    expect(groupFormVisible.value).toBe(true);
  });
});
