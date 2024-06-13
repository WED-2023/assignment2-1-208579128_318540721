<template>
    <div class="container">
      <h1 class="title">My Recipes</h1>
      <b-row>
        <b-col v-for="recipe in myRecipes" :key="recipe.id" cols="12" md="6" lg="4">
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
        myRecipes: []
      };
    },
    mounted() {
      this.loadMyRecipes();
    },
    methods: {
      loadMyRecipes() {
        let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        this.myRecipes = recipes;
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
  