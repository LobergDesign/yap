<script lang="ts" setup>
const { slug } = defineProps<{
  slug: string;
}>();

const { data, pending } = await useProject(slug);
</script>

<template>
  <Widget :pending :title="data?.project?.title">
    <NuxtLink
      v-if="data?.project"
      class="widget__body"
      :to="`/projects/${data.project.slug}`"
    >
      <UiTypeIcon
        v-if="data.project.projectCaseType"
        :type="data.project.projectCaseType"
      />
      <p v-if="data.project.subHeader">{{ data.project.subHeader }}</p>
    </NuxtLink>
  </Widget>
</template>

<style lang="scss" scoped>
.widget {
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
</style>
