<script setup lang="ts">
import { ref } from "vue";
import MenuOptions from "../../types/MenuOptions";

const miMenu = ref<MenuOptions[]>([
  {
    name: "Administrar",
    icon: "settings",
    subMenu: [
      { option: "Empleados", route: "home/employees" },
      { option: "Productos", route: "productos" },
      { option: "Inventario", route: "inventario" },
    ],
  },
  {
    name: "Reportes",
    icon: "analytics",
    subMenu: [
      { option: "Ventas", route: "ventas" },
      { option: "Merma", route: "merma" },
    ],
  },
]);

const menuAbierto = ref<string | null>(null);

const alternarMenu = (nombreDelMenu: string) => {
  if (menuAbierto.value === nombreDelMenu) {
    menuAbierto.value = null;
  } else {
    menuAbierto.value = nombreDelMenu;
  }
};

const emit = defineEmits<{'option-selected': [option: string]}>();
const handleSelected = (option: string) => {
  emit("option-selected", option);
}
</script>

<template>
  <nav class="menu-main-container">
    <div v-for="item in miMenu" :key="item.name" class="menu-bloque">
      <div class="menu-cabecera" @click="alternarMenu(item.name)">
        <div class="titulo-con-icono">
          <span class="material-icons">{{ item.icon }}</span>
          <span>{{ item.name }}</span>
        </div>
        <span
          class="material-icons icono-flecha"
          :class="{ rotado: menuAbierto === item.name }"
        >
          expand_more
        </span>
      </div>

      <Transition name="desplegar">
        <div v-show="menuAbierto === item.name" class="menu-opciones">
          <ul v-if="item.subMenu">
            <li v-for="sub in item.subMenu" :key="sub.option">
              <RouterLink :to="sub.route" @click="handleSelected(sub.option)">
                {{ sub.option }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<style scoped>
.menu-main-container {
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-cabecera {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.titulo-con-icono {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icono-flecha {
  transition: transform 0.3s ease;
}
.icono-flecha.rotado {
  transform: rotate(180deg);
}

.desplegar-enter-active,
.desplegar-leave-active {
  transition:
    max-height 0.4s ease-in-out,
    opacity 0.4s ease;
  overflow: hidden;
}
.desplegar-enter-from,
.desplegar-leave-to {
  max-height: 0;
  opacity: 0;
}
.desplegar-enter-to,
.desplegar-leave-from {
  max-height: 300px;
  opacity: 1;
}

.menu-opciones ul {
  list-style: none;
  padding: 4px 0 10px 40px; /* Más padding para que se vea alineado */
  margin: 0;
}
.menu-opciones li {
  padding: 8px 0;
  cursor: pointer;
}
.menu-opciones li:hover {
  color: #3b82f6;
}
</style>
