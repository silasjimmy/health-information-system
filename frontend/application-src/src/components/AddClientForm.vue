<template>
  <a-modal
    title="Add New Client"
    :open="open"
    :maskClosable="false"
    @cancel="resetForm"
  >
    <div class="form-wrapper">
      <a-form
        ref="newClientForm"
        layout="vertical"
        autocomplete="off"
        :model="form"
      >
        <a-row :gutter="[20, 10]">
          <a-col :span="12">
            <a-form-item
              label="First Name"
              name="firstName"
              :rules="[{ required: true, message: 'First name is required!' }]"
            >
              <a-input type="text" v-model:value="form.firstName" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="Last Name"
              name="lastName"
              :rules="[{ required: true, message: 'Last name is required!' }]"
            >
              <a-input type="text" v-model:value="form.lastName" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="Email Address"
              name="email"
              :rules="[
                { required: true, message: 'Email address is required!' },
              ]"
            >
              <a-input type="email" v-model:value="form.email" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="Age"
              name="age"
              :rules="[{ required: true, message: 'Age is required!' }]"
            >
              <a-input type="number" v-model:value="form.age" />
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item
              label="Gender"
              name="gender"
              :rules="[{ required: true, message: 'Gender is required!' }]"
            >
              <a-radio-group v-model:value="form.gender">
                <a-radio value="male">Male</a-radio>

                <a-radio value="female">Female</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item label="Programs" name="programs">
              <a-checkbox-group v-model:value="form.programs">
                <a-checkbox v-for="program in programs" :value="program.id">
                  {{ program.label }}
                </a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <template #footer>
      <a-button key="back" @click="resetForm">Cancel</a-button>

      <a-button type="primary" :loading="loading" @click="validateForm">
        Register Client
      </a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { useProgramStore } from "@/stores/program";
import type { AddNewClientForm } from "@/utils/commonUtils";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";

// Define component props
defineProps<{
  open: boolean;
  loading: boolean;
}>();

// Define component events
const emits = defineEmits(["ok", "cancel"]);

// Form state
const form = reactive<AddNewClientForm>({
  firstName: null,
  lastName: null,
  email: null,
  age: null,
  gender: null,
  programs: [],
});

const newClientForm = ref();

const programStore = useProgramStore();
const { programs } = storeToRefs(programStore);

onMounted(async () => {
  if (programs.value.length === 0) await programStore.getPrograms();
});

/**
 * Validates the form before emitting the form information to the parent component
 */
function validateForm() {
  newClientForm.value
    .validate()
    .then(() => {
      const newClient = { ...form };

      emits("ok", newClient);

      newClientForm.value.resetFields();
    })
    .catch(() => {
      return;
    });
}

/**
 * Resets the form before closing the modal
 */
function resetForm() {
  newClientForm.value.resetFields();

  emits("cancel");
}
</script>

<style scoped></style>
