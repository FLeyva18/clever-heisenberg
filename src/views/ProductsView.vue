<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { API_BASE_URL } from "../services/config";
import type { Product, CreateProduct } from "../types/ProductInterface";
import { formatCurrency } from "../utils/formatters";
import ViewHeader from "../components/ui/ViewHeader.vue";
import DataTable from "../components/DataTable.vue";

const products = ref<Product[]>([]);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

const newProduct = ref<CreateProduct>({
  code: "",
  product: "",
  price: 0,
  category_id: null,
  description: null,
  prev_price: null,
  image_url: null,
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

const createProduct = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct.value),
    });

    if (!response.ok) throw new Error("Failed to create product");

    const createdProduct = (await response.json()) as Product;

    products.value.push(createdProduct);

    newProduct.value = {
      code: "",
      product: "",
      price: 0,
      category_id: null,
      description: null,
      prev_price: null,
      image_url: null,
    };
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

    // CORRECCIÓN 2: Filtramos el arreglo local
    products.value = products.value.filter((p) => p.id !== id);
  } catch (err: any) {
    error.value = err.message || "An error occurred while deleting product";
  }
};

// Se deja preparado para cuando implementes el botón de "Editar"
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
      :registers="products.length"
      :disabled="false"
    />
    <!-- <data-table :headers="columns" :items="productsView" /> -->
  </div>
</template>
