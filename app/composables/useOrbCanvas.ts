import { usePreferredReducedMotion, useRafFn } from '@vueuse/core';
import { paintFrame, type OrbFrame } from 'thinking-orbs/engine';

export type OrbColor = 'primary' | 'secondary' | 'accent';

/** Animates `frame` onto the calling component's `ref="canvas"`, following the site mode, theme color and reduced motion. */
export const useOrbCanvas = (
  frame: (t: number) => OrbFrame,
  size: () => number,
  speed: () => number,
  color: () => OrbColor,
) => {
  const canvasRef = useTemplateRef<HTMLCanvasElement>('canvas');
  const { theme, mode } = useSettings();
  const reducedMotion = usePreferredReducedMotion();
  const dpr = import.meta.client ? Math.min(2, devicePixelRatio || 1) : 1;

  // Canvas can't read CSS vars, so the theme color is resolved to RGB here
  const tint = computed(() => {
    // theme and mode are read so the color re-resolves when the user switches them
    if (!theme.value || !mode.value) return;
    const rgb = hexToRgb(
      getComputedStyle(document.documentElement)
        .getPropertyValue(`--${color()}`)
        .trim(),
    );
    if (!rgb) return;
    const [r = 0, g = 0, b = 0] = rgb.split(',').map(Number);
    return { r, g, b };
  });

  const draw = (t: number) => {
    const ctx = canvasRef.value?.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size(), size());
    paintFrame(ctx, frame(t), mode.value === 'dark', tint.value);
  };

  const { pause, resume } = useRafFn(
    () => draw((performance.now() / 1000) * speed()),
    {
      immediate: false,
    },
  );

  // canvasRef is watched because .client components render after mount, so the canvas arrives late
  watch(
    [canvasRef, reducedMotion, mode, tint],
    () => {
      if (reducedMotion.value === 'reduce') {
        pause();
        draw(2);
      } else {
        resume();
      }
    },
    { immediate: true, flush: 'post' },
  );

  return { dpr };
};
