<script lang="ts" setup>
import { useStorage } from '@vueuse/core';
import { gsap } from 'gsap';

const { slug } = defineProps<{
  slug: string;
}>();

const isActive = ref(false);
const widgetRef = useTemplateRef('widgetRef');
const tl = shallowRef<gsap.core.Timeline>();
const { data, pending } = await useProject(slug);
const widgetState = useStorage('widget-1-dismissed', false);
// Initialize animation on mount
onMounted(async () => {
  await nextTick();
  if (!widgetRef.value) return;

  // Create timeline with initial state
  tl.value = gsap.timeline({ paused: true });

  gsap.set(widgetRef.value, {
    y: 60,
    opacity: 0,
  });
  if (widgetState.value) return;
  tl.value.to(widgetRef.value, {
    y: 1,
    opacity: 1,
    duration: 0.5,
    ease: 'elastic.out(1,0.8)',
  });

  // Play animation after x seconds
  gsap.delayedCall(2, () => {
    tl.value?.play();
  });
});

const handleClose = () => {
  tl.value?.reverse().then(() => {
    isActive.value = false;
    widgetState.value = true;
  });
};

// Cleanup on unmount
onUnmounted(() => {
  tl.value?.kill();
});
</script>

<template>
  <div ref="widgetRef" class="widget">
    <div v-if="pending">loading...</div>
    <template v-else-if="data?.project">
      <div class="widget__header justify-between">
        <h4 v-if="data.project.title">{{ data.project.title }}</h4>
        <button @click="handleClose">
          <nuxt-icon name="close" />
        </button>
      </div>
      <NuxtLink class="widget__body" :to="`/projects/${data?.project.slug}`">
        <UiTypeIcon
          v-if="data.project.projectCaseType"
          :type="data.project.projectCaseType"
        />
        <p v-if="data.project.subHeader">{{ data.project.subHeader }}</p>
      </NuxtLink>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.widget {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  overflow: hidden;
  padding: 6px 12px;
  width: 160px;
  box-shadow: 0px 0px 10px 8px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  will-change: transform, opacity;
  &__header button {
    position: absolute;
    top: 2px;
    right: 2px;
    padding: 0.5rem;
  }
  &__body {
    p {
      font-size: 10px;
      opacity: 0.5;
      margin-bottom: 5px;
    }
    .type-icon {
      text-align: center;
    }
    ::v-deep(.nuxt-icon svg) {
      height: clamp(4rem, 3vw, 6rem);
      width: clamp(4rem, 3vw, 6rem);
    }
  }
}
[data-mode='dark'] .widget {
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.1);
}
</style>
