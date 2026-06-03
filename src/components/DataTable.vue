<script setup lang="ts">
interface Data {
  id: number;
  nombre: string;
  puesto: string;
  departamento: string;
  sueldo: number | string;
  turno: string;
  activo: boolean;
  fechaIngreso: string;
}

interface Header {
  key: string;
  label: string;
  sortable: boolean;
}

interface Props {
  headers: Header[];
  items: Data[];
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "modify", item: Data): void;
  (e: "delete", id: number): void;
}>();
</script>

<template>
  <div class="table-component">
    <div class="table-body">
      <table>
        <thead>
          <tr>
            <th v-for="c in headers" :key="c.key">
              {{ c.label }}
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td v-for="header in headers" :key="header.key">
              <slot :name="header.key" :item="item">
                {{ item[header.key as keyof Data] }}
              </slot>
            </td>
            <td class="action-buton-set">
              <button class="btn-edit">Editar</button>
              <button class="btn-delete">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-footer">
      <p>página 1 de 1</p>
      <div class="button-set">
        <button>← Anterior</button>
        <button>Siguiente →</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-body {
  border: var(--border-md);
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}

.table-body table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.table-body table thead {
  background: var(--color-surface-2);
  font-size: var(--txt);
  border-bottom: var(--border-thin);
}

.table-body table thead th,
td {
  cursor: default;
  padding: 8px 4px;
}

.table-body table tbody td {
  padding: 8px;
  font-size: 14px;
}

.table-body table tbody tr:nth-child(even) {
  background: var(--color-surface);
}

.table-body table tbody tr:hover {
  background: var(--color-surface-2);
  transition: background 0.2s;
}

.action-buton-set {
  display: flex;
  gap: 4px;
}

.action-buton-set button {
  border: var(--border-st);
  color: var(--color-text);
}

.action-buton-set .btn-delete {
  border: 0.5px solid rgb(240, 149, 149);
  color: rgb(163, 45, 45);
}

th:last-child,
td:last-child {
  width: 140px;
  text-align: right;
}

.table-footer {
  border: var(--border-thin);
  border-radius: 0 0 8px 8px;
  border-top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  background: var(--color-bg);
}

.table-footer p {
  font-size: 12px;
  color: var(--color-text);
}

.table-footer .button-set {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.table-footer .button-set button {
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  outline: none;
  border: var(--border-thin);
  padding: 4px 16px;
  border-radius: var(--radious);
  font-size: 14px;
  cursor: pointer;
}
.table-footer .button-set button:hover {
  background: var(--color-text);
  color: var(--color-bg);
  transition: all 0.2s;
}

.table-footer .button-set button:active {
  outline: none;
}
</style>
