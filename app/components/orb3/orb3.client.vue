<script lang="ts" setup>
import {
  makeProj,
  finalizeFrame,
  radiusScale,
  type Dot,
} from 'thinking-orbs/engine';

const {
  size = 64,
  speed = 1,
  color = 'primary',
} = defineProps<{
  size?: number;
  speed?: number;
  color?: OrbColor;
}>();

const ORBITS = 12;
const TRAIL = 40;
const PARTICLES = 3;

// Each orbit is a circle spanned by two perpendicular unit vectors, at its own radius and pace
const orbits = Array.from({ length: ORBITS }, () => {
  const yaw = Math.random() * 2 * Math.PI;
  const tilt = Math.random() * Math.PI;
  return {
    u: [Math.cos(yaw), 0, Math.sin(yaw)],
    v: [
      -Math.sin(yaw) * Math.sin(tilt),
      Math.cos(tilt),
      Math.cos(yaw) * Math.sin(tilt),
    ],
    radius: 0.45 + 0.52 * Math.random(),
    pace: (0.25 + 0.55 * Math.random()) * (Math.random() < 0.5 ? 1 : -1),
    phase: Math.random() * 2 * Math.PI,
  };
});

const frame = (t: number) => {
  const proj = makeProj(t * 0.12, 0.3, size / 2, size / 2, size * 0.41);
  const rs = radiusScale(size, 0.6);
  const dots: Dot[] = [];

  for (const { u, v, radius, pace, phase } of orbits) {
    const at = (a: number) => {
      const [x, y, z] = proj(
        (u[0]! * Math.cos(a) + v[0]! * Math.sin(a)) * radius,
        (u[1]! * Math.cos(a) + v[1]! * Math.sin(a)) * radius,
        (u[2]! * Math.cos(a) + v[2]! * Math.sin(a)) * radius,
      );
      return { x, y, z, depth: (z / radius + 1) / 2 };
    };

    for (let k = 0; k < TRAIL; k++) {
      const { x, y, z, depth } = at((k / TRAIL) * 2 * Math.PI);
      dots.push({
        x,
        y,
        z,
        r: 0.9 * rs,
        white: 0.72,
        a: 0.5 * (0.4 + 0.6 * depth),
      });
    }
    for (let m = 0; m < PARTICLES; m++) {
      const { x, y, z, depth } = at(
        t * pace + (m / PARTICLES) * 2 * Math.PI + phase,
      );
      dots.push({
        x,
        y,
        z,
        r: (1.2 + 1.6 * depth) * rs,
        white: 0.3 - 0.22 * depth,
      });
    }
  }
  return finalizeFrame(dots, []);
};

const { dpr } = useOrbCanvas(
  frame,
  () => size,
  () => speed * 1.885,
  () => color,
);
</script>

<template>
  <canvas
    ref="canvas"
    class="orb3"
    role="img"
    aria-label="Working"
    :width="Math.round(size * dpr)"
    :height="Math.round(size * dpr)"
    :style="{ width: `${size}px`, height: `${size}px` }"
  />
</template>

<style lang="scss" scoped>
.orb3 {
  display: block;
}
</style>
