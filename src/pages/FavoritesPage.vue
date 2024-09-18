<template>
  <div class="container">
    <h1 class="title">My Favorite Recipes</h1>
    <b-alert v-model="showAlert" variant="danger" dismissible>
      {{ errorMessage }}
    </b-alert>
    <b-row v-if="loading">
      <b-col class="text-center">
        <b-spinner label="Loading..."></b-spinner>
      </b-col>
    </b-row>
    <b-row v-else-if="favoriteRecipes.length === 0">
      <b-col class="text-center">
        <p>You don't have any favorite recipes yet.</p>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col v-for="recipe in favoriteRecipes" :key="recipe.id" cols="12" md="6" lg="4">
        <RecipePreview :recipe="recipe" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview.vue";
import axios from 'axios';

export default {
  components: {
    RecipePreview
  },
  data() {
    return {
      favoriteRecipes: [],
      loading: true,
      showAlert: false,
      errorMessage: ''
    };
  },
  mounted() {
    this.loadFavoriteRecipes();
  },
  methods: {
    async loadFavoriteRecipes() {
      this.loading = true;
      this.showAlert = false;
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          throw new Error('User not logged in');
        }
        const response = await axios.get(`http://localhost:80/recipes/favorites/${username}`);
        if (response.data.success) {
          this.favoriteRecipes = response.data.favorites;
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error('Error loading favorite recipes:', error);
        this.showAlert = true;
        this.errorMessage = error.message || 'An error occurred while loading favorite recipes';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
