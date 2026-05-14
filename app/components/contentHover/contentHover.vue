<script lang="ts" setup>
defineProps<{
  title: string;
}>();

const { gsap, SplitText } = useGsap();

const wordTrack = useTemplateRef('wordTrack');
const wordTween = shallowRef<gsap.core.Tween | null>(null);

const initword = () => {
  if (!wordTrack.value) return;

  const track = wordTrack.value;
  const speed = 80; // pixels per second
  const contentWidth = track.scrollWidth / 2; // half because content is duplicated

  wordTween.value = gsap.to(track, {
    xPercent: -50,
    ease: 'none',
    repeat: -1,
    duration: contentWidth / speed,
  });
};

const play = () => wordTween.value?.play();
const pause = () => wordTween.value?.pause();

onUnmounted(() => wordTween.value?.kill());

// splittext effect

onMounted(() => {
  nextTick(initword);
  SplitText.create('.card__hovered-text', {
    type: 'chars', // only split into words and lines (not characters)
    mask: 'lines', // adds extra wrapper element around lines with overflow: clip (v3.13.0+)
    linesClass: 'line++', // adds "line" class to each line element, plus an incremented one too ("line1", "line2", "line3", etc.)
  });
});
</script>
<template>
  <div class="content-hover" @mouseenter="play" @mouseleave="pause">
    <slot />

    <div class="content-hover__hovered">
      <div ref="wordTrack" class="content-hover__word-track">
        <div v-for="copy in 2" :key="copy" class="content-hover__word-content">
          <span class="content-hover__hovered-text">{{ title }}</span>
          <nuxt-icon name="arrow" />
          <span class="content-hover__hovered-text">{{ title }}</span>
          <nuxt-icon name="arrow" />
          <span class="content-hover__hovered-text">{{ title }}</span>
          <nuxt-icon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$hovedered-position: 20px;
.content-hover {
  position: relative;
  padding: clamp(8px, 2vw, 30px) clamp(12px, 2vw, 30px);
  border-radius: $border-radius;

  @media (pointer: fine) {
    &:hover {
      .content-hover__hovered {
        opacity: 1;
        transform: scale(1);
        transition-delay: 0.02s;
      }

      &::after {
        opacity: 0;
        transform: scale(0.95);
      }
    }
  }

  // border
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    border-radius: $border-radius;
    opacity: $border-opacity;
    border: 1px solid theme-color('secondary');
    transition:
      opacity $transition--fast,
      transform $transition--fast;
  }

  @media (pointer: fine) {
    &__hovered {
      display: none;
    }
  }
  // visible content inside card
  &__hovered {
    position: absolute;
    top: $hovedered-position;
    right: -$hovedered-position;
    bottom: $hovedered-position;
    left: -$hovedered-position;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: theme-color('accent');
    border-radius: $border-radius;
    transform: scale(0.8);
    opacity: 0;

    transition:
      opacity $transition--fast,
      transform $transition--fast;
  }

  &__word-track {
    display: flex;
    white-space: nowrap;
    will-change: transform;
    ::v-deep(.nuxt-icon svg) {
      transform: rotate(-90deg);
    }
  }

  &__word-content {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    span {
      color: theme-color('secondary');
      font-size: clamp(14px, 2vw, 40px);
      font-variation-settings: 'wght' 500;
      padding: 0 8px;
    }

    .nuxt-icon {
      margin: 0;
    }
  }
}
</style>
