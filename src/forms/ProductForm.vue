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
        <button type="button" class="btn-form-cancel" @click="emits('close')">
          Cancelar
        </button>
        <button type="button" class="btn-primary" @click="sendData">
          {{ buttonLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 24px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.btn-form-cancel {
  color: var(--color-text);
}
</style>
