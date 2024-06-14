<template>
  <div :class="['recipe-preview', { 'clicked': recipe.clicked }]" @click="handleClick">
    <img :src="recipe.image" alt="recipe image" @mouseover="onHover" @mouseleave="onLeave">
    <h3>{{ recipe.title }}</h3>
    <p>Time: {{ recipe.readyInMinutes }} mins</p>
    <p>Likes: {{ recipe.aggregateLikes }}</p>
    <p>Vegan: {{ recipe.vegan ? 'Yes' : 'No' }}</p>
    <p>Vegetarian: {{ recipe.vegetarian ? 'Yes' : 'No' }}</p>
    <p>Gluten-free: {{ recipe.glutenFree ? 'Yes' : 'No' }}</p>
    <button @click.stop="toggleFavorite">{{ recipe.favorite ? 'Remove from Favorites' : 'Add to Favorites' }}</button>
  </div>
</template>

<script>
export default {
  props: {
    recipe: Object
  },
  methods: {
    handleClick() {
  this.$emit('previewClick', this.recipe.id);
  this.recipe.clicked = true;
  localStorage.setItem(`clicked_${this.recipe.id}`, 'true');

  // Update last viewed list
  let lastViewed = JSON.parse(localStorage.getItem('lastViewedRecipes')) || [];
  lastViewed = lastViewed.filter(id => id !== this.recipe.id); // Remove if it exists
  lastViewed.unshift(this.recipe.id); // Add to the front
  if (lastViewed.length > 3) lastViewed.pop(); // Keep only the last 3
  localStorage.setItem('lastViewedRecipes', JSON.stringify(lastViewed));

  this.$router.push({ name: 'recipe', params: { id: this.recipe.id } });
},
    onHover(event) {
      event.target.style.cursor = 'pointer';
    },
    onLeave(event) {
      event.target.style.cursor = 'default';
    }
  },
  mounted() {
    this.recipe.favorite = localStorage.getItem(`favorite_${this.recipe.id}`) === 'true';
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

.favorite {
  background-color: red;
  color: white;
}
</style>