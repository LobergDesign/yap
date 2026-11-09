<script lang="ts" setup>
defineProps<{
  projectSlug?: string;
}>();

const root = useTemplateRef('root');
let ctx: gsap.Context | undefined;
const target = '.widget-box';
const tween = shallowRef<gsap.core.Tween | null>(null);
const gap = 10;

const stackElements = () => {
  const boxes = gsap.utils.toArray<HTMLElement>(target);
  tween.value?.kill();
  if (!boxes.length) return;
  tween.value = gsap.to(boxes, {
    duration: 0.6,
    y: (i, _el, targets) => {
      // stack each element above the previous ones
      let y = 0;
      for (const el of targets.slice(0, i)) {
        y -= el.clientHeight + gap;
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

// Animations started later (timer, clicks) go through ctx.add so they are reverted on unmount too
useGsap((self) => {
  ctx = self;
  const timer = setTimeout(() => {
    requestAnimationFrame(() => self.add(stackElements));
  }, 1500);
  return () => clearTimeout(timer);
}, root);

const remove = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement;
  ctx?.add(() =>
    gsap.to(el, {
      duration: 0.4,
      y: '+=60',
      opacity: 0,
      autoAlpha: 0,
      ease: 'power3.in',
      onComplete: () => {
        el.parentElement?.removeChild(el);
        ctx?.add(stackElements);
      },
    }),
  );
};
</script>

<template>
  <div ref="root">
    <WidgetProject
      v-if="projectSlug"
      class="widget-box"
      :slug="projectSlug"
      @click="remove"
    />
    <WidgetCityInfo class="widget-box" @click="remove" />
  </div>
</template>
<style lang="scss" scoped>
.widget-box {
  opacity: 0;
  transform: translateY(120px);
  will-change: transform, opacity;
}
</style>
