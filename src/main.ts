import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import "./assets/global.css";
import "./assets/styles.css";
import "@fontsource/roboto/400.css";
import "material-icons";

const app = createApp(App);
app.use(router);
app.mount("#app");
