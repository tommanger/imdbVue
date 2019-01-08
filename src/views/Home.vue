<template>
  <div class="home">    
    <search-movies @searchMovies="searchMovies"/>
    <movie-list :movies="getMovies"/>
    <button @click="loadMore" v-if="hasMore">Load More</button>
  </div>
</template>

<script>
import MovieList from '../components/MovieList';
import searchMovies from '../components/SearchMovies'

export default {
  name: 'home',
  components: {
    MovieList,
    searchMovies
  },
  computed: {
    getMovies() {
      return this.$store.getters.getMovies
    },
    hasMore() {
      return this.$store.getters.hasMore
    }
  },
  methods: {
    searchMovies(filterBy) {
      this.$store.dispatch({ type: 'searchMovies', filterBy })
    },
    loadMore() {
      this.$store.dispatch({ type: 'loadMore' })
    }
  },
  
}
</script>

