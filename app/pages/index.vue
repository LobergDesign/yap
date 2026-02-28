<script lang="ts" setup>
const { data } = await useFrontpage();

const cards = [
  {
    type: 'codepen',
    title: 'Design and analyze',
    description:
      'Lorem ipsum dolor sit amet. Vel maiores voluptates et vero consequatur.',
    linkHref: '/about-me',
  },
  {
    type: 'settings',
    title: 'Development',
    description:
      'Lorem ipsum dolor sit amet. Vel maiores voluptates et vero consequatur.',
    linkHref: '/about-me',
  },
  {
    type: 'sun',
    title: 'quality assurance',
    description:
      'Lorem ipsum dolor sit amet. Vel maiores voluptates et vero consequatur.',
    linkHref: '/about-me',
  },
  {
    type: 'codepen',
    title: 'Launch it',
    description:
      'Lorem ipsum dolor sit amet. Vel maiores voluptates et vero consequatur.',
    linkHref: '/about-me',
  },
];
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
      <UiLink text="More about me" href="/about-me" />
      <div class="grid-r spacing-tb">
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="grid-c-12 grid-c-sm-4 grid-c-md-2"
        >
          <Card
            :type="card.type"
            :title="card.title"
            :description="card.description"
            :link-href="card.linkHref"
          />
        </div>
      </div>
      <div class="grid-r">
        <Spotlight
          v-if="data.frontpage.spotlight"
          class="spacing-tb"
          :title="data.frontpage.spotlight.title"
          :sub-header="data.frontpage.spotlight.subHeader"
          :link-href="data.frontpage.spotlight.slug"
          :image="data.frontpage.spotlight.image"
        />
      </div>
      <div class="grid-r">
        <SelectedProjects
          v-if="data.frontpage.projects.length"
          class="spacing-tb"
          :title="data.frontpage.selectedProjectsTitle"
          :slug-list="data.frontpage.projects"
        />
      </div>
    </div>
    <ClientOnly>
      <LazyWidgetHandler
        v-if="data.frontpage.project?.slug"
        :project-slug="data.frontpage.project?.slug"
      />
    </ClientOnly>
  </main>
</template>
