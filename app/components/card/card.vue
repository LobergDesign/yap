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
      <ContentHover :title="title">
        <div class="card__content flex flex-vertical-center">
          <nuxt-icon :name="type" />
          <div>
            <h4>{{ title }}</h4>
            <p>{{ description }}</p>
          </div>
        </div>
      </ContentHover>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
$svg-size: clamp(30px, 3vw, 50px);
.card {
  p {
    font-size: 11px;
  }
  &__content {
    ::v-deep(.nuxt-icon svg) {
      width: $svg-size;
      height: $svg-size;
      margin-right: 15px;
    }
  }
}
</style>
