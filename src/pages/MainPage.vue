<template>
  <div class="container">
    <NavigationBar />
    <h1 class="title">Main Page</h1>

    <div class="columns">
      <!-- Left Column -->
      <div class="column">
        <h2>Explore these recipes</h2>
        <RecipePreviewList 
          :recipes="randomRecipes" 
          @updateLastViewed="handleLastViewedUpdate"
        />
        <b-button variant="primary" @click="generateNewRecipes">Generate New Recipes</b-button>
      </div>

      <!-- Right Column -->
      <div class="column">
        <h2 v-if="$root.store.username">Last Viewed Recipes</h2>
        <h2 v-else>Welcome</h2>

        <div v-if="$root.store.username">
          <div v-if="lastViewedRecipes.length > 0">
            <RecipePreviewList 
              :recipes="lastViewedRecipes" 
              @updateLastViewed="handleLastViewedUpdate"
            />
          </div>
          <div v-else>
            <p>You have not viewed any recipes yet.</p>
          </div>
        </div>
        <div v-else>
          <router-link to="/login" class="btn btn-primary">Login</router-link>
          <router-link to="/register" class="btn btn-secondary">Register</router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { getRecipesPreview } from "../services/recipes.js";

export default {
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      randomRecipes: [],
      lastViewedRecipes: [] // Store the last viewed recipes
    };
  },
  mounted() {
    this.generateNewRecipes();
    if (this.$root.store.username) {
      this.loadLastViewedRecipes();
    }
  },
  methods: {
    async generateNewRecipes() {
      const amountToFetch = 3;
      try {
        const response = await getRecipesPreview(amountToFetch);
        this.randomRecipes = response.data.recipes;
      } catch (error) {
        console.error("Error fetching new recipes:", error);
      }
    },

    loadLastViewedRecipes() {
      const lastViewed = JSON.parse(localStorage.getItem('lastViewedRecipes')) || [];
      this.lastViewedRecipes = lastViewed.slice(0, 3); // Only keep the last 3
    },

    handleLastViewedUpdate(updatedLastViewed) {
      this.lastViewedRecipes = updatedLastViewed.slice(0, 3); // Only keep the last 3
      localStorage.setItem('lastViewedRecipes', JSON.stringify(this.lastViewedRecipes));
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.columns {
  display: flex;
  justify-content: space-between;
}
.column {
  flex: 1;
  margin: 10px;
}
</style>
