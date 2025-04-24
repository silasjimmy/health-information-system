<template>
  <div class="actions-wrapper">
    <a-flex justify="space-between">
      <a-input-search
      enter-button
        style="width: 350px"
        placeholder="Search client's name..."
        @search="searchClient"
      />

      <a-button type="primary">
        <PlusOutlined />

        <span>Add New Client</span>
      </a-button>
    </a-flex>
  </div>

  <a-table :columns="columns" :data-source="data">
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

          <a-tooltip placement="top" title="Edit client details">
            <a-button shape="circle" type="text" size="large">
              <EditOutlined />
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
</template>

<script setup lang="ts">
import {
  EyeOutlined,
  PlusCircleOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";

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

const data = [
  {
    id: 1,
    firstName: "John",
    lastName: "Brown",
    programs: [
      {
        id: 1,
        label: "Malaria",
        value: "malaria",
      },
      {
        id: 2,
        label: "TB",
        value: "tb",
      },
    ],
  },
  {
    id: 2,
    firstName: "Jim",
    lastName: "Green",
    programs: [
      {
        id: 1,
        label: "Malaria",
        value: "malaria",
      },
    ],
  },
  {
    id: 3,
    firstName: "Joe",
    lastName: "Black",
    programs: [
      {
        id: 3,
        label: "HIV",
        value: "hiv",
      },
    ],
  },
];

function searchClient(name: string) {
  console.log("client name:", name);
}
</script>

<style scoped>
.actions-wrapper {
    margin-bottom: 20px;
}
</style>
