<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { API_BASE_URL } from "../services/config";
import type { Product, CreateProduct } from "../types/ProductInterface";
import type { Category } from "../types/CategoryInterface";
import { formatCurrency } from "../utils/formatters";
import ViewHeader from "../components/ui/ViewHeader.vue";
import DataTable from "../components/DataTable.vue";
import ProductForm from "../forms/ProductForm.vue";
import Swal from "sweetalert2";
import DownloadOptions from "../forms/DownloadOptions.vue";
import { toast } from "vue3-toastify";

const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const showForm = ref<boolean>(false);
const showDownloadOptions = ref<boolean>(false);
const selectedProduct = ref<Product | null>(null);
const searchQuery = ref<string>("");
const sortKey = ref<string>("");
const sortOrder = ref<"asc" | "desc">("asc");

const COLS = [
  { key: "code", label: "Código", sortable: true },
  { key: "product", label: "Producto", sortable: true },
  { key: "price", label: "Precio", sortable: true },
  { key: "category_id", label: "Categoría", sortable: true },
];

const handleSort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
};

const openCreateModal = () => {
  selectedProduct.value = null;
  showForm.value = true;
};

const openEditModal = (product: Product) => {
  selectedProduct.value = product;
  showForm.value = true;
};

const downloadFile = async (
  endpoint: string,
  nombreArchivo: string,
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) throw new Error(`Error al descargar ${nombreArchivo}`);

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err: any) {
    toast.error(err.message || "No se pudo descargar el archivo");
  }
};

const downloadPDF = async () => {
  await downloadFile("/products/export/pdf", "lista_productos.pdf");
  showDownloadOptions.value = false;
};

const downloadExcel = async () => {
  await downloadFile("/products/export/excel", "lista_productos.xlsx");
  showDownloadOptions.value = false;
};

const downloadCSV = async () => {
  await downloadFile("/products/export/csv", "lista_productos.csv");
  showDownloadOptions.value = false;
};

const handleFormSubmit = async (formData: CreateProduct) => {
  if (selectedProduct.value) {
    await updateProduct(selectedProduct.value.id, formData);
  } else {
    await createProduct(formData);
  }
  await getCategories();
  showForm.value = false;
};

const filteredProducts = computed(() => {
  let result = products.value;

  // 1. LÓGICA DE BÚSQUEDA (Ahora incluye categorías)
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((product) => {
      const categoryName = obtenerNombreCategoria(
        product.category_id,
      ).toLowerCase();

      const matchesCategory = categoryName.includes(query);
      const matchesProps = Object.values(product).some((val) =>
        String(val).toLowerCase().includes(query),
      );

      return matchesCategory || matchesProps;
    });
  }

  // 2. LÓGICA DE ORDENAMIENTO
  if (sortKey.value) {
    result = [...result].sort((a, b) => {
      let valA: any = a[sortKey.value as keyof Product];
      let valB: any = b[sortKey.value as keyof Product];

      if (sortKey.value === "category_id") {
        valA = obtenerNombreCategoria(a.category_id).toLowerCase();
        valB = obtenerNombreCategoria(b.category_id).toLowerCase();
      }

      if (sortKey.value === "price") {
        valA = Number(valA);
        valB = Number(valB);
      }

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortOrder.value === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder.value === "asc" ? 1 : -1;
      return 0;
    });
  }

  return result;
});

const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/product_categories`);
  categories.value = await response.json();
};

const obtenerNombreCategoria = (id: number | null): string => {
  if (!id) return "Sin categoría";

  const categoriaEncontrada = categories.value.find((c) => c.id === id);

  return categoriaEncontrada ? categoriaEncontrada.category : "Desconocida";
};

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
  getCategories();
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
      :sortKey="sortKey"
      :sortOrder="sortOrder"
      @sort="handleSort"
      @delete="deleteProduct"
      @edit="openEditModal"
    >
      <template #price="{ item }">
        {{ formatCurrency(Number(item.price)) }}
      </template>

      <template #category_id="{ item }">
        {{ obtenerNombreCategoria(item.category_id) }}
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
    @pdf="downloadPDF"
    @excel="downloadExcel"
    @csv="downloadCSV"
  />
</template>
