<script lang="ts" setup>
const { data } = await useFrontpage();
</script>

<template>
  <main>
    <UiRitchTextEditor
      v-if="data?.frontpage?.heroSection?.title"
      :data="data?.frontpage?.heroSection?.title"
    />
  </main>
</template>
