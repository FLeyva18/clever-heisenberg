<script setup lang="ts">
import ViewHeader from "../components/ui/ViewHeader.vue";
import DataTable from "../components/DataTable.vue";
import { ref, computed } from "vue";
import { trabajadores } from "../services/mockworkers";

const employees = ref([...trabajadores]);
const registers = computed(() => employees.value.length);

const fmt = (n: number) => 
n.toLocaleString('es-MX', { 
  style: 'currency', 
  currency: 'MXN', 
  maximumFractionDigits: 2 });

// Solo formatea para la vista, sin tocar el arreglo original
const employeesView = computed(() =>
  employees.value.map(e => ({ ...e, sueldo: fmt(e.sueldo) }))
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
  <div class="employees-component">

    <view-header
    title="Empleados"
    :registers="registers"
    :disabled="false"
    class="employees-header"
    />
    
    <data-table :headers="columns" :items="employeesView" class="table-component" />
  </div>
</template>

<style scoped>
.employees-component{
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
