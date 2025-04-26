import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const accessToken = ref<string>();
  const profile = ref(null);

  return { accessToken, profile };
});
