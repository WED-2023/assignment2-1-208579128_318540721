<template>
  <div>
    <!-- Background Container for Blurred Image -->
    <div class="background-container"></div>

    <!-- Main Container for Content -->
    <div class="container">
      <h1 class="title">Search Recipes</h1>
      <b-form inline>
        <b-form-input
          v-model="query"
          placeholder="Search for recipes..."
          class="mr-sm-2"
        ></b-form-input>
        <b-button variant="outline-success" @click="searchRecipes">Search</b-button>
      </b-form>

      <!-- Filters -->
      <div>
        <b-form-group label="Time (in minutes):">
          <b-form-input type="number" v-model="maxTime" placeholder="Max time"></b-form-input>
        </b-form-group>
        <b-form-group label="Minimum Likes:">
          <b-form-input type="number" v-model="minLikes" placeholder="Minimum likes"></b-form-input>
        </b-form-group>
        <b-form-checkbox v-model="isVegan">Vegan</b-form-checkbox>
        <b-form-checkbox v-model="isVegetarian">Vegetarian</b-form-checkbox>
        <b-form-checkbox v-model="isGlutenFree">Gluten-free</b-form-checkbox>
      </div>

      <!-- Results per page -->
      <b-form-group label="Results per page:">
        <b-form-select v-model="resultsPerPage" :options="[5, 10, 15]" class="mr-sm-2"></b-form-select>
      </b-form-group>

      <!-- Display Search Results in a grid layout -->
      <div class="recipes-grid" v-if="recipes.length > 0">
        <RecipePreview
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>
      <div v-else>No results found.</div>
    </div>
  </div>
</template>

<script>
import { mockGetRecipesPreview } from '@/services/recipes';
import RecipePreview from '@/components/RecipePreview.vue';

export default {
  components: {
    RecipePreview
  },
  data() {
    return {
      query: '',
      recipes: [],
      maxTime: null,
      minLikes: null,
      isVegan: false,
      isVegetarian: false,
      isGlutenFree: false,
      resultsPerPage: 5
    };
  },
  methods: {
    searchRecipes() {
      let response = mockGetRecipesPreview(this.resultsPerPage);
      if (response.status === 200) {
        this.recipes = response.data.recipes.filter(recipe => {
          return (!this.maxTime || recipe.readyInMinutes <= this.maxTime) &&
                 (!this.minLikes || recipe.aggregateLikes >= this.minLikes) &&
                 (!this.isVegan || recipe.vegan) &&
                 (!this.isVegetarian || recipe.vegetarian) &&
                 (!this.isGlutenFree || recipe.glutenFree);
        });
        sessionStorage.setItem('lastSearch', this.query); // Save last search
      }
    }
  },
  mounted() {
    this.query = sessionStorage.getItem('lastSearch') || '';
    if (this.query) {
      this.searchRecipes(); // Perform search if there was a previous search
    }
  }
};
</script>

<style scoped>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/searchBack.png'); /* Ensure the path is correct */
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  z-index: -1; /* Keep the background behind all content */
}

.container {
  max-width: 1200px; /* Adjust based on your preference */
  margin: auto;
  padding: 20px;
  position: relative; /* Ensures content is positioned relative to other elements */
  filter: none; /* Explicitly removing any inherited filters */
  background: rgba(255, 255, 255, 0.8); /* Optional: Add a slight background to content for better readability */
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Creates three columns as default */
  gap: 20px; /* Space between grid items */
  filter: none; /* Explicitly state no filter for clarity */
}

@media (max-width: 800px) {
  .recipes-grid {
    grid-template-columns: repeat(2, 1fr); /* Two columns on smaller screens */
  }
}

@media (max-width: 500px) {
  .recipes-grid {
    grid-template-columns: 1fr; /* One column on very small screens */
  }
}
</style>
