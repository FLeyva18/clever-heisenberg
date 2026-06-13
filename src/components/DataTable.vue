<script setup lang="ts">
interface Header {
  key: string;
  label: string;
  sortable: boolean;
}

interface Props {
  headers: Header[];
  items: Record<string, any>[];
  sortKey?: string;
  sortOrder?: "asc" | "desc";
}

defineProps<Props>();

const emits = defineEmits<{
  (e: "edit", item: any): void;
  (e: "delete", id: number): void;
  (e: "sort", key: string): void;
}>();
</script>

<template>
  <div class="table-component">
    <div class="table-body">
      <table>
        <thead>
          <tr>
            <th
              v-for="c in headers"
              :key="c.key"
              @click="c.sortable ? emits('sort', c.key) : null"
              :class="{ 'is-sortable': c.sortable }"
            >
              {{ c.label }}
              <span v-if="sortKey === c.key" class="sort-icon">
                {{ sortOrder === "asc" ? "↑" : "↓" }}
              </span>
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td v-for="header in headers" :key="header.key">
              <slot :name="header.key" :item="item">
                {{ item[header.key] }}
              </slot>
            </td>
            <td class="action-buton-set">
              <button class="btn-edit" @click="emits('edit', item)">
                Editar
              </button>
              <button class="btn-delete" @click="emits('delete', item.id)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
th.is-sortable {
  cursor: pointer;
  user-select: none;
}
th.is-sortable:hover {
  background: var(--color-surface);
  transition: background 0.2s;
}
.sort-icon {
  margin-left: 4px;
  font-size: 12px;
}

.table-body {
  border: var(--border-thin);
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
  border: var(--border-thin);
  color: var(--color-text);
}

.action-buton-set .btn-delete {
  border: 1px solid rgba(255, 50, 50, 0.557);
  color: rgb(233, 42, 42);
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
