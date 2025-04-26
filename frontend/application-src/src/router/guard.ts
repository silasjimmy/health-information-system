import type { RouteLocationNormalized } from "vue-router";
import axios from "axios";
import { useUserStore } from "@/stores/user";

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export async function checkAuth(to: RouteLocationNormalized) {
  if (to.meta.requiresAuth) {
    const userStore = useUserStore();

    if (!userStore.accessToken) {
      // Get the user's access token from local storage
      const localAccessToken = localStorage.getItem("accessToken");

      if (localAccessToken) {
        // Get user's profile from the database
        axios
          .get(`${apiEndpoint}/auth/profile`, {
            headers: {
              Authorization: `Bearer ${localAccessToken}`,
            },
          })
          .then((res) => {
            userStore.$patch({
              accessToken: localAccessToken,
              profile: res.data.data,
            });
          })
          .catch(() => {
            return { name: "login" };
          });
      } else return { name: "login" };
    }
  }
}
