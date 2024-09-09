<template>
  <div :class="['recipe-preview', { 'clicked': isClicked }]" @click="handleClick">
    <img :src="recipe.image" alt="recipe image" @mouseover="onHover" @mouseleave="onLeave">
    <div class="recipe-details">
      <h3>{{ recipe.title }}</h3>
      <p>Time: {{ recipe.readyInMinutes }} mins</p>
      <p>Likes: {{ recipe.aggregateLikes }}</p>
      <p>Vegan: {{ recipe.vegan ? 'Yes' : 'No' }}</p>
      <p>Vegetarian: {{ recipe.vegetarian ? 'Yes' : 'No' }}</p>
      <p>Gluten-free: {{ recipe.glutenFree ? 'Yes' : 'No' }}</p>
    </div>
    <b-button 
      :variant="recipe.favorite ? 'danger' : 'primary'" 
      @click.stop="toggleFavorite" 
      class="favorite-button"
    >
      {{ recipe.favorite ? 'Remove from Favorites' : 'Add to Favorites' }}
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    recipe: Object
  },
  data() {
    return {
      isClicked: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('previewClick', this.recipe.id);
      this.isClicked = true;
      localStorage.setItem(`clicked_${this.recipe.id}`, 'true');

      // Update last viewed list
      let lastViewed = JSON.parse(localStorage.getItem('lastViewedRecipes')) || [];
      lastViewed = lastViewed.filter(r => r.id !== this.recipe.id);
      lastViewed.unshift(this.recipe);
      if (lastViewed.length > 3) lastViewed.pop();
      localStorage.setItem('lastViewedRecipes', JSON.stringify(lastViewed));

      // Emit an event to notify parent component about the change in last viewed recipes
      this.$emit('updateLastViewed', lastViewed);

      // Programmatic navigation
      this.$router.push({ name: 'recipe', params: { id: this.recipe.id } });
    },
    toggleFavorite() {
      this.recipe.favorite = !this.recipe.favorite;
      let favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      
      if (this.recipe.favorite) {
        favorites.push(this.recipe);
      } else {
        favorites = favorites.filter(r => r.id !== this.recipe.id);
      }

      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      localStorage.setItem(`favorite_${this.recipe.id}`, this.recipe.favorite);
    },
    onHover(event) {
      event.target.style.cursor = 'pointer';
    },
    onLeave(event) {
      event.target.style.cursor = 'default';
    }
  },
  mounted() {
    this.isClicked = localStorage.getItem(`clicked_${this.recipe.id}`) === 'true';
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
  width: 300px;
  height: 580px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.recipe-preview img {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
}

.recipe-details {
  flex: 1;
}

.favorite-button {
  margin-top: 10px;
}

.clicked {
  background-color: rgb(192, 192, 144);
}

.favorite {
  background-color: red;
  color: white;
}
</style>