<template>
  <div class="actions-wrapper">
    <a-flex justify="space-between">
      <a-input-search
        enter-button
        style="width: 350px"
        placeholder="Search client's name..."
        @search="searchClient"
      />

      <a-button type="primary" @click="openAddClientFormModal = true">
        <PlusOutlined />

        <span>Add New Client</span>
      </a-button>
    </a-flex>
  </div>

  <a-table :columns="columns" :data-source="clients" :loading="tableLoading">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <span> {{ record.firstName }} {{ record.lastName }} </span>
      </template>

      <template v-else-if="column.key === 'programs'">
        <span>
          <a-tag v-for="program in record.programs" :key="program">
            {{ program.label }}
          </a-tag>
        </span>
      </template>

      <template v-else-if="column.key === 'action'">
        <div>
          <a-tooltip placement="top" title="View client">
            <a-button shape="circle" type="text" size="large">
              <EyeOutlined />
            </a-button>
          </a-tooltip>

          <a-divider type="vertical" />

          <a-tooltip placement="top" title="Add program">
            <a-button shape="circle" type="text" size="large">
              <PlusCircleOutlined />
            </a-button>
          </a-tooltip>
        </div>
      </template>
    </template>
  </a-table>

  <add-client-form
    :open="openAddClientFormModal"
    :loading="addClientFormLoading"
    @ok="saveNewClient"
    @cancel="closeAddClientFormModal"
  ></add-client-form>
</template>

<script setup lang="ts">
import {
  EyeOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import AddClientForm from "@/components/AddClientForm.vue";
import { onMounted, ref } from "vue";
import { useClientStore } from "@/stores/client";
import { storeToRefs } from "pinia";

const openAddClientFormModal = ref<boolean>(false);
const addClientFormLoading = ref<boolean>(false);
const tableLoading = ref<boolean>(false);
const clientStore = useClientStore();
const { clients } = storeToRefs(clientStore);
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Programs",
    key: "programs",
    dataIndex: "programs",
  },
  {
    title: "Action",
    key: "action",
  },
];

/**
 * Load clients from the database
 */
onMounted(async () => {
  if (clients.value.length === 0) {
    tableLoading.value = true;

    await clientStore.getClients();

    tableLoading.value = false;
  }
});

/**
 * Searches for a client with the provided name
 * @param name client's name
 */
function searchClient(name: string) {
  console.log("client name:", name);
}

/**
 * Saves the newly registered client in the database
 * @param data client's information
 */
async function saveNewClient(data: any) {
  addClientFormLoading.value = true;

  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    gender: data.gender,
    age: Number(data.age),
    programIds: Object.values(data.programs),
  };

  await clientStore.addClient(payload);

  addClientFormLoading.value = false;
  openAddClientFormModal.value = false;
}

/**
 * Closes the form modal
 */
function closeAddClientFormModal() {
  openAddClientFormModal.value = false;
}
</script>

<style scoped>
.actions-wrapper {
  margin-bottom: 20px;
}
</style>
