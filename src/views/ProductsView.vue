<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { API_BASE_URL } from "../services/config";
import type { Product, CreateProduct } from "../types/ProductInterface";
import { formatCurrency } from "../utils/formatters";
import ViewHeader from "../components/ui/ViewHeader.vue";
import DataTable from "../components/DataTable.vue";
import ProductForm from "../forms/ProductForm.vue";
import Swal from "sweetalert2";
import DownloadOptions from "../forms/DownloadOptions.vue";
import { toast } from "vue3-toastify";

const products = ref<Product[]>([]);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const showForm = ref<boolean>(false);
const showDownloadOptions = ref<boolean>(false);
const selectedProduct = ref<Product | null>(null);
const searchQuery = ref<string>("");

const COLS = [
  { key: "code", label: "Código", sortable: true },
  { key: "product", label: "Producto", sortable: true },
  { key: "price", label: "Precio", sortable: true },
  { key: "category_id", label: "Categoría", sortable: true },
];

const openCreateModal = () => {
  selectedProduct.value = null;
  showForm.value = true;
};

const openEditModal = (product: Product) => {
  selectedProduct.value = product;
  showForm.value = true;
};

const descargarPDF = () => {
  console.log("Llamando al backend para descargar PDF de PRODUCTOS...");
  showDownloadOptions.value = false;
};

const descargarExcel = () => {
  console.log("Llamando al backend para descargar Excel de PRODUCTOS...");
  showDownloadOptions.value = false;
};

const handleFormSubmit = async (formData: CreateProduct) => {
  if (selectedProduct.value) {
    await updateProduct(selectedProduct.value.id, formData);
  } else {
    await createProduct(formData);
  }
  showForm.value = false;
};

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;

  const query = searchQuery.value.toLowerCase();

  return products.value.filter((product) => {
    return Object.values(product).some((val) =>
      String(val).toLowerCase().includes(query),
    );
  });
});

const getProducts = async (): Promise<void> => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error("Failed to fetch products");

    const data = (await response.json()) as Product[];
    products.value = data;
  } catch (err: any) {
    error.value = err.message || "An error occurred";
  } finally {
    loading.value = false;
  }
};

const createProduct = async (formData: CreateProduct): Promise<void> => {
  const createRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Failed to create product");

    const createdProduct = (await response.json()) as Product;

    products.value.push(createdProduct);
  };

  await toast.promise(createRequest(), {
    pending: "Creando producto...",
    success: "Producto creado correctamente",
    error: "Error al crear el producto",
  });
};

const deleteProduct = async (id: number): Promise<void> => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
  });

  if (!result.isConfirmed) return;

  const deleteRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("No se pudo eliminar el producto");

    products.value = products.value.filter((p) => p.id !== id);
  };

  toast.promise(deleteRequest(), {
    pending: "Eliminando registro...",
    success: "Producto eliminado correctamente",
    error: "Error al contactar con la base de datos",
  });
};

const updateProduct = async (
  id: number,
  updatedData: CreateProduct,
): Promise<void> => {
  const updateRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error("Failed to update product");

    const updatedProduct = (await response.json()) as Product;

    const index = products.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      products.value[index] = updatedProduct;
    }
  };
  toast.promise(updateRequest(), {
    pending: "Actualizando producto...",
    success: "Producto actualizado correctamente",
    error: "Error al actualizar el producto",
  });
};

onMounted(() => {
  getProducts();
});
</script>

<template>
  <div class="view-container">
    <view-header
      title="Productos"
      :registers="filteredProducts.length"
      :disabled="loading"
      v-model="searchQuery"
      @add="openCreateModal"
      @download="showDownloadOptions = true"
    />
    <data-table
      :headers="COLS"
      :items="filteredProducts"
      @delete="deleteProduct"
      @edit="openEditModal"
    >
      <template #price="{ item }">
        {{ formatCurrency(Number(item.price)) }}
      </template>
    </data-table>
  </div>

  <product-form
    v-if="showForm"
    :product="selectedProduct"
    @close="showForm = false"
    @submit="handleFormSubmit"
  />

  <DownloadOptions
    v-if="showDownloadOptions"
    @close="showDownloadOptions = false"
    @pdf="descargarPDF"
    @excel="descargarExcel"
    @csv="showDownloadOptions = false"
  />
</template>
