<template>
  <div class="container">
    <h1 class="title">My Recipes</h1>
    <b-row v-if="loading">
      <b-col class="text-center">
        <b-spinner label="Loading..."></b-spinner>
      </b-col>
    </b-row>
    <b-row v-else-if="myRecipes.length === 0">
      <b-col class="text-center">
        <p>You haven't created any recipes yet.</p>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col v-for="recipe in myRecipes" :key="recipe.recipe_id" cols="12" md="6" lg="4">
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
      myRecipes: [],
      loading: true
    };
  },
  mounted() {
    this.loadMyRecipes();
  },
  methods: {
    async loadMyRecipes() {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          throw new Error("User not logged in");
        }

        const response = await axios.get(`http://localhost:80/recipes/custom/${username}`);

        if (response.data.success) {
          this.myRecipes = response.data.recipes;
        } else {
          throw new Error(response.data.message || "Failed to load recipes");
        }
      } catch (error) {
        console.error("Error loading recipes:", error);
        this.$root.toast("Error", error.message || "Failed to load recipes", "danger");
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
