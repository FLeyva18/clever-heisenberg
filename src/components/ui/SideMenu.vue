<template>
  <div class="side-menu">
    <div class="menu-header">
      <h2>Menu</h2>
      <span>Tema</span>
    </div>
    <div class="menu-options">
      <h3>General</h3>
      <ul>
        <li><router-link to="/">Home</router-link></li>
      </ul>
      <h3>Administración</h3>
      <details>
        <summary>Empleados</summary>
        <ul>
          <li><router-link to="/employees">Empleados</router-link></li>
          <li>Pagos</li>
          <li>Produccion</li>
        </ul>
      </details>
      <details>
        <summary>Productos</summary>
        <ul>
          <li>Productos</li>
          <li>Mermas</li>
          <li>Proveedores</li>
        </ul>
      </details>
      <details>
        <summary>Proveedores</summary>
        <ul>
          <li>Proveedores</li>
          <li>Compras</li>
          <li>Suministros</li>
        </ul>
      </details>
    </div>
    <div class="menu-footer">
      <span>P</span>
      <h5>Username</h5>
      <p>mail@domain.com</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
