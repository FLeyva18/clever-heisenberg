import { createRouter, createWebHistory } from "vue-router";
import EmployeesView from "../views/EmployeesView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MainLayout from "../views/MainLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/home",
      name: "home",
      component: MainLayout,
      children: [
        {
          path: "",
          component: HomeView,
        },
        {
          path: "employees",
          name: "employees",
          component: EmployeesView,
        },
      ],
    },
  ],
});

export default router;
