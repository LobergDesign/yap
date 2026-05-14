<script lang="ts" setup>
const { slug } = defineProps<{
  slug: string;
}>();

const { data, pending } = await useProject(slug);
</script>
<template>
  <div v-if="pending">
    <p>Loading...</p>
  </div>
  <div v-if="!pending && data" class="selected-projects-item">
    <NuxtLink
      v-if="data.project"
      :to="`/projects/${data.project.slug}`"
      class="grid-r"
    >
      <ContentHover :title="data.project.title">
        <div class="grid-r">
          <NuxtTime
            class="grid-c-1"
            :datetime="data.project.createdAt"
            year="numeric"
          />
          <h4 class="grid-c-2">
            {{ data.project.title }}
          </h4>
          <p class="grid-c-2">
            {{ data.project.projectCaseType }}
          </p>
          <ul class="grid-c-2">
            <ui-tag
              v-for="value in data.project.executionArea"
              :key="value"
              :tag="enumConverter(value)"
            />
          </ul>
          <div class="grid-c-1 selected-projects-item__icon justify-end">
            <nuxt-icon name="arrow" />
          </div>
        </div>
      </ContentHover>

      <!-- <pre>
        {{ data.project }}
      </pre> -->
    </NuxtLink>
  </div>
  <div v-else>no projects...</div>
</template>

<style lang="scss" scoped>
$svg-size: clamp(15px, 2vw, 18px);
.selected-projects-item {
  font-size: 12px;
  &__icon ::v-deep(.nuxt-icon svg) {
    width: $svg-size;
    height: $svg-size;
    transform: rotate(-90deg);
  }
}
</style>
