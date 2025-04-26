import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";
import CreateAccountView from "@/views/CreateAccountView.vue";
import { checkAuth } from "./guard";

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
            requiresAuth: true,
          },
        },
        {
          path: "/programs",
          name: "programs",
          component: () => import("../views/ProgramsView.vue"),
          meta: {
            pageTitle: "Programs",
            requiresAuth: true,
          },
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("../views/ProfileView.vue"),
          meta: {
            pageTitle: "Profile",
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/create-account",
      name: "create-account",
      component: CreateAccountView,
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach(checkAuth);

export default router;
