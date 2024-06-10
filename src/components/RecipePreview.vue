<template>
  <div :class="['recipe-preview', { 'clicked': recipe.clicked }]" @click="handleClick">
    <img :src="recipe.image" alt="recipe image"
     @mouseover="onHover" 
     @mouseleave="onLeave">
    <h3>{{ recipe.title }}</h3>
    <p>Time: {{ recipe.readyInMinutes }} mins</p>
    <p>Likes: {{ recipe.aggregateLikes }}</p>
    <p>Vegan: {{ recipe.vegan ? 'Yes' : 'No' }}</p>
    <p>Vegetarian: {{ recipe.vegetarian ? 'Yes' : 'No' }}</p>
    <p>Gluten-free: {{ recipe.glutenFree ? 'Yes' : 'No' }}</p>
  </div>
</template>

<script>
export default {
  props: {
    recipe: Object
  },
  methods: {
    handleClick() {
      // Emit the 'previewClick' event
      this.$emit('previewClick', this.recipe.id);
      
      // Set the 'clicked' property of the recipe object to true
      this.recipe.clicked = true;
      
      // Save the clicked state in local storage
      localStorage.setItem(`clicked_${this.recipe.id}`, 'true');
      
      // Navigate to the 'recipe' route
      this.$router.push({ name: 'recipe', params: { id: this.recipe.id } });
    },
    resetClickedState() {
      // Reset the 'clicked' property of the recipe object to false
      this.recipe.clicked = false;
      
      // Remove the corresponding entry from local storage
      localStorage.removeItem(`clicked_${this.recipe.id}`);
    },
    onHover(event) {
      event.target.style.cursor = 'pointer';
    },
    onLeave(event) {
      event.target.style.cursor = 'default';
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  text-align: center;
}

.recipe-preview img {
  width: 100%;
  height: auto;
}

.clicked {
  background-color: yellow;
}
</style>
