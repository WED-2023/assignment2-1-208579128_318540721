<template>
  <div class="container">
    <NavigationBar />
    <h1 class="title">Main Page</h1>


    <div class="columns">
      <!-- Left Column -->
      <div class="column">
        <h2>Explore these recipes</h2>
        <RecipePreviewList :recipes="randomRecipes" />
        <b-button variant="primary" @click="generateNewRecipes">Generate New Recipes</b-button>
      </div>

      <!-- Right Column -->
      <div class="column">
        <h2 v-if="$root.store.username">Last Viewed Recipes</h2>
        <h2 v-else>Welcome</h2>

        <div v-if="$root.store.username">
          <div v-if="lastViewedRecipes.length > 0">
            <RecipePreviewList :recipes="lastViewedRecipes" />
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
import NavigationBar from "../components/NavigationBar";

import { mockGetRecipesPreview, mockGetRecipesPreviewByIds } from "../services/recipes.js";


export default {
  components: {
    RecipePreviewList,
    NavigationBar

  },
  data() {
    return {
      randomRecipes: [],
      lastViewedRecipeIds: [], // Store the IDs of last viewed recipes
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
    generateNewRecipes() {
      const amountToFetch = 3;
      const response = mockGetRecipesPreview(amountToFetch);
      this.randomRecipes = response.data.recipes;

     

    },
    loadLastViewedRecipes() {
      const lastViewedIds = JSON.parse(localStorage.getItem('lastViewedRecipes')) || [];
        // Call the function to get the preview list of last viewed recipes by their IDs
      const response2 = mockGetRecipesPreviewByIds(lastViewedIds);
      this.lastViewedRecipes = response2.data.recipes
      console.log(this.lastViewedRecipes);


      
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
