<script lang="ts" setup>
const { data } = await useFrontpage();
</script>

<template>
  <main>
    <Hero
      v-if="data?.frontpage?.heroSection"
      :hero="data?.frontpage?.heroSection"
    />
    <LazyWidget
      v-if="data?.frontpage?.project?.slug"
      :slug="data?.frontpage?.project?.slug"
    />
    <!-- <UiRitchTextEditor
      v-if="data?.frontpage?.heroSection?.title"
      :data="data?.frontpage?.heroSection?.title"
    /> -->
  </main>
</template>
