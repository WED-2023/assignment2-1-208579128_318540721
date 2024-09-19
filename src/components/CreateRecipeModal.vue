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

      <!-- Dynamic Instructions Input -->
      <b-form-group label="Instructions">
        <div v-for="(instruction, index) in recipe.instructions" :key="index" class="mb-2">
          <b-input-group>
            <b-form-input
              v-model="recipe.instructions[index]"
              placeholder="Enter instruction step"
              required
            ></b-form-input>
            <b-input-group-append>
              <b-button @click="removeInstruction(index)" variant="danger">Remove</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
        <b-button @click="addInstruction" variant="success">Add Instruction</b-button>
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
import axios from 'axios';

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
        id: "", // Optional, auto-assigned by the server
        title: "",
        image: "",
        readyInMinutes: null,
        aggregateLikes: 0, // Default value if not provided by the user
        extendedIngredients: "", // Not used in your current structure
        instructions: [], // Now it's an array for multiple steps
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
    // Add a new blank instruction
    addInstruction() {
      this.recipe.instructions.push("");
    },
    // Remove an instruction by its index
    removeInstruction(index) {
      this.recipe.instructions.splice(index, 1);
    },
    async handleSubmit() {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          throw new Error("User not logged in");
        }

        const formattedRecipe = {
          ...this.recipe,
          username: username
        };

        const response = await axios.post('http://localhost:80/recipes/custom', formattedRecipe);

        if (response.data.success) {
          this.recipe.id = response.data.recipeId;

          this.$emit("save-recipe", { ...this.recipe });

          this.resetForm();
          this.$emit('close');
          this.$root.toast("Success", "Recipe created successfully!", "success");
        } else {
          throw new Error(response.data.message || "Failed to create recipe");
        }
      } catch (error) {
        console.error("Error creating recipe:", error);
        this.$root.toast("Error", error.message || "Failed to create recipe", "danger");
      }
    },
    resetForm() {
      this.recipe = {
        id: "",
        title: "",
        image: "",
        readyInMinutes: null,
        aggregateLikes: 0,
        extendedIngredients: "",
        instructions: [], // Reset instructions
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

<style scoped>
.mb-2 {
  margin-bottom: 0.5rem;
}
</style>
