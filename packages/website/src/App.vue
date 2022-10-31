<script setup lang="ts">
import draw from "@drawing/painter";
import "@drawing/painter/dist/style.css";
import { ref, onMounted } from "vue";

const container = ref();
onMounted(() => {
  draw(container.value);
});
</script>

<template>
  <div ref="container" class="w-100% h-100% bg-light-50"></div>
</template>
