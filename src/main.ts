import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import "./assets/global.css";
import "./assets/styles.css";
import "@fontsource/roboto/400.css";
import "material-icons";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);

app.use(Vue3Toastify, {
  autoClose: 1000,
  position: "bottom-center",
  theme: "dark",
  clearOnUrlChange: false,
  hideProgressBar: true,
  pauseOnFocusLoss: false,
} as ToastContainerOptions);

app.use(router);
app.mount("#app");
