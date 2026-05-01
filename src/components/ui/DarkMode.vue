<script lang="ts" setup>
import { ref, onMounted } from "vue";

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    isDark.value = true;
  }
});

const isDark = ref(false);
const toggleDark = () => {
  isDark.value = !isDark.value;

  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};
</script>

<template>
  <span class="material-icons" @click="toggleDark">
    {{ isDark ? "light_mode" : "dark_mode" }}
  </span>
</template>

<style scoped>
span {
  font-size: 32px;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: transform 0.4s;
}
span:hover {
  transform: rotate(45deg);
  transition: transform 0.4s;
}
</style>
