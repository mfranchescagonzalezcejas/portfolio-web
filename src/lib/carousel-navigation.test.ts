import { describe, expect, it } from "vitest";
import { createCarouselQueue } from "./carousel-navigation";

describe("carousel navigation queue", () => {
  it("keeps every rapid next intent in logical order across the last-to-first seam", () => {
    const queue = createCarouselQueue(3, 2);

    for (let index = 0; index < 10; index += 1) queue.enqueueStep(1);

    expect(Array.from({ length: 10 }, () => queue.take()?.index)).toEqual([
      0, 1, 2, 0, 1, 2, 0, 1, 2, 0,
    ]);
  });

  it("keeps alternating directions and retries a cancelled transition", () => {
    const queue = createCarouselQueue(3);

    queue.enqueueStep(1);
    queue.enqueueStep(-1);
    queue.enqueueStep(1);

    const first = queue.take();
    expect(first).toEqual({ type: "step", direction: 1, index: 1 });
    queue.retry(first!);
    expect(queue.take()).toEqual(first);
    queue.settle(first!.index);
    expect(queue.take()).toEqual({ type: "step", direction: -1, index: 0 });
    expect(queue.take()).toEqual({ type: "step", direction: 1, index: 1 });
  });

  it("keeps an explicit dot target after queued navigation", () => {
    const queue = createCarouselQueue(4);

    queue.enqueueStep(1);
    queue.enqueueStep(1);
    queue.enqueueIndex(3);

    expect(Array.from({ length: 3 }, () => queue.take())).toEqual([
      { type: "step", direction: 1, index: 1 },
      { type: "step", direction: 1, index: 2 },
      { type: "index", index: 3 },
    ]);
  });
});
