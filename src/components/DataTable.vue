<script setup lang="ts">

const fmt = (n: number) => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

interface Data {
    id: number,
    nombre: string,
    puesto: string,
    departamento: string,
    sueldo: number,
    turno: string,
    activo: boolean,
    fechaIngreso: string,
  }

interface Header {
    key: string,
    label: string,
    sortable: boolean,
}

interface Props {
  headers: Header[],
  items: Data[],
}


const props = defineProps<Props>();
  const emits = defineEmits<{
    (e: 'modify', item: Data): void
    (e: 'delete', id:number): void
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
            <th>
              Acciones
            </th>
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
  border: var(--set-border-thin);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  overflow: hidden;
}

.table-body table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.table-body table thead{
  background: #f9fafb;
  font-size: var(--text-base);
  border-bottom: 2px solid #e5e7eb;
}

.table-body table thead th, td {
  cursor:default ;
  padding: var(--space-2);
}

.table-body table tbody td {
  padding: var(--space-1);
  font-size: var(--text-sm);
}

.table-body table tbody tr:nth-child(even) {
  background: var(--color-emphasis);
}

.table-body table tbody tr:hover {
  background: var(--color-hover-element);
  transition: background 0.2s;
}

.action-buton-set {
  display: flex;
  gap: var(--space-2);
}

.action-buton-set button{
  background: none;
  border: solid 0.5px var(--color-border-thin);
  padding: 4px 10px;
  border-radius: var(--radius-md);
  cursor: pointer;
}

.action-buton-set .btn-delete{
  border: 0.5px solid rgb(240, 149, 149);
  color: rgb(163, 45, 45);
}

th:last-child, td:last-child {
  width: 140px;
  text-align: right;
}

.table-footer {
  border: var(--set-border-thin);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  border-top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2);
  background: var(--color-emphasis);
}

.table-footer p {
  font-size: var(--text-sm);
  color: #2a2a2a;
}

.table-footer .button-set {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.table-footer .button-set button{
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  outline: none;
  border: solid 0.5px var(--color-border-default);
  height: var(--height-xs);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  cursor: pointer;
}
.table-footer .button-set button:hover {
  background: var(--button-color-emphasis);
  color: var(--buttontxt-color-emphasis);
  transition: all 0.2s;
}

.table-footer .button-set button:active {
  transform: scale(0.94);
  outline: none;
}
</style>