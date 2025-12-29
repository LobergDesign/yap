<script lang="ts" setup>
const { data } = await useFrontpage();
</script>

<template>
  <main>
    <Hero
      v-if="data?.frontpage?.heroSection"
      :hero="data?.frontpage?.heroSection"
    />
    <!-- <UiRitchTextEditor
      v-if="data?.frontpage?.heroSection?.title"
      :data="data?.frontpage?.heroSection?.title"
    /> -->
  </main>
</template>
