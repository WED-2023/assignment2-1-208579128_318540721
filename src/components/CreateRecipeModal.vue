<template>
  <b-modal
    id="create-recipe-modal"
    title="Create New Recipe"
    :visible.sync="isVisible"
    @hide="handleClose"
  >
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
      <b-form-group label="Ingredients" label-for="recipe-title">
        <b-form-input id="recipe-Ingredients" v-model="recipe.extendedIngredients" required></b-form-input>
      </b-form-group>
      <b-form-group label="Instructions" label-for="recipe-title">
        <b-form-input id="recipe-Instructions" v-model="recipe.analyzedInstructions" required></b-form-input>
      </b-form-group>
      <b-form-group label="Instructions" label-for="recipe-instructions">
        <b-form-textarea
          id="recipe-instructions"
          v-model="recipe.analyzedInstructions"
          placeholder="Enter each instruction step on a new line"
          required
        ></b-form-textarea>
      </b-form-group>
      <b-form-group label="Vegan" label-for="recipe-vegan">
        <b-form-select id="recipe-vegan" v-model="recipe.vegan" :options="booleanOptions"></b-form-select>
      </b-form-group>
      <b-form-group label="Vegetarian" label-for="recipe-vegetarian">
        <b-form-select id="recipe-vegetarian" v-model="recipe.vegetarian" :options="booleanOptions"></b-form-select>
      </b-form-group>
      <b-form-group label="Gluten-free" label-for="recipe-glutenFree">
        <b-form-select id="recipe-glutenFree" v-model="recipe.glutenFree" :options="booleanOptions"></b-form-select>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      recipe: {
        title: "",
        image: "",
        readyInMinutes: null,
        aggregateLikes: 0,
        summary: "",
        extendedIngredients: "",
        analyzedInstructions: "",
        vegan: false,
        vegetarian: false,
        glutenFree: false
      },
      booleanOptions: [
        { value: false, text: 'No' },
        { value: true, text: 'Yes' }
      ]
    };
  },
  methods: {
    handleSubmit() {
      const formattedRecipe = {
        ...this.recipe,
        extendedIngredients: this.recipe.extendedIngredients.split("\n").map(item => ({ original: item })),
        analyzedInstructions: this.recipe.analyzedInstructions.split("\n")
      };
      this.$emit("save-recipe", formattedRecipe);
      this.resetForm();
      this.$emit('close'); // Close the modal after submitting
    },
    resetForm() {
      this.recipe = {
        title: "",
        image: "",
        readyInMinutes: null,
        aggregateLikes: 0,
        summary: "",
        extendedIngredients: "",
        analyzedInstructions: "",
        vegan: false,
        vegetarian: false,
        glutenFree: false
      };
    },
    handleClose() {
      this.$emit('close');
    }
  }
};
</script>
