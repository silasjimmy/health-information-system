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
        ref="createAccountForm"
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
          :loading="createAccountBtnLoading"
          @click="signUp"
        >
          Create Account
        </a-button>
      </div>

      <div class="action-wrapper">
        <a-typography-text
          >Already have an account?
          <router-link to="/login">Login</router-link>
        </a-typography-text>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import type { CreateAccountForm } from "@/utils/commonUtils";
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import { message } from 'ant-design-vue'
import axios from "axios";
import { useUserStore } from "@/stores/user";
import router from "@/router";

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const form = reactive<CreateAccountForm>({
  email: null,
  password: null,
});

const createAccountForm = ref();
const createAccountBtnLoading = ref(false);
const userStore = useUserStore()

/**
 * Authenticates and authorizes the user
 */
function signUp() {
  createAccountForm.value
    .validate()
    .then(() => {
      createAccountBtnLoading.value = true;

      // Make API call to sign in user
      axios
        .post(`${apiEndpoint}/auth/sign-up`, {
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
          
          message.error("Incorrect email or password!")
        })
        .finally(() => (createAccountBtnLoading.value = false));
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
