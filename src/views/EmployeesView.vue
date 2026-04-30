<script setup lang="ts">
import ViewHeader from "../components/ui/ViewHeader.vue";
import DataTable from "../components/DataTable.vue";
import { ref, computed } from "vue";
import { trabajadores } from "../services/mockworkers";

const employees = ref([...trabajadores]);
const registers = computed(() => employees.value.length);

interface COLS {
  key: string,
  label: string,
  sortable: boolean,
};

const columns: COLS[] = [
        {key: 'nombre', label: 'Nombre', sortable: true},
        {key: 'puesto', label: 'Puesto', sortable: true},
        {key: 'sueldo', label: 'Sueldo', sortable: true},
      ]

</script>

<template>
  <view-header 
  title="Empleados" 
  :registers="registers" 
  :disabled="false" 
  class="employees-header"/>

  <data-table 
  :headers="columns" 
  :items="employees" 
  class="table-component"/>
</template>

<style scoped>
.employees-header{
  margin: var(--space-3);
  padding: var(--space-1);
}

.table-component {
  margin: var(--space-3);
  padding: var(--space-1);
}
</style>
