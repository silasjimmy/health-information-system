import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { ActionResponse } from "@/utils/typeUtils";
import { addProgramURI, getProgramsURI } from "@/utils/variableUtils";
import { useUserStore } from "./user";

export const useProgramStore = defineStore("program", () => {
  // Stores the list of all programs.
  const programs = ref<any>([]);

  // Import the user store to access the accessToken property
  const userStore = useUserStore()

  /**
   * Retrieves the list of all programs from the database.
   * @returns {ActionResponse} response object containing the operation's results.
   */
  async function getPrograms(): Promise<ActionResponse> {
    try {
      const res = await axios.get(getProgramsURI, {
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });

      programs.value = res.data.data;
      
      return {
        success: true,
        message: "Programs retrieved successfully",
        code: res.data.code,
        data: null,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message,
        code: error.response?.data?.code,
        data: null,
      }
    }
  }

  async function addProgram(data: any): Promise<ActionResponse> {
    try {
      const res = await axios.post(addProgramURI, data, {
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
      },
    });

      // Refresh the list of programs
      await getPrograms();
      
      return {
        success: true,
        message: "Program added successfully",
        code: res.data.code,
        data: null,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message,
        code: error.response?.data?.code,
        data: null,
      }
    }
  }

  function getProgram(id: number) {
    return programs.value.find((program: any) => program.id === id);
  }


  return { programs, getPrograms, addProgram, getProgram };
});
