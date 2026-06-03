<script setup lang="ts">
import ViewHeader from "../components/ui/ViewHeader.vue";
import DataTable from "../components/DataTable.vue";
import { ref, computed } from "vue";
import { trabajadores } from "../services/mockworkers";
import { formatCurrency } from "../utils/formatters";

const employees = ref([...trabajadores]);
const registers = computed(() => employees.value.length);

const employeesView = computed(() =>
  employees.value.map((e) => ({ ...e, sueldo: formatCurrency(e.sueldo) })),
);

interface COLS {
  key: string;
  label: string;
  sortable: boolean;
}

const columns: COLS[] = [
  { key: "nombre", label: "Nombre", sortable: true },
  { key: "puesto", label: "Puesto", sortable: true },
  { key: "sueldo", label: "Sueldo", sortable: true },
];
</script>

<template>
  <div class="view-container">
    <view-header
      title="Empleados"
      :registers="registers"
      :disabled="false"
      class="employees-header"
    />

    <data-table
      :headers="columns"
      :items="employeesView"
      class="table-component"
    />
  </div>
</template>

<style scoped></style>
