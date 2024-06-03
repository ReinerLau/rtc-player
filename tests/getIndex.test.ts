import { describe, expect, it } from "vitest";
import { getIndex } from "~/utils";

describe("获取视频索引", () => {
  it("每页4个视频，第3页，第2个视频的对应序号为10", () => {
    const index = getIndex(3, 4, 2);

    expect(index).toBe(10);
  });
});
