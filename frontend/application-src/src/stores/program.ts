import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useProgramStore = defineStore("program", () => {
  const programs = ref([
    {
      id: 1,
      label: "Malaria",
      value: "malaria",
    },
    {
      id: 2,
      label: "TB",
      value: "tb",
    },
    {
      id: 3,
      label: "HIV",
      value: "hiv",
    },
  ]);

  return { programs };
});
