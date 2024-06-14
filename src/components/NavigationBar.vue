<template>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="#">RecipeApp</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Main Page</b-nav-item>
          <b-nav-item to="/search">Search</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <template v-if="!$root.store.username">
            <b-navbar-text>Hello Guest</b-navbar-text>
            <b-nav-item to="/login">Login</b-nav-item>
            <b-nav-item to="/register">Register</b-nav-item>
          </template>
          <template v-else>
            <b-navbar-text>{{ $root.store.username }}</b-navbar-text>
            <b-nav-item-dropdown text="Personal Area" right>
              <b-dropdown-item to="/favorites">My Favorite Recipes</b-dropdown-item>
              <b-dropdown-item to="/my-recipes">My Recipes</b-dropdown-item>
              <b-dropdown-item to="/family-recipes">My Family Recipes</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item @click="logout">Disconnect</b-nav-item>
            <b-nav-item to="/new-recipe">New Recipe</b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        // Implement your logout logic here
        this.$root.store.username = null;
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar {
    margin-bottom: 20px;
  }
  </style>
  