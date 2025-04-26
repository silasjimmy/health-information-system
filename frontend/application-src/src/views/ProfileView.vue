<template>
  <a-space v-if="profile" direction="vertical" size="large">
    <a-avatar
      src="https://ionicframework.com/docs/img/demos/avatar.svg"
      :size="80"
    >
    </a-avatar>

    <a-space align="center">
      <a-typography-title :level="5">Full name: </a-typography-title>
      <a-typography-text>{{ profile.fullName }}</a-typography-text>
    </a-space>

    <a-space align="center">
      <a-typography-title :level="5">Email address: </a-typography-title>
      <a-typography-text>{{ profile.email }}</a-typography-text>
    </a-space>

    <a-space align="center">
      <a-typography-title :level="5">Role: </a-typography-title>
      <a-typography-text>{{ profile.role }}</a-typography-text>
    </a-space>
  </a-space>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const userStore = useUserStore();
const { profile } = storeToRefs(userStore);

onMounted(async () => {
  if (!profile) await userStore.getProfile();
});
</script>

<style scoped></style>
