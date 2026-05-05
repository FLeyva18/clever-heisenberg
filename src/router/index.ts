import { createRouter, createWebHistory } from "vue-router";
import Employees from "../views/EmployeesView.vue";
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
          path: "/dashboard",
          component: HomeView,
        },
        {
          path: "/employees",
          name: "employees",
          component: Employees,
        },
      ],
    },
  ],
});

export default router;
