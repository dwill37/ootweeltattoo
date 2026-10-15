export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

/** Intro choreography (seconds). About 2.3s in total; the hero copy is on screen from first paint. */
export const INTRO = {
  headline: 0.45,
  wordStep: 0.06,
  subtext: 0.7,
  roughLine: 1.05,
  ctas: 0.95,
  badge: 1.15,
  nav: 1.0,
  floating: 2.3,
  sheetsGone: 1.45,
} as const;
