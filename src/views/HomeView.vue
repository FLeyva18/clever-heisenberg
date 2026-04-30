<script setup lang="ts">

</script>

<template>
    <div class="general-home-view">
        <div class="side-menu">
            <h3>
                Mi sistema
            </h3>
            <div class="menu-options">
                <details>
                    <a to="">asdas</a>
                </details>
            </div>
        </div>
        <div class="home-content">
        </div>
    </div>
</template>

<style scoped>
.general-home-view{
    display: grid;
    grid-template-columns: 200px 1fr;
    height: 100dvh;
    width: 100dvw;
}

.side-menu {
    background: var(--color-surface);
    border: solid 0.5px var(--color-border);
}

.side-menu .menu-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: baseline;
}

.home-content {
}
</style>