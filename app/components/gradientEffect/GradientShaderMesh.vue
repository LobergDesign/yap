<script lang="ts" setup>
import { useLoop } from '@tresjs/core';
import { shallowRef } from 'vue';

const props = defineProps<{
  uniforms: Record<string, { value: unknown }>;
  vertexShader: string;
  fragmentShader: string;
}>();

const meshRef = shallowRef(null);

const { onBeforeRender } = useLoop();

onBeforeRender(({ elapsed }) => {
  if (meshRef.value?.material?.uniforms?.uTime) {
    meshRef.value.material.uniforms.uTime.value = elapsed;
  }
});
</script>

<template>
  <TresMesh ref="meshRef">
    <TresPlaneGeometry :args="[2, 2]" />
    <TresShaderMaterial
      :vertex-shader="props.vertexShader"
      :fragment-shader="props.fragmentShader"
      :uniforms="props.uniforms"
    />
  </TresMesh>
</template>
