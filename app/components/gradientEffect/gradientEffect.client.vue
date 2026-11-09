<script lang="ts" setup>
const { primaryColor, secondaryColor, accentColor } = defineProps<{
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}>();

const effect1 = computed(
  () =>
    `linear-gradient(217deg, rgba(${primaryColor},.9), rgba(${primaryColor},0) 70.71%),  linear-gradient(127deg, rgba(${secondaryColor},.9), rgba(0,${primaryColor}) 70.71%), linear-gradient(336deg, rgba(${accentColor},.9), rgba(0,${secondaryColor}) 70.71%)`,
);
const effect2 = computed(
  () =>
    `linear-gradient(17deg, rgba(${primaryColor},.7), rgba(${primaryColor},0) 70.71%), linear-gradient(200deg, rgba(${secondaryColor}, .9), rgba(${secondaryColor},.2) 70.71%),  linear-gradient(336deg, rgba(${accentColor},.8), rgba(0,${secondaryColor}.1) 70.71%)`,
);

const gradientEffectRef = useTemplateRef('gradientEffect');
let ctx: gsap.Context | undefined;

const animate = () => {
  if (!gradientEffectRef.value) return;
  gsap.fromTo(
    gradientEffectRef.value,
    { width: '100%', height: '100%', background: effect1.value },
    {
      ease: 'none',
      duration: 18,
      background: effect2.value,
      repeat: -1,
      yoyo: true,
    },
  );
};

// The template ref of a .client component is not set yet in onMounted, so wait a tick
useGsap((self) => {
  ctx = self;
  nextTick(() => self.add(animate));
});

// Restart inside the context so the new tween is still reverted on unmount
watch([() => primaryColor, () => secondaryColor, () => accentColor], () => {
  ctx?.revert();
  ctx?.add(animate);
});
</script>
<template>
  <div ref="gradientEffect" class="gradient-effect" />
</template>

<style lang="scss" scoped>
.gradient-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
