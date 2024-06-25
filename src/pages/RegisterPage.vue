<template>
  <div class="container">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <!-- Username -->
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username should only contain letters
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- First Name -->
      <b-form-group
        id="input-group-firstname"
        label-cols-sm="3"
        label="First Name:"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          v-model="$v.form.firstName.$model"
          type="text"
          :state="validateState('firstName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Last Name -->
      <b-form-group
        id="input-group-lastname"
        label-cols-sm="3"
        label="Last Name:"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          v-model="$v.form.lastName.$model"
          type="text"
          :state="validateState('lastName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Country -->
      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Password -->
      <b-form-group
        id="input-group-password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.password.specialChar"
        >
          Contain at least one special character
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Confirm Password -->
      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Email -->
      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          type="email"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          Email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email.email">
          Must be a valid email
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
      >
        Register
      </b-button>
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import axios from 'axios';
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
} from "vuelidate/lib/validators";
import { mockRegister } from "../services/auth.js";
import { validationMixin } from "vuelidate";

const specialChar = (value) => /[!@#\$%\^\&*\)\(+=._-]/.test(value);

export default {
  name: "Register",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined,
      },
      countries: [{ value: null, text: "", disabled: true }],
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (value) => minLength(3)(value) && maxLength(8)(value),
        alpha,
      },
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      country: {
        required,
      },
      password: {
        required,
        length: (value) => minLength(5)(value) && maxLength(10)(value),
        specialChar,
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
      email: {
        required,
        email,
      },
    },
  },
  async mounted() {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countries = response.data.map(country => ({
        value: country.name.common,
        text: country.name.common
      }));
      this.countries.push(...countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const userDetails = {
          username: this.form.username,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          country: this.form.country,
          password: this.form.password,
          email: this.form.email,
        };

        const response = await mockRegister(userDetails);

        this.$router.push("/login");
      } catch (err) {
        this.form.submitError = err.message || 'Unknown error';
      }
    },
    onRegister() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
