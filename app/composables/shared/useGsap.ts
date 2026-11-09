import type { MaybeRefOrGetter } from 'vue';

// Collects every animation created in `setup` and reverts them on unmount, so nothing outlives the component
export const useGsap = (
  setup: gsap.ContextFunc,
  scope?: MaybeRefOrGetter<HTMLElement | null>,
) => {
  let ctx: gsap.Context | undefined;
  onMounted(() => (ctx = gsap.context(setup, toValue(scope) ?? undefined)));
  onScopeDispose(() => ctx?.revert());
};
