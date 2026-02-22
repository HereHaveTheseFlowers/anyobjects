// Количество плейсхолдеров объектов до загрузки данных из Firestore
export const mockObjectsCount = 9;

// Задержка обновления --doc-height при resize (ms)
export const viewportResizeDebounceMs = 200;

// Порог скролла (px), после которого показывается кнопка «вверх»
export const scrollArrowVisibilityThresholdPx = 30;

// Каждый N-й scroll event обрабатывается (троттлинг)
export const scrollThrottleInterval = 10;

// Breakpoint для мобильной версии (px)
export const mobileBreakpointPx = 480;

// Названия фильтров категорий
export const filterLabels = {
  all: "ВСЁ",
  interior: "ИНТЕРЬЕР",
  hygiene: "ГИГИЕНА",
  clothingAndAccessories: "ОДЕЖДА И АКСЕССУАРЫ",
  food: "ЕДА",
} as const;
