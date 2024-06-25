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

        <!-- Sorting Options -->
        <b-form-select v-model="sortOrder" class="ml-2">
          <option value="none">No Sorting</option>
          <option value="timeAsc">Time - Ascending</option>
          <option value="timeDesc">Time - Descending</option>
          <option value="likesAsc">Likes - Ascending</option>
          <option value="likesDesc">Likes - Descending</option>
        </b-form-select>

        <!-- Results per page -->
        <b-form-select v-model="resultsPerPage" class="ml-2">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </b-form-select>
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
      resultsPerPage: 5, // Initialize with 5 to match the default option
      sortOrder: 'none'
    };
  },
  watch: {
    resultsPerPage() {
      this.searchRecipes();
    },
    sortOrder() {
      this.searchRecipes();
    }
  },
  methods: {
    searchRecipes() {
      let response = mockGetRecipesPreview(this.resultsPerPage);
      this.recipes = response.data.recipes.filter(recipe => {
        return (!this.maxTime || recipe.readyInMinutes <= this.maxTime) &&
               (!this.minLikes || recipe.aggregateLikes >= this.minLikes) &&
               (!this.isVegan || recipe.vegan) &&
               (!this.isVegetarian || recipe.vegetarian) &&
               (!this.isGlutenFree || recipe.glutenFree);
      });
      this.sortRecipes(); // Sort recipes after filtering
      sessionStorage.setItem('lastSearch', this.query); // Save last search
    },
    sortRecipes() {
      if (this.sortOrder === 'timeAsc') {
        this.recipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
      } else if (this.sortOrder === 'timeDesc') {
        this.recipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes);
      } else if (this.sortOrder === 'likesAsc') {
        this.recipes.sort((a, b) => a.aggregateLikes - b.aggregateLikes);
      } else if (this.sortOrder === 'likesDesc') {
        this.recipes.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
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
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  position: relative;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Ensure exactly three columns */
  gap: 20px;
}

@media (max-width: 800px) {
  .recipes-grid {
    grid-template-columns: repeat(2, 1fr); /* Two columns for smaller screens */
  }
}

@media (max-width: 500px) {
  .recipes-grid {
    grid-template-columns: 1fr; /* One column for very small screens */
  }
}
</style>
