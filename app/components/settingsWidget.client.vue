<script setup lang="ts">
const { font, theme, mode, fonts, themes, applySettings, loadSettings } =
  useSettings();
const isOpen = ref(false);

const modes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

onMounted(() => loadSettings());
watch([font, theme, mode], () => applySettings());
</script>

<template>
  <div>
    <button type="button" class="trigger" @click="isOpen = !isOpen">
      <nuxt-icon name="settings" />
    </button>
    <Transition name="panel">
      <div v-if="isOpen" class="panel">
        <div class="grid-r">
          <h3 class="grid-c-6">Settings</h3>
          <button
            type="button"
            class="grid-c-2 close place-c-r"
            @click="isOpen = false"
          >
            <nuxt-icon name="close" />
          </button>
        </div>

        <div class="content">
          <div class="group">
            <label for="theme">Theme</label>
            <select id="theme" v-model="theme">
              <option v-for="t in themes" :key="t.value" :value="t.value">
                {{ t.label }}
              </option>
            </select>
          </div>
          <div class="group">
            <label for="font">Font</label>
            <select id="font" v-model="font">
              <option v-for="f in fonts" :key="f.value" :value="f.value">
                {{ f.label }}
              </option>
            </select>
          </div>
          <div class="group">
            <label>Mode</label>
            <div class="toggle">
              <label v-for="m in modes" :key="m.value" class="radio">
                <input v-model="mode" type="radio" :value="m.value" />
                <span>{{ m.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.trigger {
  position: fixed;
  bottom: 24px;
  left: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: theme-color('secondary');
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0px 20px rgba(0, 0, 0, 0.2);
  z-index: 100;
  color: theme-color('primary');
  transition: transform 200ms ease-out;

  &:hover {
    transform: scale(1.05) rotate(90deg);
  }
}
[data-mode='dark'] .trigger {
  box-shadow: 0 0px 10px rgba(255, 255, 255, 0.6);
}
.panel {
  position: fixed;
  bottom: 5rem;
  left: 2rem;
  width: 20rem;
  padding: 1.2rem;
  background: rgba(var(--primary), 0.85);
  backdrop-filter: blur(20px);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  z-index: 100;
}
[data-mode='dark'] .panel {
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
}

.close {
  color: theme-color('secondary');

  &:hover {
    opacity: 0.7;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: theme-color('secondary');
  }

  select {
    height: 44px;
    padding: 12px 16px;
    border-width: 1px;
    border-style: solid;
    border-color: theme-color('accent');
    border-radius: 0.5rem;
    background: theme-color('primary');
    color: theme-color('secondary');
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 200ms ease-out;
    &:focus {
      outline: 2px solid theme-color('accent');
      outline-offset: 1px;
    }
  }
}

.toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  .radio {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 44px;
    padding: 12px 16px;
    border-style: solid;
    border-color: theme-color('accent');
    border-radius: 0.5rem;
    cursor: pointer;

    span {
      font-size: 0.875rem;
      color: theme-color('secondary');
    }
  }

  // transition
  .panel-enter-active,
  .panel-leave-active {
    transition:
      transform 300ms ease-out,
      opacity 200ms ease-out;
  }

  .panel-enter-from,
  .panel-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }
}
</style>
