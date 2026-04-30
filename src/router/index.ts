import { createRouter, createWebHistory } from "vue-router";
import Employees from "../views/EmployeesView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      //redirect: "/employees",
    },
    {
      path: "/employees",
      name: "employees",
      component: Employees,
    },
  ],
});

export default router;
