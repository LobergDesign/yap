<script lang="ts" setup>
import { gsap } from 'gsap';
const { projectSlug = null } = defineProps<{
  projectSlug?: string;
}>();

const target = '.widget-box';
const tween = shallowRef<gsap.core.Tween | null>(null);
const gap = 10;

const layout = () => {
  const boxes = gsap.utils.toArray<HTMLElement>(target);
  console.log('target layout', boxes);
  tween.value?.kill();

  tween.value = gsap.to(boxes, {
    duration: 0.6,
    y: (i, _el, targets) => {
      // stack each element above the previous ones
      let y = 0;
      for (let j = 0; j < i; j++) {
        const prev = targets[j] as HTMLElement;
        y -= prev.clientHeight + gap;
      }
      return y;
    },
    opacity: 1,
    autoAlpha: 1,
    delay: 0.1,
    stagger: 0.1,
    ease: 'elastic.out(1, 0.8)',
  });
};

onMounted(async () => {
  await nextTick();
  console.log('target onmoauned', target);

  requestAnimationFrame(() => {
    gsap.set(target, {
      y: 60,
      opacity: 0,
    });
    layout();
  });
});

// Cleanup on unmount
// onUnmounted(() => tween.value?.kill());
const remove = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement;

  gsap.to(el, {
    duration: 0.4,
    y: '+=60',
    opacity: 0,
    autoAlpha: 0,
    ease: 'power3.in',
    onComplete: () => {
      el.parentElement?.removeChild(el);
      layout();
    },
  });
};
</script>

<template>
  <div>
    <WidgetProject
      v-if="projectSlug"
      class="widget-box"
      :slug="projectSlug"
      @close="remove"
    />
    <WidgetCityInfo class="widget-box" @close="remove" />
  </div>
</template>

<style></style>
