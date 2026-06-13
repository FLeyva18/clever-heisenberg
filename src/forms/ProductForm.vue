<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import type { Product, CreateProduct } from "../types/ProductInterface";
import type { Category } from "../types/CategoryInterface";
import { API_BASE_URL } from "../services/config";
import { toast } from "vue3-toastify";
import Swal from "sweetalert2";

interface Props {
  product: Product | null;
}

const categories = ref<Category[]>([]);
const searchCategory = ref<string>("");

onMounted(() => {
  getCategories();
});

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
      const category = categories.value.find(
        (cat) => cat.id === newProduct.category_id,
      );
      searchCategory.value = category ? category.category : "";
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
      searchCategory.value = "";
    }
  },
  { immediate: true },
);

const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/product_categories`);
    if (response.ok) {
      categories.value = await response.json();
    }
  } catch (error) {
    console.error("Error al cargar categorías", error);
  }
};

const createCategory = async (name: string): Promise<number | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/product_categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: name }),
    });
    if (!response.ok) throw new Error("Failed to create category");

    const newCategory = (await response.json()) as Category;
    categories.value.push(newCategory);
    return newCategory.id;
  } catch (error) {
    console.error("Error al crear categoría", error);
  }
  return null;
};

const processForm = async () => {
  const nameOfCategory = searchCategory.value.trim();

  if (!nameOfCategory) {
    toast.warning("Por favor, ingresa un nombre de categoría");
    return;
  }

  const existingCategory = categories.value.find(
    (cat) => cat.category.toLowerCase() === nameOfCategory.toLowerCase(),
  );

  let finalCategoryId: number | null = null;

  if (existingCategory) {
    finalCategoryId = existingCategory.id;
  } else {
    const result = await Swal.fire({
      title: "Categoría no encontrada",
      text: `La categoría "${nameOfCategory}" no existe. ¿Deseas agregarla a la base de datos?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, crear",
      cancelButtonText: "No, cancelar",
    });

    if (!result.isConfirmed) return;
    finalCategoryId = await createCategory(nameOfCategory);
    if (!finalCategoryId) return;
  }
  localProduct.value.category_id = finalCategoryId;
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

      <div class="form-group">
        <label>Categoría</label>

        <input
          v-model="searchCategory"
          type="text"
          placeholder="Seleccionar categoría..."
          list="category-options"
        />

        <datalist id="category-options">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.category"
          ></option>
        </datalist>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-form-cancel" @click="emits('close')">
          Cancelar
        </button>
        <button type="button" class="btn-primary" @click="processForm">
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
