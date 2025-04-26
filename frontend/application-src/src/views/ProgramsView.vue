<template>
  <div class="actions-wrapper">
    <a-flex justify="flex-end">
      <a-button type="primary" @click="openAddProgramFormModal = true">
        <PlusOutlined />

        <span>Add New Program</span>
      </a-button>
    </a-flex>
  </div>

  <a-table :columns="columns" :data-source="programs" :loading="tableLoading">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <span> {{ record.label }}</span>
      </template>

      <template v-else-if="column.key === 'clients'">
        <span>
          {{ record.clients.length }}
        </span>
      </template>

      <template v-else-if="column.key === 'action'">
        <div>
          <a-tooltip placement="top" title="Edit program details">
            <a-button shape="circle" type="text" size="large">
              <EditOutlined />
            </a-button>
          </a-tooltip>
        </div>
      </template>
    </template>
  </a-table>

  <add-program-form
    :open="openAddProgramFormModal"
    :loading="addProgramFormLoading"
    @ok="saveNewProgram"
    @cancel="closeAddProgramFormModal"
  ></add-program-form>
</template>

<script setup lang="ts">
import {
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import AddProgramForm from "@/components/AddProgramForm.vue";
import { useProgramStore } from "@/stores/program";
import { storeToRefs } from "pinia";

const openAddProgramFormModal = ref<boolean>(false);
const addProgramFormLoading = ref<boolean>(false);
const tableLoading = ref(false);
const programStore = useProgramStore();
const { programs } = storeToRefs(programStore);
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Clients",
    key: "clients",
    dataIndex: "clients",
  },
  {
    title: "Action",
    key: "action",
  },
];

onMounted(async () => {
  if (programs.value.length === 0) {
    tableLoading.value = true;

    await programStore.getPrograms();

    tableLoading.value = false;
  }
});

/**
 * Saves the newly registered client in the database
 * @param data program's information
 */
async function saveNewProgram(data: any) {
  addProgramFormLoading.value = true

  await programStore.addProgram(data)

  addProgramFormLoading.value = false
  openAddProgramFormModal.value = false;
}

/**
 * Closes the form modal
 */
function closeAddProgramFormModal() {
  openAddProgramFormModal.value = false;
}
</script>

<style scoped>
.actions-wrapper {
  margin-bottom: 20px;
}
</style>
