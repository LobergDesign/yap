<script lang="ts" setup>
defineProps<{
  title: string;
  subHeader?: string | null | undefined;
  linkHref: string;
  image: any;
}>();
</script>
<template>
  <div class="spotlight">
    <NuxtLink :to="linkHref">
      <NuxtImg
        :src="'https://eu-central-1-shared-euc1-02.graphassets.com/AO0xo1wOBRUu1cYgu6oD9z/cmlw8i8p5h7or07w2a7iffj86'"
        :alt="image.alt"
        class="spotlight__image"
      />
    </NuxtLink>
    <div class="grid-r">
      <div class="grid-c-12 grid-c-sm-6">
        <h3>{{ title }}</h3>
      </div>
      <div class="grid-c-12 grid-c-sm-6">
        <p v-if="subHeader">{{ subHeader }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
