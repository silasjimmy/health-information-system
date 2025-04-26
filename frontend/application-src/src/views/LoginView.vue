<template>
  <div class="view-wrapper">
    <a-card style="min-width: 400px">
      <div class="logo-wrapper">
        <img src="../assets/logo.png" alt="app logo" />
      </div>

      <div class="title-wrapper">
        <a-typography-title :level="2">CEMA HMS</a-typography-title>
      </div>

      <a-form
        :model="form"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        ref="loginForm"
        autocomplete="off"
      >
        <a-form-item
          label="Email Address"
          name="email"
          :rules="[{ required: true, message: 'Please enter your email!' }]"
        >
          <a-input type="email" v-model:value="form.email" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please enter your password!' }]"
        >
          <a-input-password v-model:value="form.password" />
        </a-form-item>
      </a-form>

      <div class="action-wrapper">
        <a-button
          block
          type="primary"
          :loading="loginBtnLoading"
          @click="signIn"
          >Login</a-button
        >
      </div>

      <div class="action-wrapper">
        <a-typography-text
          >Don't have an account?
          <router-link to="/create-account">Create one</router-link>
        </a-typography-text>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import type { LoginForm } from "@/utils/commonUtils";
import axios from "axios";
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const form = reactive<LoginForm>({
  email: null,
  password: null,
});

const loginForm = ref();
const loginBtnLoading = ref(false);

const userStore = useUserStore();

/**
 * Authenticates and authorizes the user
 */
function signIn() {
  loginForm.value
    .validate()
    .then(() => {
      loginBtnLoading.value = true;

      // Make API call to sign in user
      axios
        .post(`${apiEndpoint}/auth/sign-in`, {
          email: form.email,
          password: form.password,
        })
        .then((res) => {
          // Retrieve the user JWT from the response
          const accessToken = res.data.data;

          // Store JWT in the user store
          userStore.$patch({
            accessToken: accessToken,
          });

          // Store JWT in local storage
          localStorage.setItem("accessToken", accessToken);

          // Redirect the user to the dashboard
          router.replace({ name: "clients" });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (loginBtnLoading.value = false));
    })
    .catch(() => {
      return;
    });
}
</script>

<style scoped>
.view-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-wrapper {
  height: 100px;
}

.logo-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.title-wrapper {
  text-align: center;
  margin: 20px 0;
}

.action-wrapper {
  padding-top: 10px;
  text-align: center;
}
</style>
