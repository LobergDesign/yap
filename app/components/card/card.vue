<script lang="ts" setup>
defineProps<{
  type: string;
  title: string;
  description: string;
  linkHref: string;
}>();
</script>
<template>
  <NuxtLink :to="linkHref">
    <div class="card">
      <div class="card__content flex flex-center">
        <nuxt-icon :name="type" />
        <div>
          <h4>{{ title }}</h4>
          <p>{{ description }}</p>
        </div>
      </div>
      <div class="card__hovered">
        <span> {{ title }}</span>
        <nuxt-icon name="arrow" />
        <span> {{ title }}</span>
        <nuxt-icon name="arrow" />
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.card {
  padding: clamp(15px, 2vw, 30px);
  border-radius: $border-radius;
  border: 1px solid theme-color('accent');
  .nuxt-icon {
    margin-right: 15px;
    width: clamp(30px, 5vw, 60px);
  }
  p {
    font-size: 11px;
  }
  &__hovered {
    display: none;
  }
}
</style>
