export type CarouselAction =
  | { type: "step"; direction: -1 | 1; index: number }
  | { type: "index"; index: number };

export function createCarouselQueue(total: number, initialIndex = 0) {
  let currentIndex = initialIndex;
  let plannedIndex = initialIndex;
  const actions: CarouselAction[] = [];

  const normalize = (index: number) =>
    total > 0 ? (index + total) % total : 0;

  return {
    enqueueStep(direction: -1 | 1) {
      plannedIndex = normalize(plannedIndex + direction);
      actions.push({ type: "step", direction, index: plannedIndex });
    },
    enqueueIndex(index: number) {
      plannedIndex = normalize(index);
      actions.push({ type: "index", index: plannedIndex });
    },
    take() {
      return actions.shift() ?? null;
    },
    retry(action: CarouselAction) {
      actions.unshift(action);
    },
    settle(index: number) {
      currentIndex = normalize(index);
      if (actions.length === 0) plannedIndex = currentIndex;
    },
    current() {
      return currentIndex;
    },
  };
}
