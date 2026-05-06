<script lang="ts" setup>
import { ref } from "vue";
import DarkMode from "../components/ui/DarkMode.vue";
import OptionDisplayer from "../components/ui/OptionDisplayer.vue";
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="mobile-bar">
    <button @click="toggleMenu">
      <span class="material-icons-round">{{
        isMenuOpen ? "close" : "menu"
      }}</span>
    </button>
  </div>

  <div class="main-containter">
    <aside :class="{ 'aside-open': isMenuOpen }">
      <h3><RouterLink to="/">Pandería Pao</RouterLink></h3>
      <div class="side-menu">
        <OptionDisplayer />
      </div>
      <div class="darkmode-container">
        <DarkMode />
      </div>
    </aside>
    <main><RouterView /></main>
  </div>
</template>

<style scoped>
.mobile-bar {
  background-color: var(--color-surface-2);
  height: 48px;
  box-shadow: var(--shadow-soft);
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0 16px;
}

.mobile-bar button {
  background: none;
  border: none;
  font-size: 24px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.mobile-bar button span {
  color: var(--color-text);
  font-size: 48px;
}

.main-containter {
  width: 100%;
  max-width: 100vw;
  top: 48px;
  position: absolute;
}

aside {
  animation: toggleMenuReverse 0.3s ease-out forwards;
  background: var(--color-surface-2);
  height: calc(100dvh - 48px);
  width: 100%;
  position: fixed;
  top: calc(-100dvh + 48px);
  z-index: 999;
  left: 0;
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 16px;
  gap: 16px;
  overflow: auto;
}

aside a {
  color: var(--color-text);
  text-decoration: none;
  letter-spacing: 1px;
}

.darkmode-container {
  display: flex;
  justify-content: right;
  width: 100%;
}

@keyframes toggleMenu {
  from {
    top: calc(-100dvh + 48px);
    background: transparent;
  }
  to {
    top: 48px;
    background: var(--color-surface-2);
  }
}

@keyframes toggleMenuReverse {
  from {
    top: 48px;
    background: var(--color-surface-2);
  }
  to {
    top: calc(-100dvh + 48px);
    background: transparent;
  }
}

.aside-open {
  animation: toggleMenu 0.3s ease-out forwards;
  top: 48px;
}

main {
  min-height: calc(100dvh - 48px);
  background-color: var(--color-bg);
  position: relative;
  top: 0;
  padding: var(--sm-space);
}

@media (min-width: 768px) {
  .mobile-bar {
    display: none;
  }

  .main-containter {
    display: flex;
    top: 0;
    flex-direction: row;
  }

  aside {
    height: 100vh;
    width: 200px;
    position: static;
    top: 0;
    left: 0;
    animation: none;
    padding: 0;
    border-right: var(--border-thin);
  }

  aside a {
    text-align: center;
    width: 100%;
    display: block;
    margin: 8px 0;
  }

  .darkmode-container {
    display: flex;
    justify-content: right;
    max-width: 100%;
    padding: 8px;
  }

  main {
    min-height: 100dvh;
    position: relative;
    top: 0;
    padding: var(--sm-space);
  }
}
@media (min-width: 1024px) {
}
</style>
