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
      <button :disabled="disabled">+ Nuevo</button>
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
  color: #000000;
  font-size: var(--text-md);
}

.employees-header .header-title p {
  color: #3a3a3a;
  font-weight: var(--weight-emphasis);
  font-size: var(--text-base);
}

.employees-header .header-tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.employees-header .header-tools input[type="text"] {
  font-size: var(--text-sm);
  padding: 0 var(--space-3);
  border-radius: var(--radius-md);
  border: var(--set-border-thin);
  height: var(--height-sm);
  min-width: 200px;
}

.employees-header .header-tools input[type="text"]:focus {
  border: var(--set-border-thin);
  outline: none;
  box-shadow: 0 0 5px rgba(25, 154, 228, 0.651);
  transition: box-shadow 0.2s;
}

.employees-header .header-tools button {
  height: var(--height-sm);
  font-size: var(--text-sm);
  border: none;
  cursor: pointer;
  padding: 0 var(--space-3);
  background: var(--button-color-emphasis);
  color: var(--buttontxt-color-emphasis);
  border-radius: var(--radius-md);
}

.employees-header .header-tools button:active {
  transform: scale(0.97);
}
</style>
