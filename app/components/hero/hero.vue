<script lang="ts" setup>
import type { HeroFragmentFragment } from '~/types/generated/graphql';
const { hero } = defineProps<{
  hero: HeroFragmentFragment;
}>();

// GradientEffect needs a string; the hex values below are fixed, so null only means a typo
const rgb = (hex: string) => hexToRgb(hex) ?? '0,0,0';

const primaryColor = ref(rgb('#141412'));
const secondaryColor = ref(rgb('#5B724F'));
const accentColor = ref(rgb('#eaeaea'));

const { theme, mode } = useSettings();

watch(
  [theme, mode],
  () => {
    if (theme.value === 'theme-1') {
      primaryColor.value = rgb(
        mode.value === 'light' ? '#5B724F' : '#141412',
      );
      secondaryColor.value = rgb(
        mode.value === 'dark' ? '#5B724F' : '#141412',
      );
      accentColor.value = rgb('#E4F1DE');
    } else if (theme.value === 'theme-2') {
      primaryColor.value = rgb(
        mode.value === 'light' ? '#10b981' : '#064e3b',
      );
      secondaryColor.value = rgb(
        mode.value === 'dark' ? '#10b981' : '#064e3b',
      );
      accentColor.value = rgb('#d1fae5');
    } else if (theme.value === 'theme-3') {
      primaryColor.value = rgb(
        mode.value === 'light' ? '#f97316' : '#7c2d12',
      );
      secondaryColor.value = rgb(
        mode.value === 'dark' ? '#f97316' : '#7c2d12',
      );
      accentColor.value = rgb('#fff7ed');
    } else if (theme.value === 'theme-4') {
      primaryColor.value = rgb(
        mode.value === 'light' ? '#737373' : '#0a0a0a',
      );
      secondaryColor.value = rgb(
        mode.value === 'dark' ? '#737373' : '#0a0a0a',
      );
      accentColor.value = rgb('#f5f5f5');
    } else if (theme.value === 'default') {
      primaryColor.value = rgb(
        mode.value === 'light' ? '#5b724f' : '#121212',
      );
      secondaryColor.value = rgb(
        mode.value === 'dark' ? '#5b724f' : '#121212',
      );
      accentColor.value = rgb('#eaeaea');
    }
  },
  { immediate: true },
);
</script>
<template>
  <div class="hero place-c-c">
    <div>
      <LazyGradientEffect :primary-color :secondary-color :accent-color />
      <!-- <LazyGradientEffectTest :primary-color :secondary-color :accent-color /> -->
      <h1>
        <Logo size="large" />
      </h1>
      <p v-if="hero.text">
        {{ hero.text }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  height: 100vh;
  p {
    font-size: clamp(12px, 2vw, 13px);
    max-width: clamp(180px, 30vw, 400px);
  }
}
</style>
