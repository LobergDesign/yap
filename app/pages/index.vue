<script lang="ts" setup>
const { data } = await useFrontpage();
</script>

<template>
  <main v-if="data?.frontpage">
    <Hero
      v-if="data.frontpage.heroSection"
      :hero="data.frontpage.heroSection"
    />
    <div class="grid-w">
      <div class="grid-r">
        <div class="grid-c-8 grid-c-sm-5 grid-c-md-3">
          <h2 v-if="data.frontpage.introTitle">
            {{ data.frontpage.introTitle }}
          </h2>
        </div>
      </div>
      <div class="grid-r">
        <div class="grid-c-8 grid-c-sm-4 grid-c-md-2">
          <UiRitchTextEditor
            v-if="data.frontpage.introText"
            :data="data.frontpage.introText"
          />
        </div>
        <div class="grid-c-8 grid-c-sm-4 grid-c-md-2">
          <UiRitchTextEditor
            v-if="data.frontpage.introText"
            :data="data.frontpage.introText"
          />
        </div>
      </div>
    </div>

    <LazyWidgetHandler :project-slug="data?.frontpage?.project?.slug" />
  </main>
</template>
