<script lang="ts" setup>
import { makeProj, finalizeFrame } from 'thinking-orbs/engine';

const { size = 64, count = 80, speed = 1 } = defineProps<{
  size?: number;
  count?: number;
  speed?: number;
}>();

const frame = (t: number) => {
  const proj = makeProj(t * 0.8, 0.4, size / 2, size / 2, size * 0.38);
  const dots = Array.from({ length: count }, (_, i) => {
    // Fibonacci sphere: evenly spread points, golden angle between neighbours
    const y = 1 - (2 * i + 1) / count;
    const r = Math.sqrt(1 - y * y);
    const theta = i * 2.39996;
    const [x, py, z] = proj(Math.cos(theta) * r, y, Math.sin(theta) * r);
    return { x, y: py, z, r: size * 0.02 * (1 + z * 0.5), white: 0.5 - z * 0.4 };
  });
  return finalizeFrame(dots, []);
};

const { dpr } = useOrbCanvas(frame, () => size, () => speed);
</script>

<template>
  <canvas
    ref="canvas"
    class="thinking-orb"
    role="img"
    aria-label="Thinking"
    :width="Math.round(size * dpr)"
    :height="Math.round(size * dpr)"
    :style="{ width: `${size}px`, height: `${size}px` }"
  />
</template>

<style lang="scss" scoped>
.thinking-orb {
  display: block;
}
</style>
