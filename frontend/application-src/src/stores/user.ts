import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const useUserStore = defineStore("user", () => {
  const accessToken = ref<string>();
  const profile = ref();

  async function getProfile() {
    const res = await axios.get(`${apiEndpoint}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    profile.value = res.data.data;
  }

  return { accessToken, profile, getProfile };
});
