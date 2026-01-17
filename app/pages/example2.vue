<script lang="ts" setup>
import { gsap } from 'gsap';
import Flip from 'gsap/Flip';

gsap.registerPlugin(Flip);

const getBoxes = () => gsap.utils.toArray<HTMLElement>('.box');

onMounted(async () => {
  await nextTick();
  gsap.from(getBoxes(), {
    y: (i, _el, targets) => {
      // stack each element above the previous ones
      let y = 0;
      for (let j = 0; j < i; j++) {
        const prev = targets[j] as HTMLElement;
        y -= prev.clientHeight + 10;
      }
      return y;
    },
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: 'elastic.out(1, 0.8)',
  });
});

const remove = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement;

  const boxes = gsap.utils.toArray<HTMLElement>('.box');
  const state = Flip.getState(boxes);

  gsap.to(el, {
    duration: 0.35,
    opacity: 0,
    y: '+=60',
    scale: 0.95,
    ease: 'power1.in',
    onComplete: () => {
      el.remove();

      Flip.from(state, {
        duration: 0.55,
        ease: 'power2.inOut',
        absolute: true,
        stagger: 0.05,
      });
    },
  });
};
</script>

<template>
  <main>
    <div class="section">
      <div class="box" @click="remove">green</div>

      <div class="box" @click="remove">
        purple purple purple purple purple purple purple purple purple purple
      </div>

      <div class="box" @click="remove">
        Lorem ipsum dolor sit amet consectetur adipisicing elit...
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  padding-top: 10rem;
}

/* Must be normal flow for collapse */
.section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}

.box {
  padding: 1rem;
  background-color: rgb(240, 128, 128);
  border-radius: 5px;
  width: 16rem;
}
</style>
