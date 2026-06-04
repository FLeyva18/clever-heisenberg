<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Product, CreateProduct } from "../types/ProductInterface";

interface Props {
  product: Product | null;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "close"): void;
  (e: "submit", data: CreateProduct): void;
}>();

const localProduct = ref<CreateProduct>({
  code: "",
  product: "",
  price: 0,
  category_id: null,
  description: null,
  prev_price: null,
  image_url: null,
});

const isEditing = computed(() => props.product !== null);
const formTitle = computed(() =>
  isEditing.value ? "Modificar Producto" : "Añadir Producto",
);
const buttonLabel = computed(() =>
  isEditing.value ? "Guardar Cambios" : "Crear Producto",
);

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      localProduct.value = { ...newProduct };
    } else {
      localProduct.value = {
        code: "",
        product: "",
        price: 0,
        category_id: null,
        description: null,
        prev_price: null,
        image_url: null,
      };
    }
  },
  { immediate: true },
);

const sendData = () => {
  emits("submit", localProduct.value);
};
</script>

<template>
  <div class="modal-backdrop">
    <div class="form-card">
      <h2>{{ formTitle }}</h2>

      <div class="form-group">
        <label>Código</label>
        <input v-model="localProduct.code" type="text" />
      </div>

      <div class="form-group">
        <label>Nombre del Producto</label>
        <input v-model="localProduct.product" type="text" />
      </div>

      <div class="form-group">
        <label>Precio</label>
        <input v-model.number="localProduct.price" type="number" />
      </div>

      <div class="form-actions">
        <button type="button" @click="emits('close')">Cancelar</button>
        <button type="button" class="btn-primary" @click="sendData">
          {{ buttonLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

h2 {
  margin-bottom: 24px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

button {
  color: var(--color-text);
}

.form-card {
  background: var(--color-bg, #fff);
  padding: 48px 24px;
  border-radius: var(--radius, 8px);
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.form-group {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
}
.btn-primary {
  background: var(--color-text, #000);
  color: var(--color-bg, #fff);
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 800;
}
</style>
