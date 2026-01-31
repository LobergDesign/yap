<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core';
import { Color } from 'three';
import GradientShaderMesh from './GradientShaderMesh.vue';

const { primaryColor, secondaryColor, accentColor } = defineProps<{
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}>();

// Convert RGB string "r,g,b" to Three.js Color (normalized 0-1)
const parseColor = (rgb: string) => {
  const [r, g, b] = rgb.split(',').map((v) => parseFloat(v.trim()) / 255);
  return new Color(r, g, b);
};

// Uniforms object (will be mutated by child)
const uniforms = {
  uTime: { value: 0 },
  uColor1: { value: parseColor(primaryColor) },
  uColor2: { value: parseColor(secondaryColor) },
  uColor3: { value: parseColor(accentColor) },
  uNoiseScale: { value: 0.4 }, // Lower = larger blobs
  uNoiseSpeed: { value: 0.08 }, // Slower, more subtle movement
  uWarpStrength: { value: 0.4 }, // Domain warping intensity
};

// Update colors when props change
watch(
  () => [primaryColor, secondaryColor, accentColor],
  () => {
    uniforms.uColor1.value = parseColor(primaryColor);
    uniforms.uColor2.value = parseColor(secondaryColor);
    uniforms.uColor3.value = parseColor(accentColor);
  },
);

// Stripe-style mesh gradient fragment shader
const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uNoiseScale;
uniform float uNoiseSpeed;
uniform float uWarpStrength;

varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Softer FBM with fewer octaves for larger blobs
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.6;
  float frequency = 1.0;
  // Only 3 octaves for smoother, larger shapes
  for(int i = 0; i < 3; i++) {
    value += amplitude * snoise(p * frequency);
    frequency *= 1.8;
    amplitude *= 0.5;
  }
  return value;
}

// Domain warping - creates that liquid, flowing look
vec2 warp(vec2 p, float time) {
  vec2 offset = vec2(
    snoise(p + vec2(0.0, time * 0.3)),
    snoise(p + vec2(time * 0.3, 0.0))
  );
  return p + offset * uWarpStrength;
}

void main() {
  vec2 uv = vUv;
  float time = uTime * uNoiseSpeed;

  // Apply domain warping for liquid effect
  vec2 warpedUv = warp(uv * uNoiseScale, time);
  vec2 warpedUv2 = warp(uv * uNoiseScale + 5.0, time * 0.7);

  // Create large, soft flowing noise
  float n1 = fbm(warpedUv + time * 0.2);
  float n2 = fbm(warpedUv2 - time * 0.15);
  float n3 = fbm(warpedUv * 0.8 + vec2(time * 0.1, -time * 0.08));

  // Smooth the noise values with a softer curve
  n1 = smoothstep(-0.8, 0.8, n1);
  n2 = smoothstep(-0.8, 0.8, n2);
  n3 = smoothstep(-0.8, 0.8, n3);

  // Blend colors in layers like Stripe does
  vec3 color = uColor1;
  color = mix(color, uColor2, n1);
  color = mix(color, uColor3, n2 * 0.7);
  color = mix(color, uColor1 * 1.1, n3 * 0.3);

  // Add subtle highlight/glow in certain areas
  float highlight = smoothstep(0.4, 0.9, n1 * n2);
  color += highlight * 0.08;

  gl_FragColor = vec4(color, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
</script>

<template>
  <div class="gradient-effect">
    <TresCanvas :alpha="true" :antialias="true" window-size>
      <TresOrthographicCamera
        :position="[0, 0, 1]"
        :left="-1"
        :right="1"
        :top="1"
        :bottom="-1"
        :near="0.1"
        :far="10"
      />
      <GradientShaderMesh
        :uniforms="uniforms"
        :vertex-shader="vertexShader"
        :fragment-shader="fragmentShader"
      />
    </TresCanvas>
  </div>
</template>

<style lang="scss" scoped>
.gradient-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  :deep(canvas) {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
