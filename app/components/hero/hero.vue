<script lang="ts" setup>
import type { HeroFieldsFragment } from '~/types/generated/graphql';
import { gsap } from 'gsap';
const { hero } = defineProps<{
  hero: HeroFieldsFragment;
}>();

// const primaryColor = '20, 20, 18';
// const secondaryColor = '228, 241, 222';
// const accentColor = '91, 114, 79';

// const primaryColor = '91, 114, 79';
// const secondaryColor = '228, 241, 222';
// const accentColor = '20, 20, 18';

// const primaryColor = '228, 241, 222';
// const secondaryColor = '91, 114, 79';
// const accentColor = '20, 20, 18';
const primaryColor = '20, 20, 18';
const secondaryColor = '91, 114, 79';
const accentColor = '228, 241, 222';

const b1 = `linear-gradient(217deg, rgba(${primaryColor},.9), rgba(${primaryColor},0) 70.71%),  linear-gradient(127deg, rgba(${secondaryColor},.9), rgba(0,${primaryColor}) 70.71%), linear-gradient(336deg, rgba(${accentColor},.9), rgba(0,${secondaryColor}) 70.71%)`;

const b2 = `linear-gradient(17deg, rgba(${primaryColor},.7), rgba(${primaryColor},0) 70.71%), linear-gradient(200deg, rgba(${secondaryColor}, .9), rgba(${secondaryColor},.2) 70.71%),  linear-gradient(336deg, rgba(${accentColor},.8), rgba(0,${secondaryColor}.1) 70.71%)`;

const herorRef = useTemplateRef('heroRef');
onMounted(() => {
  gsap.fromTo(
    herorRef.value,
    { width: '100%', height: '100%', background: b1 },
    { ease: 'none', duration: 20, background: b2, repeat: -1, yoyo: true },
  );
});
</script>
<template>
  <div class="hero place-c-c">
    <div>
      <div class="bg-effect" ref="heroRef"></div>
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
  .bg-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
</style>
