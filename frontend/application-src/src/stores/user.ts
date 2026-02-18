import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { userProfileURI } from "@/utils/variableUtils";
import type { ActionResponse } from "@/utils/typeUtils";

export const useUserStore = defineStore("user", () => {
  // Stores the JWT access token for authenticated requests
  const accessToken = ref<string>();

  // Stores the current user's profile information
  const profile = ref();

  /**
   * Retrieves the current user's profile from the database.
   * @returns {ActionResponse} response object containing the operation's results.
   */
  async function getProfile(): Promise<ActionResponse> {
    try {
      const res = await axios.get(userProfileURI, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });

      profile.value = res.data.data;

      return {
        success: true,
        code: res.data.code,
        message: "User profile retrieved successfully.",
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

  return { accessToken, profile, getProfile };
});
