<script lang="ts" setup>
import RitchTextEditor from '~/components/ui/ritchTextEditor.vue';

const wght = ref(200);
const toggle = () => (wght.value = wght.value === 200 ? 900 : 200);
const { data } = await useFrontpage();
</script>

<template>
  <div>
    <h1>(yap)</h1>
    <div class="grid place-items-center min-h-dvh gap-4">
      <p class="var-text text-5xl">Nunito Sans Variable</p>
      <button class="px-3 py-2 rounded bg-blue-600 text-white" @click="toggle">
        toggle ({{ wght }})
      </button>
    </div>

    <RitchTextEditor
      v-if="data?.frontpage?.heroSection?.title"
      :data="data?.frontpage?.heroSection?.title"
    />
    <div class="grid-w">
      <div class="grid-r">
        <div class="grid-c-12 grid-c-md-6 grid-c-lg-4">Column 1</div>
        <div class="grid-c-12 grid-c-md-6 grid-c-lg-4">Column 2</div>
        <div class="grid-c-12 grid-c-md-6 grid-c-lg-4">Column 3</div>
      </div>
    </div>

    <div class="grid-w">
      <div class="grid-auto-fit">
        <div>Card 1</div>
        <div>Card 2</div>
        <div>Card 3</div>
        <div>Card 1</div>
        <div>Card 2</div>
        <div>Card 3</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.var-text {
  transition: font-variation-settings 0.4s ease;
  font-variation-settings: 'wght' v-bind(wght);
}
</style>
