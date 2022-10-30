<script setup lang="ts">
import draw from "@drawing/painter";
import "@drawing/painter/lib/style.css";

const container = ref();
onMounted(() => {
  console.log("[debug]123:", 123)
  console.log("[debug]container.value:", container.value)
  // createDraw(container.value)
  console.log("[debug]draw:", draw)
  // console.log("[debug]createDraw:", createDraw)
})
</script>

<template>
  <div ref="container" class="w-100% h-100% bg-light-50">
    asdf
  </div>
</template>
