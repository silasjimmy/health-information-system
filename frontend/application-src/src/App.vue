<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <!-- Customize the app theme -->
  <a-config-provider
    :theme="{
      token: {},
    }"
  >
    <RouterView />
  </a-config-provider>
</template>

<style scoped></style>
