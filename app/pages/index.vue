<script lang="ts" setup>
const { data } = await useFrontpage();
</script>

<template>
  <main v-if="data?.frontpage">
    <Hero
      v-if="data.frontpage.heroSection"
      :hero="data.frontpage.heroSection"
    />
    <div class="grid-w spacing-tb">
      <div class="grid-r">
        <div class="grid-c-8 grid-c-sm-6 grid-c-md-4">
          <h2 v-if="data.frontpage.introTitle">
            {{ data.frontpage.introTitle }}
          </h2>
        </div>
      </div>
      <SideBySide
        v-if="data.frontpage.introContent"
        :data="data.frontpage.introContent"
      />
      <NuxtLink to="about-me">More about me</NuxtLink>
    </div>
    <ClientOnly>
      <LazyWidgetHandler
        v-if="data.frontpage.project?.slug"
        :project-slug="data.frontpage.project?.slug"
      />
    </ClientOnly>
  </main>
</template>
