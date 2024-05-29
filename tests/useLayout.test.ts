import { describe, it, expect } from "vitest";
import { useLayout } from "~/composables/useLayout";

describe("视频数量", () => {
  it("获取铺满屏幕宽度的视频数量", () => {
    const { colCount } = useLayout(1);

    expect(colCount.value).toBe(1);
  });

  it("获取铺满屏幕的视频总数", () => {
    const { total } = useLayout(2);

    expect(total.value).toBe(4);
  });

  it("减少屏幕的视频总数", () => {
    const { total, decreCount } = useLayout(2);

    decreCount();

    expect(total.value).toBe(1);
  });

  it("增加屏幕的视频总数", () => {
    const { total, increCount } = useLayout(2);

    increCount();

    expect(total.value).toBe(9);
  });

  it("当视频总数等于 1 时，视频总数不能继续减少", () => {
    const { total, decreCount } = useLayout(1);

    decreCount();

    expect(total.value).toBe(1);
  });

  it("当视频总数等于 9 时，视频总数不能继续增加", () => {
    const { total, increCount } = useLayout(3);

    increCount();

    expect(total.value).toBe(9);
  });
});
