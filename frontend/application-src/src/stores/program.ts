import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const accessToken = localStorage.getItem("accessToken");

export const useProgramStore = defineStore("program", () => {
  const programs = ref<any>([]);

  async function getPrograms() {
    const res = await axios.get(`${apiEndpoint}/programs/all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    programs.value = res.data.data;
  }

  async function addProgram(data: any) {
    const res = await axios.post(`${apiEndpoint}/programs/program`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    await getPrograms();
  }

  return { programs, getPrograms, addProgram };
});
