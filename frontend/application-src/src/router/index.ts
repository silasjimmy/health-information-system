import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";
import CreateAccountView from "@/views/CreateAccountView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/clients",
    },
    {
      path: "/",
      name: "home",
      component: DashboardView,
      children: [
        {
          path: "/clients",
          name: "clients",
          component: () => import("../views/ClientsView.vue"),
          meta: {
            pageTitle: "Clients",
          },
        },
        {
          path: "/programs",
          name: "programs",
          component: () => import("../views/ProgramsView.vue"),
          meta: {
            pageTitle: "Programs",
          },
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("../views/ProfileView.vue"),
          meta: {
            pageTitle: "Profile",
          },
        },
        {
          path: "/settings",
          name: "settings",
          component: () => import("../views/SettingsView.vue"),
          meta: {
            pageTitle: "Settings",
          },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/create-account",
      name: "create-account",
      component: CreateAccountView,
    },
  ],
});

export default router;
