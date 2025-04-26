import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const accessToken = localStorage.getItem("accessToken");

export const useClientStore = defineStore("client", () => {
  const clients = ref([]);
  // const doubleCount = computed(() => count.value * 2)

  async function getClients() {
    const res = await axios.get(`${apiEndpoint}/clients/all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    clients.value = res.data.data;
  }

  async function addClient(data: any) {
    const res = await axios.post(`${apiEndpoint}/clients/client`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    await getClients();
  }

  return { clients, getClients, addClient };
});
