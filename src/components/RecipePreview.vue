<template>
  <div :class="['recipe-preview', { 'clicked': recipe.clicked }]" @click="handleClick">
    <img :src="recipe.image" alt="recipe image" @mouseover="onHover" @mouseleave="onLeave">
    <h3>{{ recipe.title }}</h3>
    <p>Time: {{ recipe.readyInMinutes }} mins</p>
    <p>Likes: {{ recipe.aggregateLikes }}</p>
    <p>Vegan: {{ recipe.vegan ? 'Yes' : 'No' }}</p>
    <p>Vegetarian: {{ recipe.vegetarian ? 'Yes' : 'No' }}</p>
    <p>Gluten-free: {{ recipe.glutenFree ? 'Yes' : 'No' }}</p>
    <b-button :variant="recipe.favorite ? 'danger' : 'primary'" @click.stop="toggleFavorite">
      {{ recipe.favorite ? 'Remove from Favorites' : 'Add to Favorites' }}
    </b-button>
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
      this.$router.push({ name: 'recipe', params: { id: this.recipe.id } });
    },
    toggleFavorite() {
      this.recipe.favorite = !this.recipe.favorite;
      if (this.recipe.favorite) {
        localStorage.setItem(`favorite_${this.recipe.id}`, 'true');
      } else {
        localStorage.removeItem(`favorite_${this.recipe.id}`);
      }
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
  background-color: rgb(192, 192, 144);
}

.favorite {
  background-color: red;
  color: white;
}
</style>
