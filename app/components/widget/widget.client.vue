<script lang="ts" setup>
// show case images on hover
const { slug } = defineProps<{
  slug: string;
}>();

const isActive = ref(true);

const { data, pending } = await useProject(slug);
</script>

<template>
  <div class="widget">
    <div class="liquidGlass-effect" />
    <div class="liquidGlass-tint" />
    <div class="liquidGlass-content">
      <div v-if="pending">loading...</div>
      <template v-else-if="data?.project">
        <div class="widget__header justify-between">
          <h4 v-if="data.project.title">{{ data.project.title }}</h4>
          <button @click="isActive = false">
            <nuxt-icon name="close" />
          </button>
        </div>
        <NuxtLink class="widget__body" :to="`/projects/${data?.project.slug}`">
          <nuxt-icon name="codepen2" />
        </NuxtLink>
      </template>
      <!-- <h2>{{ project.title }}</h2>
    <p>Slug: {{ project.slug }}</p>
    <p>Case Type: {{ project.projectCaseType }}</p>
    <p>Created Date: {{ project.createdDate }}</p> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.widget {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  overflow: hidden;
  padding: clamp(8px, 1vw, 10px) clamp(12px, 2vw, 16px);
  min-width: 180px;
  box-shadow: 0px 0px 10px 8px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  &__body {
    ::v-deep(.nuxt-icon svg) {
      height: 10rem;
      width: 10rem;
    }
  }
}
[data-mode='dark'] .widget {
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
}
// liquidGlass
.liquidGlass-effect {
  position: absolute;
  z-index: 0;
  inset: 0;
  backdrop-filter: blur(5px);
  overflow: hidden;
  isolation: isolate;
}

.liquidGlass-tint {
  z-index: 1;
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.1);
}

.liquidGlass-content {
  position: relative;
  z-index: 3;
}
</style>
