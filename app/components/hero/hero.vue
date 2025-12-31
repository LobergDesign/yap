<script lang="ts" setup>
import type { HeroFieldsFragment } from '~/types/generated/graphql';
const { hero } = defineProps<{
  hero: HeroFieldsFragment;
}>();

const primaryColor = ref(hexToRgb('#141412'));
const secondaryColor = ref(hexToRgb('#5B724F'));
const accentColor = ref(hexToRgb('#eaeaea'));

const { theme, mode } = useSettings();

watch(
  [theme, mode],
  () => {
    if (theme.value === 'theme-1') {
      primaryColor.value = hexToRgb(
        mode.value === 'light' ? '#5B724F' : '#141412',
      );
      secondaryColor.value = hexToRgb(
        mode.value === 'dark' ? '#5B724F' : '#141412',
      );
      accentColor.value = hexToRgb('#E4F1DE');
    } else if (theme.value === 'theme-2') {
      primaryColor.value = hexToRgb(
        mode.value === 'light' ? '#10b981' : '#064e3b',
      );
      secondaryColor.value = hexToRgb(
        mode.value === 'dark' ? '#10b981' : '#064e3b',
      );
      accentColor.value = hexToRgb('#d1fae5');
    } else if (theme.value === 'theme-3') {
      primaryColor.value = hexToRgb(
        mode.value === 'light' ? '#f97316' : '#7c2d12',
      );
      secondaryColor.value = hexToRgb(
        mode.value === 'dark' ? '#f97316' : '#7c2d12',
      );
      accentColor.value = hexToRgb('#fff7ed');
    } else if (theme.value === 'theme-4') {
      primaryColor.value = hexToRgb(
        mode.value === 'light' ? '#737373' : '#0a0a0a',
      );
      secondaryColor.value = hexToRgb(
        mode.value === 'dark' ? '#737373' : '#0a0a0a',
      );
      accentColor.value = hexToRgb('#f5f5f5');
    } else if (theme.value === 'default') {
      primaryColor.value = hexToRgb(
        mode.value === 'light' ? '#5b724f' : '#121212',
      );
      secondaryColor.value = hexToRgb(
        mode.value === 'dark' ? '#5b724f' : '#121212',
      );
      accentColor.value = hexToRgb('#eaeaea');
    }
  },
  { immediate: true },
);
</script>
<template>
  <div class="hero place-c-c">
    <div>
      <LazyGradientEffect :primary-color :secondary-color :accent-color />
      <h1>
        <LogoLarge />
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
    font-size: 11px;
    max-width: 280px;
  }
}
</style>
