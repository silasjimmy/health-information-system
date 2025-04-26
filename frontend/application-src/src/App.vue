<template>
  <a-layout has-sider :style="layoutStyles">
    <!-- Customize the app theme -->
    <a-config-provider
      :theme="{
        token: {
          fontFamily: 'Lexend',
        },
      }"
    >
      <RouterView />
    </a-config-provider>
  </a-layout>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";
import { RouterView } from "vue-router";

// Define a-layout override styles
const layoutStyles: CSSProperties = {
  backgroundColor: "#ffffff",
  height: "100vh",
};
</script>

<style scoped></style>
