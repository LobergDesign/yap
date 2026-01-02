<script lang="ts" setup>
import { gsap } from 'gsap';

const target = '.box';
const tween = shallowRef<gsap.core.Tween | null>(null);
const gap = 10;

const layout = () => {
  const boxes = gsap.utils.toArray<HTMLElement>(target);

  tween.value?.kill(); // kill any old layout tween

  tween.value = gsap.to(boxes, {
    duration: 0.6,
    y: (i, _el, targets) => {
      // stack each element above the previous ones
      let y = 0;
      for (let j = 0; j < i; j++) {
        const prev = targets[j] as HTMLElement;
        y -= prev.clientHeight + gap;
      }
      return y;
    },
    opacity: 1,
    autoAlpha: 1,
    delay: 0.1,
    stagger: 0.1,
    ease: 'elastic.out(1, 0.8)',
  });
};

onMounted(async () => {
  await nextTick();

  gsap.set(target, {
    y: 60,
    opacity: 0,
  });
  layout();
});

const remove = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement;

  gsap.to(el, {
    duration: 0.4,
    y: '+=60', // drop it down or wherever you like
    opacity: 0,
    autoAlpha: 0,
    ease: 'power3.in',
    onComplete: () => {
      el.parentElement?.removeChild(el);
      layout();
    },
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium soluta tempore maxime, vero veritatis facilis
              molestias distinctio omnis maiores tempora quaerat ratione sed,
              deleniti natus voluptates aut rem iste. Temporibus?
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
