<script lang="ts" setup>
import { gsap } from 'gsap';
const { projectSlug = null } = defineProps<{
  projectSlug?: string;
}>();

const isActive = ref(false);
const widgetRef = useTemplateRef('widgetRef');
const tl = shallowRef<gsap.core.Timeline>();

// Initialize animation on mount
onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    console.log('widgetRef.value', widgetRef.value);
    if (!widgetRef.value) return;

    // Create timeline with initial state
    tl.value = gsap.timeline({ paused: true });

    gsap.set(widgetRef.value, {
      y: 60,
      opacity: 0,
    });
    tl.value.to(widgetRef.value, {
      y: 1,
      opacity: 1,
      duration: 0.6,
      ease: 'elastic.out(1,0.8)',
    });

    // Play animation after x seconds
    gsap.delayedCall(2, () => tl.value?.play());
  }, 500);
});

// Cleanup on unmount
onUnmounted(() => tl.value?.kill());
const handleClose = () => {
  console.log('close');
  tl.value?.reverse().then(() => (isActive.value = false));
};
</script>

<template>
  <div>
    <LazyWidgetProject
      v-if="projectSlug"
      ref="widgetRef"
      :slug="projectSlug"
      :widget-id="1"
      @close="handleClose"
    />
    <LazyWidgetCityInfo ref="widgetRef" :widget-id="0" @close="handleClose" />
  </div>
</template>

<style></style>
