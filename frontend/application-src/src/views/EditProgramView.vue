<template>
  <h1>Edit program</h1>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const props = defineProps(["id"]);

onMounted(() => {
  console.log(props.id);
});
</script>
