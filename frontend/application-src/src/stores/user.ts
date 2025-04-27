import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const localAccessToken = localStorage.getItem("accessToken");

export const useUserStore = defineStore("user", () => {
  const accessToken = ref<string>();
  const profile = ref();

  async function getProfile() {
    const res = await axios.get(`${apiEndpoint}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${localAccessToken}`,
      },
    });

    profile.value = res.data.data;
  }

  return { accessToken, profile, getProfile };
});
