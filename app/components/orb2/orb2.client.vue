<script lang="ts" setup>
import { makeProj, finalizeFrame, radiusScale } from 'thinking-orbs/engine';

const { size = 64, speed = 1 } = defineProps<{
  size?: number;
  speed?: number;
}>();

type Vec = [number, number, number];
type Move = { axis: 0 | 1 | 2; lo: number; angle: number };

const MOVES = 14;
const SLOT = 0.42;
const REST = 1.2;
const RINGS = 9;
const DENSITY = 24;

// Each move turns one quarter-width band of the sphere 90° around an axis, like a cube slice
const moves: Move[] = Array.from({ length: MOVES }, () => ({
  axis: Math.floor(Math.random() * 3) as Move['axis'],
  lo: -1 + 0.5 * Math.floor(Math.random() * 4),
  angle: ((Math.random() < 0.5 ? 1 : -1) * Math.PI) / 2,
}));

const points: Vec[] = Array.from({ length: RINGS + 1 }, (_, i) => {
  const lat = -Math.PI / 2 + (i / RINGS) * Math.PI;
  const n = Math.max(1, Math.round(Math.abs(Math.cos(lat)) * DENSITY));
  return Array.from({ length: n }, (_, j): Vec => {
    const lon = (j / n) * 2 * Math.PI;
    return [Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon)];
  });
}).flat();

// Scramble forward move by move, play the same moves back to solved, then rest
const progress = (t: number) => {
  const slot = (t % (2 * MOVES * SLOT + REST)) / SLOT;
  if (slot >= 2 * MOVES) return { done: 0, partial: 0 };
  const s = Math.floor(slot);
  const eased = 1 - (1 - Math.min(1, (slot - s) / 0.7)) ** 3;
  return s < MOVES ? { done: s, partial: eased } : { done: 2 * MOVES - 1 - s, partial: 1 - eased };
};

const turn = ([x, y, z]: Vec, axis: Move['axis'], a: number): Vec => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  if (axis === 0) return [x, y * c - z * s, y * s + z * c];
  if (axis === 1) return [x * c + z * s, y, -x * s + z * c];
  return [x * c - y * s, x * s + y * c, z];
};

const frame = (t: number) => {
  const { done, partial } = progress(t);
  const proj = makeProj(t * 0.55, 0.35 + 0.1 * Math.sin(t * 0.9), size / 2, size / 2, size * 0.41);
  const rs = radiusScale(size, 0.6);
  const dots = points.map((p) => {
    let v = p;
    let active = false;
    for (let i = 0; i <= done && i < MOVES; i++) {
      const amount = i < done ? 1 : partial;
      const { axis, lo, angle } = moves[i]!;
      if (amount <= 0 || v[axis] < lo || v[axis] >= lo + 0.5) continue;
      active = i === done;
      v = turn(v, axis, angle * amount);
    }
    const [x, y, z] = proj(...v);
    const depth = (z + 1) / 2;
    return {
      x,
      y,
      z,
      r: (0.6 + 1.7 * depth + (active ? 0.3 : 0)) * rs * 1.05,
      white: 0.62 - 0.54 * depth - (active ? 0.14 : 0),
    };
  });
  return finalizeFrame(dots, []);
};

const { dpr } = useOrbCanvas(frame, () => size, () => speed * 1.8);
</script>

<template>
  <canvas
    ref="canvas"
    class="orb2"
    role="img"
    aria-label="Solving"
    :width="Math.round(size * dpr)"
    :height="Math.round(size * dpr)"
    :style="{ width: `${size}px`, height: `${size}px` }"
  />
</template>

<style lang="scss" scoped>
.orb2 {
  display: block;
}
</style>
