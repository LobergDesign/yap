<script lang="ts" setup>
import { makeProj, finalizeFrame, radiusScale, type Dot, type Line } from 'thinking-orbs/engine';

const { size = 64, speed = 1 } = defineProps<{
  size?: number;
  speed?: number;
}>();

type Vec = [number, number, number];

const NODES = 41;
const SIGNALS = 7;
const LINK_DISTANCE = 0.72;
const HOP_RATE = 0.55;

const normalize = ([x, y, z]: Vec): Vec => {
  const l = Math.max(1e-6, Math.hypot(x, y, z));
  return [x / l, y / l, z / l];
};

// Nodes start evenly spread (Fibonacci sphere) and each wanders around its spot with its own phases
const nodes = Array.from({ length: NODES }, (_, i) => {
  const y = 1 - (2 * i + 1) / NODES;
  const r = Math.sqrt(1 - y * y);
  return {
    home: [Math.cos(i * 2.39996) * r, y, Math.sin(i * 2.39996) * r] as Vec,
    phase: [0, 0, 0].map(() => Math.random() * 2 * Math.PI) as Vec,
  };
});

// Stable pseudo-random pick, so a signal's route stays fixed for its whole hop
const hash = (a: number, b: number) => {
  const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const frame = (t: number) => {
  const proj = makeProj(t * 0.12, 0.32, size / 2, size / 2, size * 0.4);
  const rs = radiusScale(size, 0.6);
  const points = nodes.map(({ home, phase }) =>
    normalize([
      home[0] + 0.3 * Math.sin(t * 0.24 + phase[0]),
      home[1] + 0.3 * Math.sin(t * 0.21 + phase[1]),
      home[2] + 0.3 * Math.sin(t * 0.27 + phase[2]),
    ]),
  );
  const projected = points.map((p) => proj(...p));
  const lines: Line[] = [];
  const dots: Dot[] = [];

  for (let i = 0; i < NODES; i++) {
    for (let j = i + 1; j < NODES; j++) {
      const dist = Math.hypot(...(points[i]!.map((c, k) => c - points[j]![k]!) as Vec));
      if (dist >= LINK_DISTANCE) continue;
      const [x1, y1, z1] = projected[i]!;
      const [x2, y2, z2] = projected[j]!;
      const depth = ((z1 + z2) / 2 + 1) / 2;
      lines.push({
        x1,
        y1,
        x2,
        y2,
        white: 0.42,
        a: (1 - dist / LINK_DISTANCE) * (0.3 + 0.55 * depth),
        w: Math.max(0.6, 0.8 * rs),
      });
    }
  }

  projected.forEach(([x, y, z], i) => {
    const depth = (z + 1) / 2;
    const pulse = 1 + 0.25 * Math.sin(t * 1.4 + i * 2.7);
    dots.push({ x, y, z, r: (1.33 + 1.71 * depth) * pulse * rs, white: 0.55 - 0.45 * depth });
  });

  for (let s = 0; s < SIGNALS; s++) {
    const travel = t * HOP_RATE + s * 7.31;
    const hop = Math.floor(travel);
    const from = points[Math.floor(hash(hop, s) * NODES)]!;
    const to = points[Math.floor(hash(hop, s + 0.5) * NODES)]!;
    const f = travel - hop;
    const [x, y, z] = proj(...normalize(from.map((c, k) => c + (to[k]! - c) * f) as Vec));
    const depth = (z + 1) / 2;
    dots.push({ x, y, z, r: (2 + 1.71 * depth) * rs, white: 0.05, a: 0.5 + 0.5 * depth });
  }

  return finalizeFrame(dots, lines);
};

const { dpr } = useOrbCanvas(frame, () => size, () => speed * 3.315);
</script>

<template>
  <canvas
    ref="canvas"
    class="orb4"
    role="img"
    aria-label="Connecting"
    :width="Math.round(size * dpr)"
    :height="Math.round(size * dpr)"
    :style="{ width: `${size}px`, height: `${size}px` }"
  />
</template>

<style lang="scss" scoped>
.orb4 {
  display: block;
}
</style>
