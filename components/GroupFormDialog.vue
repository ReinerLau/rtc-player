<template>
  <Dialog v-model:visible="visible" modal :header="formTitle">
    <template #default>
      <div class="flex items-center gap-3 mb-2">
        <span>名称</span>
        <InputText v-model="data.name" class="flex-auto" autocomplete="off" />
      </div>
    </template>
    <template #footer>
      <Button severity="secondary" label="取消" @click="cancel"></Button>
      <Button label="保存" @click="save"></Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import type { Group } from "~/types";

const visible = defineModel<boolean>("visible", { required: true });
const data = defineModel<Group>("data", { required: true });

const emit = defineEmits(["save", "cancel"]);

defineProps<{
  formTitle: string;
}>();

const save = () => {
  emit("save");
};

const cancel = () => {
  emit("cancel");
};
</script>
