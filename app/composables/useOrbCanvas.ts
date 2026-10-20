import { usePreferredReducedMotion, useRafFn } from '@vueuse/core';
import { paintFrame, type OrbFrame } from 'thinking-orbs/engine';

/** Animates `frame` onto the calling component's `ref="canvas"`, following the site mode and reduced motion. */
export const useOrbCanvas = (frame: (t: number) => OrbFrame, size: () => number, speed: () => number) => {
  const canvasRef = useTemplateRef<HTMLCanvasElement>('canvas');
  const { mode } = useSettings();
  const reducedMotion = usePreferredReducedMotion();
  const dpr = import.meta.client ? Math.min(2, devicePixelRatio || 1) : 1;

  const draw = (t: number) => {
    const ctx = canvasRef.value?.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size(), size());
    paintFrame(ctx, frame(t), mode.value === 'dark');
  };

  const { pause, resume } = useRafFn(() => draw((performance.now() / 1000) * speed()), {
    immediate: false,
  });

  // canvasRef is watched because .client components render after mount, so the canvas arrives late
  watch(
    [canvasRef, reducedMotion, mode],
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
