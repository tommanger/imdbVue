<template>
  <div>
    <h2 v-if="getMovies.length === 0" class="search-title">Search Movies</h2>
    <form
      class="search-container"
      :class="(getMovies.length > 0) ? '' : 'firstSearch'"
      @submit.prevent="searchMovies"
    >
      <input
        autofocus
        placeholder="Search Movies"
        class="search-movies"
        type="text"
        @input="checkSearch"
        v-model="filterBy.term"
      >
      <img class="icon" src="../assets/search.png">
      <h2 class="error" v-if="isWrong">Please fill out!</h2>
      <h2 class="error" v-if="isLong">You can only search over 3 letters</h2>
      <h2 class="error" v-if="hasNoResults">No results for {{filterBy.term}}</h2>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        term: ''
      },
      isWrong: false,
      isLong: false,
      isSearch: false
    }
  },
  methods: {
    searchMovies() {
      if (!this.filterBy.term) {
        this.isWrong = true
        return
      }
      if (this.filterBy.term.length < 3) {
        this.isLong = true
        return
      }
      this.$emit('searchMovies', this.filterBy)
    },
    checkSearch() {
      this.$store.dispatch({ type: 'closeNoResults' })
      if (this.filterBy.term.length >= 1) {
        this.isWrong = false
      }
      if (this.filterBy.term.length >= 3) {
        this.isLong = false
      }
    }
  },
  computed: {
    hasNoResults() {
      return this.$store.getters.hasNoResults
    },
    getMovies() {
      return this.$store.getters.getMovies
    }
  }
}
</script>
<style>
.search-title {
  font-size: 76px;
  background-color: #4caf50;
  border-radius: 10px;
  max-width: 650px;
  margin: 100px auto;
}
@media only screen and (max-width: 600px) {
  .search-title {
    font-size: 40px;
  }
}
.firstSearch {
  top: 170px;
}
.search-container {
  position: fixed;
  left: 50%;
  margin-left: -250px;
  width: 500px;
}
.search-movies {
  width: 200px;
  height: 50px;
  border-radius: 10px;
  border: none;
  padding-left: 40px;
  margin: 10px 0 18px 0;
  outline: none;
  box-shadow: 0 0 15px 0px black;
  transition: all 0.3s;
  position: relative;
  font-weight: bold;
}
.error {
  margin: 0;
  border-radius: 10px;
  background-color: #ff5e5e;
  box-shadow: 0 0 15px 0px black;
  color: black;
  padding: 10px;
  font-size: 14px;
}
.icon {
  max-width: 20px;
  position: absolute;
  margin: 26px 0 0 140px;
  top: 0;
  left: 0;
  transition: all .3s;
}
.search-movies:focus {
  width: 250px;
}
.search-movies:focus + .icon {
  margin: 26px 0 0 118px;
}
</style>
