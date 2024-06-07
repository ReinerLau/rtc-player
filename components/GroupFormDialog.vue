<template>
  <Dialog v-model:visible="visible" modal header="分组"> </Dialog>
</template>

<script setup lang="ts">
const visible = defineModel<boolean>("visible", { required: true });
</script>
