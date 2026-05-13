<script setup lang="ts">
interface ViewHeaderProps {
  title: string;
  registers: number;
  disabled?: boolean;
}

withDefaults(defineProps<ViewHeaderProps>(), {
  title: "View Title",
  registers: 0,
  disabled: false,
});
</script>

<template>
  <div class="employees-header">
    <div class="header-title">
      <h2>{{ title }}</h2>
      <p>
        <strong>{{ registers }}</strong> Registros encontrados
      </p>
    </div>
    <div class="header-tools">
      <input
        type="text"
        name=""
        id=""
        placeholder="Buscar..."
        :disabled="disabled"
      />
      <button :disabled="disabled"><span class="material-icons">add</span> Nuevo</button>
    </div>
  </div>
</template>

<style scoped>
.employees-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.employees-header .header-title h2 {
  font-size: var(--txt);
  letter-spacing: 1.5px;
}

.employees-header .header-title p {
  font-weight: var(--weight-emphasis);
  font-size: var(--text-base);
}

.employees-header .header-tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.employees-header .header-tools input[type="text"] {
  min-width: 200px;
}

.employees-header .header-tools input[type="text"]:focus {
  border: var(--border-st);
  outline: none;
  color: var(--color-text);
}

.employees-header .header-tools button {
  background: var(--color-text);
  color: var(--color-bg);
  font-size: 14px;
  padding: 8px 16px;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.employees-header .header-tools button:active {
  transform: scale(0.97);
}
</style>
