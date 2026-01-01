<script lang="ts" setup>
import { gsap } from 'gsap';

const target = '.box';

onMounted(async () => {
  await nextTick();

  gsap.set(target, {
    y: 60,
    opacity: 0,
  });

  gsap.to(target, {
    duration: 1,
    y: (i, target, targets) => {
      const prevTarget = targets[i + -1];

      if (!prevTarget) {
        return 0;
      } else {
        console.log('prevTarget', prevTarget.clientHeight);
        return -prevTarget.clientHeight;
      }
    },
    opacity: 1,
    delay: 0.5,
    stagger: 0.3,
    ease: 'elastic.out(1,0.8)',
  });
});

const remove = (e: Event) => {
  gsap.to(e.target, {
    duration: 1,
    y: 60,
    opacity: 0,
    ease: 'elastic.out(1,0.8)',
  });
};
</script>

<template>
  <main>
    <div class="grid-w">
      <div class="grid-r">
        <div class="grid-c-8">
          <div class="section">
            <div class="box place-c-c" @click="remove">green</div>
            <div class="box place-c-c" @click="remove">
              purple purple purple purple purple purple purple purple purple
              purple purple purple purple purple
            </div>
            <div class="box place-c-c" @click="remove">
              orange orange orange orange orange orange orange orange orange
              orange orange orange
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  padding-top: 10rem;
}
.box {
  padding: 1rem;
  background-color: rgb(240, 128, 128);
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 10rem;
  position: fixed;
  bottom: 1rem;
  left: 40%;
}
</style>
