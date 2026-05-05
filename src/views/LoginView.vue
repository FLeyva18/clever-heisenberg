<script lang="ts" setup>
import DarkMode from "../components/ui/DarkMode.vue";
</script>

<template>
  <div class="login-component">
    <div class="darkmode">
      <DarkMode />
    </div>
    <div class="login-container">
      <div class="login-message">
        <h1>Bienvenido</h1>
        <p>Inicia Sesión</p>
        <span class="material-icons">person</span>
      </div>
      <div class="login-form">
        <form action="_">
          <div class="input-box">
            <input type="text" name="username" placeholder="Usuario" />
            <span class="material-icons">person</span>
          </div>
          <div class="input-box">
            <input type="password" name="password" placeholder="Contraseña" />
            <span class="material-icons">person</span>
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-component {
  background: var(color-bg);
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.darkmode {
  display: block;
  position: absolute;
  right: 8px;
  top: 8px;
}

.login-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.login-message span {
  font-size: 64px;
  border: var(--border-st);
  border-radius: 999999px;
  padding: 4px;
  background: var(--color-text);
  color: var(--color-surface);
}

.login-container {
  border: var(--border-st);
  background: var(--color-surface);
  height: 80%;
  box-shadow: var(--shadow-strong);
  max-width: 400px;
  padding: 16px;
  display: grid;
  grid-template-rows: 0.5fr 1fr;
}

.login-form {
  width: 100%;
  height: 100%;
}

.login-form form {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.input-box {
  display: grid;
  grid-template-columns: 1fr 32px;
  width: 100%;
  padding: 0 16px;
}

.input-box input[type="text"],
input[type="password"] {
  font-size: 20px;
  padding: 4px;
  border: none;
  border-bottom: var(--border-thin);
  background: none;
  color: var(--color-text);
}

.input-box input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
  font-size: 18px;
  transition: font-size 0.4s;
}

.input-box span {
  border-bottom: var(--border-thin);
  text-align: left;
  color: #757575;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

@media (min-width: 768px) {
}
@media (min-width: 1024px) {
}
</style>
