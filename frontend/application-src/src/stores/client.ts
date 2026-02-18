import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { ActionResponse } from "@/utils/typeUtils";
import { addClientURI, getClientByURI, getClientsURI } from "@/utils/variableUtils";
import { useUserStore } from "./user";

export const useClientStore = defineStore("client", () => {
  // Stores the list of all registered clients
  const clients = ref([]);

  // Stores the list of filtered clients based on the search criteria
  const filteredClients = ref([]);

  // Import the userStore to use the accessToken property
  const userStore = useUserStore();

  /**
   * Retrieves the list of all clients from the database.
   * @returns {ActionResponse} response object containing the operation's results.
   */
  async function getClients(): Promise<ActionResponse> {
    try {
      const res = await axios.get(getClientsURI, {
        headers: {
          Authorization: `Bearer ${userStore.accessToken}`,
        },
      });

      clients.value = res.data.data;
      filteredClients.value = res.data.data;

      return {
        success: true,
        code: res.data.code,
        message: "Clients list retrieved successfully.",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        code: error.data?.statusCode,
        message: error.data?.message,
      };
    }
  }

  /**
   * Adds a new client record to the database.
   * @param {any} data client's data to be added. 
   * @returns {ActionResponse} response object containing the operation's results.
   */
  async function addClient(data: any): Promise<ActionResponse> {
    try {
      const res = await axios.post(addClientURI, data, {
        headers: {
          Authorization: `Bearer ${userStore.accessToken}`,
        },
      });

      await getClients();

      return {
        success: true,
        code: res.data.code,
        message: "Client added successfully.",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        code: error.data?.statusCode,
        message: error.data?.message,
      };
    }
  }

  /**
   * Retrives a client's information from the database using their unique identifier.
   * @param {number} id client's unique identifier.
   * @returns {ActionResponse} response object containing the operation's results.
   */
  async function getClient(id: number): Promise<ActionResponse> {
    try {
      const res = await axios.get(`${getClientByURI}/${id}`, {
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });

    return {
      success: true,
      code: res.data.code,
      message: "Client retrieved successfully.",
      data: res.data.data,
    };
    } catch (error: any) {
      return {
        success: false,
        code: error.data?.statusCode,
        message: error.data?.message,
      };
    }
  }

  /**
   * Filters the list of clients based on the provided name.
   * If the search input is empty, it returns the full list of clients.
   * @param {string} name client's name
   */
  function searchClientsByName(name: string) {
    // Return the full list of clients if the search input is empty
    if (name === "") filteredClients.value = clients.value;
    else
      filteredClients.value = clients.value.filter(
        (client: any) =>
          client.firstName.toLowerCase().includes(name.toLowerCase()) ||
          client.lastName.toLowerCase().includes(name.toLowerCase()),
      );
  }

  return {
    clients,
    filteredClients,
    getClients,
    addClient,
    getClient,
    searchClientsByName,
  };
});
