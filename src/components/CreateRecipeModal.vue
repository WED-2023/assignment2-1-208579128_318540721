<template>
    <b-modal id="create-recipe-modal" title="Create New Recipe" @ok="handleSubmit">
      <b-form @submit.stop.prevent="handleSubmit">
        <b-form-group label="Title" label-for="recipe-title">
          <b-form-input id="recipe-title" v-model="recipe.title" required></b-form-input>
        </b-form-group>
        <b-form-group label="Image URL" label-for="recipe-image">
          <b-form-input id="recipe-image" v-model="recipe.image" required></b-form-input>
        </b-form-group>
        <b-form-group label="Ready in Minutes" label-for="recipe-time">
          <b-form-input id="recipe-time" v-model="recipe.readyInMinutes" type="number" required></b-form-input>
        </b-form-group>
        <b-form-group label="Likes" label-for="recipe-likes">
          <b-form-input id="recipe-likes" v-model="recipe.aggregateLikes" type="number" min="0" required></b-form-input>
        </b-form-group>
        <b-form-group label="Vegan" label-for="recipe-vegan">
          <b-form-checkbox id="recipe-vegan" v-model="recipe.vegan">Yes</b-form-checkbox>
        </b-form-group>
        <b-form-group label="Vegetarian" label-for="recipe-vegetarian">
          <b-form-checkbox id="recipe-vegetarian" v-model="recipe.vegetarian">Yes</b-form-checkbox>
        </b-form-group>
        <b-form-group label="Gluten-free" label-for="recipe-glutenFree">
          <b-form-checkbox id="recipe-glutenFree" v-model="recipe.glutenFree">Yes</b-form-checkbox>
        </b-form-group>
      </b-form>
    </b-modal>
  </template>
  
  <script>
  export default {
    data() {
      return {
        recipe: {
          title: "",
          image: "",
          readyInMinutes: null,
          aggregateLikes: 0, // Default to 0
          vegan: false,
          vegetarian: false,
          glutenFree: false
        }
      };
    },
    methods: {
      handleSubmit() {
        this.$emit("save-recipe", this.recipe);
        this.recipe = {
          title: "",
          image: "",
          readyInMinutes: null,
          aggregateLikes: 0, // Reset to default 0
          vegan: false,
          vegetarian: false,
          glutenFree: false
        };
      }
    }
  };
  </script>
  