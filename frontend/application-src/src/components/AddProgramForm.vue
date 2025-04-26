<template>
  <a-modal
    title="Add New Program"
    :open="open"
    :maskClosable="false"
    @cancel="resetForm"
  >
    <div class="form-wrapper">
      <a-form
        ref="newProgramForm"
        layout="vertical"
        autocomplete="off"
        :model="form"
      >
        <a-row :gutter="[20, 10]">
          <a-col :span="12">
            <a-form-item
              label="Label"
              name="label"
              :rules="[{ required: true, message: 'Label is required!' }]"
            >
              <a-input type="text" v-model:value="form.label" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="Value"
              name="value"
              :rules="[{ required: true, message: 'Value is required!' }]"
            >
              <a-input type="text" v-model:value="form.value" />
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item
              label="Description"
              name="description"
              :rules="[{ required: true, message: 'Description is required!' }]"
            >
              <a-textarea
                allow-clear
                auto-size
                v-model:value="form.description"
                placeholder="A brief description of the program..."
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <template #footer>
      <a-button key="back" @click="resetForm">Cancel</a-button>

      <a-button type="primary" :loading="loading" @click="validateForm">
        Create Program
      </a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import type { AddNewProgramForm } from "@/utils/commonUtils";
import { reactive, ref } from "vue";

// Define component props
defineProps<{
  open: boolean;
  loading: boolean;
}>();

// Define component events
const emits = defineEmits(["ok", "cancel"]);

const newProgramForm = ref();

// Form state
const form = reactive<AddNewProgramForm>({
  label: null,
  value: null,
  description: null,
});

/**
 * Validates the form before emitting the form information to the parent component
 */
function validateForm() {
  newProgramForm.value
    .validate()
    .then(() => {
      const newProgram = { ...form };

      emits("ok", newProgram);

      newProgramForm.value.resetFields();
    })
    .catch(() => {
      return;
    });
}

/**
 * Resets the form before closing the modal
 */
function resetForm() {
  newProgramForm.value.resetFields();

  emits("cancel");
}
</script>

<style scoped></style>
