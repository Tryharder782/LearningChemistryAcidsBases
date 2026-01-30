/**
 * Guide module index - exports all guide-related components and utilities.
 */

// Types
export * from './types';

// Store
export { useGuideStore } from './useGuideStore';

// Components
export { GuideBubble } from './GuideBubble';
export { HighlightOverlay, Blockable, useIsInteractive } from './HighlightOverlay';

// Utilities
export { parseTextLine, parseTextLines } from './textParser';

// Data
export { introGuideSteps, TOTAL_INTRO_STEPS } from './introGuideSteps';
