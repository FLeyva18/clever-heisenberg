<script setup lang="ts">

</script>

<template>
    <div class="general-home-view">
        <div class="summary-container">
            <h3>Bienvenido</h3>
            <p>Resumen general del sistema</p>
            <div class="summary-items">
                <div class="item">1</div>
                <div class="item">2</div>
                <div class="item">3</div>
                <div class="item">4</div>
            </div>
        </div>
        <div class="fast-access-container">
            <p>Acceso rapido al sistema</p>
            <div class="fa-container">
                <div class="fa-item">1</div>
                <div class="fa-item">2</div>
                <div class="fa-item">3</div>
                <div class="fa-item">4</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.general-home-view {
    display: flex;
    flex-direction: column;
    gap: var(--md-space);
}
.summary-container{
    display: grid;
    grid-template-rows: repeat(2, auto) 1fr;
    gap: 2px;
}

.summary-container p {
    margin-left: 4px;
}

.summary-items {
    display: flex;
    flex-direction: row;
    gap: 8px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
    max-width: 100%;
    overflow-x: auto;
}

.item{
    min-width: calc(25% - 8px);
    height: 80px;
    background-color: var(--color-surface);
    border: var(--border-thin);
    border-radius: var(--radious);
}
.fast-access-container {
    display: grid;
    grid-column: auto 1fr;
    gap: 16px;
}

.fast-access-container p {
    margin-left: 4px;
}


</style>