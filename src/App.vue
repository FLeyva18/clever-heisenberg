<script setup lang="ts">
import { onMounted } from "vue";
onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  // Si el usuario prefería oscuro, lo aplicamos en toda la app al iniciar
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  }
});
</script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>
