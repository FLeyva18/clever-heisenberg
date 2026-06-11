<script setup lang="ts">
const emits = defineEmits<{
  (e: "pdf"): void;
  (e: "excel"): void;
  (e: "csv"): void;
  (e: "close"): void;
}>();
</script>

<template>
  <div class="modal-backdrop" @click.self="emits('close')">
    <div class="form-card">
      <div class="form-group">
        <button type="button" class="button-download" @click="emits('pdf')">
          <p>Exportar .pdf</p>
          <img src="../assets/icons/pdf.png" alt="pdf" width="32" height="32" />
        </button>
        <button type="button" class="button-download" @click="emits('excel')">
          <p>Exportar .xls</p>
          <img src="../assets/icons/xls.png" alt="xls" width="32" height="32" />
        </button>
        <button type="button" class="button-download" @click="emits('csv')">
          <p>Exportar .csv</p>
          <img src="../assets/icons/csv.png" alt="csv" width="32" height="32" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-download {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
  margin: 8px 0;
  border: var(--border-st);
  box-shadow: var(--shadow-strong);
  padding: 8px 0;
}

.button-download p {
  color: var(--color-text);
  font-weight: 600;
  letter-spacing: 1px;
}
</style>
