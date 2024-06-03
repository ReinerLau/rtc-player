import { describe, expect, it } from "vitest";
import { usePage } from "~/composables/usePage";

describe("换页", () => {
  it("默认初始页面为1", () => {
    const { page } = usePage();

    expect(page.value).toBe(1);
  });

  it("指定初始页面为2", () => {
    const { page } = usePage(2);

    expect(page.value).toBe(2);
  });

  it("点击前进页码加一", () => {
    const { page, forward } = usePage();

    forward();

    expect(page.value).toBe(2);
  });

  it("点击后退页码减一", () => {
    const { page, forward, backward } = usePage();

    forward();

    backward();

    expect(page.value).toBe(1);
  });

  it("当页面为1时，点击后退按钮无效", () => {
    const { page, backward } = usePage();

    backward();

    expect(page.value).toBe(1);
  });
});
