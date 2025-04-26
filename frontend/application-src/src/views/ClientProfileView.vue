<template>
  <a-space v-if="profile" direction="vertical" size="large">
    <a-avatar
      src="https://ionicframework.com/docs/img/demos/avatar.svg"
      :size="80"
    >
    </a-avatar>

    <a-space align="center">
      <a-typography-title :level="5">Full name: </a-typography-title>
      <a-typography-text
        >{{ profile.firstName }} {{ profile.lastName }}</a-typography-text
      >
    </a-space>

    <a-space align="center">
      <a-typography-title :level="5">Email address: </a-typography-title>
      <a-typography-text>{{ profile.email }}</a-typography-text>
    </a-space>

    <a-space align="center">
      <a-typography-title :level="5">Age: </a-typography-title>
      <a-typography-text>{{ profile.age }} years</a-typography-text>
    </a-space>

    <a-space align="center">
      <a-typography-title :level="5">Programs: </a-typography-title>
      <a-typography-text>{{ programsDisplay }}</a-typography-text>
    </a-space>
  </a-space>
</template>

<script setup lang="ts">
import { useClientStore } from "@/stores/client";
import { computed, onMounted, ref } from "vue";

const props = defineProps(["id"]);
const clientStore = useClientStore();
const profile = ref();

onMounted(async () => {
  profile.value = await clientStore.getClient(props.id);
});

const programsDisplay = computed(() => {
  if (profile.value.programs.length === 0) return "No programs enrolled";
  else {
    const programs: any[] = [];

    Array.from(profile.value.programs).forEach((program: any) =>
      programs.push(program.label)
    );

    return programs.join(", ");
  }
});
</script>

<style scoped></style>
