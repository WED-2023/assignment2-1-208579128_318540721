<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Login</b-button
      >
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  name: "Login",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    checkCredentials(username, password) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.username === username);
      return user && user.password === password;
    },
    clearSearchResults() {
      sessionStorage.removeItem('lastSearch');
      this.$root.$emit('clearSearch');
    },
    async Login() {
      try {
        if (!this.checkCredentials(this.form.username, this.form.password)) {
          throw new Error('Invalid username or password');
        }

        this.$root.store.login(this.form.username);
        this.clearSearchResults(); // Clear search results on login
        this.$router.push("/");
      } catch (err) {
        this.form.submitError = err.message || 'Login failed';
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        return;
      }
      this.Login();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
