<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { API_BASE_URL } from "../services/config";
import type { Product, CreateProduct } from "../types/ProductInterface";
import { formatCurrency } from "../utils/formatters";
import ViewHeader from "../components/ui/ViewHeader.vue";
import DataTable from "../components/DataTable.vue";
import ProductForm from "../forms/ProductForm.vue";

const products = ref<Product[]>([]);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const showForm = ref<boolean>(false);
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

const handleFormSubmit = async (formData: CreateProduct) => {
  if (selectedProduct.value) {
    await updateProduct(selectedProduct.value.id, formData);
  } else {
    await createProduct(formData);
  }
  showForm.value = false;
};

const filteredProducts = computed(() => {
  let formatted = products.value.map((p) => ({
    ...p,
    price: formatCurrency(Number(p.price)),
  }));

  if (!searchQuery.value) return formatted;

  const query = searchQuery.value.toLowerCase();

  return formatted.filter((product) => {
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
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Failed to create product");

    const createdProduct = (await response.json()) as Product;

    products.value.push(createdProduct);
  } catch (err: any) {
    error.value = err.message || "An error occurred while creating product";
  }
};

const deleteProduct = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete product");

    products.value = products.value.filter((p) => p.id !== id);
  } catch (err: any) {
    error.value = err.message || "An error occurred while deleting product";
  }
};

const updateProduct = async (
  id: number,
  updatedData: CreateProduct,
): Promise<void> => {
  try {
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
  } catch (err: any) {
    error.value = err.message || "An error occurred while updating product";
  }
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
    /><data-table
      :headers="COLS"
      :items="filteredProducts"
      @delete="deleteProduct"
      @edit="openEditModal"
    />
  </div>

  <product-form
    v-if="showForm"
    :product="selectedProduct"
    @close="showForm = false"
    @submit="handleFormSubmit"
  />
</template>
