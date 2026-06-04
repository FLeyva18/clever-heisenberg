<script setup lang="ts">
interface ViewHeaderProps {
  title: string;
  registers: number;
  disabled?: boolean;
  modelValue?: string;
}

const props = withDefaults(defineProps<ViewHeaderProps>(), {
  title: "View Title",
  registers: 0,
  disabled: false,
  modelValue: "",
});

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "add"): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emits("update:modelValue", target.value);
};
</script>

<template>
  <div class="header-container">
    <div class="header-title">
      <h2>{{ title }}</h2>
      <p>
        <strong>{{ registers }}</strong> Registros Encontrados
      </p>
    </div>
    <div class="header-tools">
      <input
        type="text"
        placeholder="Buscar..."
        :disabled="disabled"
        :value="modelValue"
        @input="onInput"
      />
      <button :disabled="disabled" @click="emits('add')">
        <span class="material-icons">add</span> Nuevo
      </button>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.header-container .header-title h2 {
  font-size: var(--txt);
  letter-spacing: 1.5px;
}

.header-container .header-title p {
  font-size: 14px;
  letter-spacing: 1px;
  color: var(--color-text-muted);
}

.header-container .header-tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.header-container .header-tools input[type="text"] {
  min-width: 200px;
}

.header-container .header-tools input[type="text"]:focus {
  border: var(--border-st);
  outline: none;
  color: var(--color-text);
}

.header-container .header-tools button {
  background: var(--color-text);
  color: var(--color-bg);
  font-size: 14px;
  padding: 8px 16px;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.header-container .header-tools button:active {
  transform: scale(0.97);
}
</style>
