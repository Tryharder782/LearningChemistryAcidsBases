# Buffers feature

Краткая документация для экрана буферов: структура, основные хуки и параметры, которые можно быстро тюнить.

## Архитектура

- BufferScreen — композиция состояния, хуков и UI.
- components/ — мелкие визуальные части: верхняя/нижняя строка и боковая панель.
- hooks/ — логика по подсистемам (навигация, модель частиц, авто-прогресс, гид и т. д.).

## Главные точки управления (BufferScreen)

- WATER_LEVEL_MIN / WATER_LEVEL_MAX — диапазон уровня воды.
- MAX_PARTICLES — предел частиц в симуляции.
- FINAL_SECONDARY_ION_COUNT — целевое число ионов в финале сильной фазы.
- MIN_FINAL_PRIMARY_ION_COUNT — нижняя граница числа primary‑ионов в финале.
- snapshotStepIds — шаги, для которых сохраняются снимки состояния при навигации.

## Хуки и их ответственность

- useBufferGuideState
  - Управляет текущим шагом, подсветками, флагом взаимодействия и селектором вещества.
  - Делает снимки состояния для “ключевых” шагов через useGuideSnapshots.
  - Возвращает guideOverrides для управления блокировками/подсветками.

- useGuideNavigation
  - Логика переходов “вперёд/назад” по шагам.
  - Включает авто-выбор вещества при необходимости.
  - Сбрасывает состояние при возврате на шаги выбора.

- useBufferDerivedState
  - Расчёт производных величин: pH, концентрации, saltModel, текущий уровень модели, кол-во частиц соли и т. д.

- useBufferAutoAdvance
  - Автопродвижение по шагам при достижении условий (соль, сильные кислоты/основания).

- useBufferParticlesSync
  - Синхронизация ReactingBeakerModel с текущим состоянием симуляции.

- useBufferBottles
  - Конфигурация бутылок и логика наливания.
  - Подключение анимации/частиц и вызовы markInteraction.

- useBufferStatement
  - Генерация текста шага (включая динамические вставки).

- useScientificConcentrations
  - Вычисление концентраций для графиков/уравнений на основе pH и модели.

- usePouringParticles / useParticleAnimation
  - Визуальная анимация и эффекты частиц при наливании.

## Частые “тюнинги”

- Изменить плотность/ёмкость: MAX_PARTICLES, WATER_LEVEL_MIN/MAX.
- Порог для авто-перехода на соли/сильные вещества: FINAL_SECONDARY_ION_COUNT, MIN_FINAL_PRIMARY_ION_COUNT.
- Снимки/возвраты состояния: snapshotStepIds.
- Сила подсветок и интеракций: guideOverrides и hasInteracted в useBufferGuideState.

## Где смотреть UI

- BufferTopRow / BufferBottomRow / BufferSidePanel — компоненты в components/.
- HighlightOverlay и Blockable — поведение подсветок и блокировок.
