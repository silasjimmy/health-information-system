import type { RouteLocationNormalized } from "vue-router";

export async function checkAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) {
  if (to.meta.requiresAuth) {
    // Get the user's access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        // Get user's profile from the database
        
        // If user unauthorized, redirect to login

        // else store token in store
    } else return { name: "login" };
  }
}
