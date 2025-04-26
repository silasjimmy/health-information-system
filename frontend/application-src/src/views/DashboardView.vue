<template>
  <a-layout-sider :style="siderStyles">
    <div class="logo-wrapper">
      <img src="../assets/logo.png" alt="app logo" />
    </div>

    <a-menu v-model:selectedKeys="selectedKeys">
      <a-menu-item-group>
        <template #title>
          <span>Home</span>
        </template>

        <a-menu-item key="clients" @click="navigateTo('clients')">
          <usergroup-add-outlined />

          <span>Clients</span>
        </a-menu-item>

        <a-menu-item key="programs" @click="navigateTo('programs')">
          <book-outlined />

          <span>Programs</span>
        </a-menu-item>
      </a-menu-item-group>

      <a-divider></a-divider>

      <a-menu-item-group>
        <template #title>
          <span>Account</span>
        </template>

        <a-menu-item key="profile" @click="navigateTo('profile')">
          <user-outlined />

          <span>Profile</span>
        </a-menu-item>
      </a-menu-item-group>

      <div class="action-wrapper">
        <a-button block>
          <logout-outlined />
          <span>Logout</span>
        </a-button>
      </div>
    </a-menu>
  </a-layout-sider>

  <a-layout :style="layoutStyles">
    <a-layout-header :style="headerStyles">
      <a-typography-title :level="2">{{
        $route.meta.pageTitle
      }}</a-typography-title>

      <a-avatar></a-avatar>
    </a-layout-header>

    <a-layout-content :style="contentStyles">
      <RouterView />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { ref, type CSSProperties } from "vue";
import {
  UserOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
  SettingOutlined,
  BookOutlined,
} from "@ant-design/icons-vue";
import router from "@/router";

// Define a-layout override styles
const layoutStyles: CSSProperties = {
  marginLeft: "200px",
};

// Define a-layout-sider override styles
const siderStyles: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  height: "100vh",
  overflow: "auto",
  backgroundColor: "#ffffff",
  borderRight: "1px solid #eeeeee",
};

// Define a-layout-header override styles
const headerStyles: CSSProperties = {
  position: "fixed",
  zIndex: 1,
  width: "100%",
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #eeeeee",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

// Define a-layout-content override styles
const contentStyles: CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "20px",
  marginTop: "64px"
};

// Route info object
const route = useRoute();

// Track the active menu item in the sider
const selectedKeys = ref<string[]>([route.name as string]);

/**
 * Navigates the application to different views
 * @param routeName name of the route to navigate to
 */
function navigateTo(routeName: string): void {
  router.push({
    name: routeName,
  });
}
</script>

<style scoped>
.logo-wrapper {
  width: 100px;
  height: 100px;
  margin: 20px auto;
}

.logo-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.action-wrapper {
  padding: 12px 8px 30px 8px;
}
</style>
