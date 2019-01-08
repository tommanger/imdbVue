<template>
  <div class="movie-list">
    <movie-preview v-for="movie in movies" :key="movie.imdbID" :movie="movie"/>
  </div>
</template>

<script>
import MoviePreview from './MoviePreview'

export default {
  props: ['movies'],
  components: {
    MoviePreview
  }
}
</script>

<style>
.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 0;
  grid-auto-rows: 300px;
}
@media only screen and (max-width: 1235px) {
  .movie-list {
    grid-template-columns: repeat(auto-fill, 33%);
  }
}
@media only screen and (max-width: 935px) {
  .movie-list {
    grid-template-columns: repeat(auto-fill, 50%);
  }
}
@media only screen and (max-width: 630px) {
  .movie-list {
    grid-template-columns: repeat(auto-fill, 100%);
  }
}
</style>
