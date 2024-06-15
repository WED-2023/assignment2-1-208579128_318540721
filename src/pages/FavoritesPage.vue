<template>
    <div class="container">
      <h1 class="title">My Favorite Recipes</h1>
      <b-row>
        <b-col v-for="recipe in favoriteRecipes" :key="recipe.id" cols="12" md="6" lg="4">
          <RecipePreview :recipe="recipe" />
        </b-col>
      </b-row>
    </div>
  </template>
  
  <script>
  import RecipePreview from "../components/RecipePreview.vue";
  
  export default {
    components: {
      RecipePreview
    },
    data() {
      return {
        favoriteRecipes: []
      };
    },
    mounted() {
      this.loadFavoriteRecipes();
    },
    methods: {
      loadFavoriteRecipes() {
        this.favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
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
  