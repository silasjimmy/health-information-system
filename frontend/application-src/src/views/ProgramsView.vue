<template>
  <div class="actions-wrapper">
    <a-flex justify="flex-end">
      <a-button type="primary">
        <PlusOutlined />

        <span>Add New Program</span>
      </a-button>
    </a-flex>
  </div>

  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <span> {{ record.label }}</span>
      </template>

      <template v-else-if="column.key === 'clients'">
        <span>
          {{ record.clients }}
        </span>
      </template>

      <template v-else-if="column.key === 'action'">
        <div>
          <a-tooltip placement="top" title="Edit program details">
            <a-button shape="circle" type="text" size="large">
              <EditOutlined />
            </a-button>
          </a-tooltip>

          <a-divider type="vertical" />

          <a-tooltip placement="top" title="Delete program">
            <a-button shape="circle" type="text" size="large">
              <DeleteOutlined />
            </a-button>
          </a-tooltip>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";

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

const data = [
  {
    id: 1,
    label: "Malaria",
    value: "malaria",
    clients: 13,
  },
  {
    id: 2,
    label: "TB",
    value: "tb",
    clients: 2,
  },
  {
    id: 3,
    label: "HIV",
    value: "hiv",
    clients: 29,
  },
];
</script>

<style scoped>
.actions-wrapper {
  margin-bottom: 20px;
}
</style>
