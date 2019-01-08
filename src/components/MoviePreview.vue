<template>
  <router-link
    :to="'/movie/'+movie.imdbID"
    tag="div"
    class="movie-preview"
    :style="'background-image:url('+ ((movie.Poster !== 'N/A') ? movie.Poster : '../noimage.jpg')+')'"
  >
    <button @click="goTo(movie.imdbID)">Go to IMDB</button>
  </router-link>
</template>

<script>
export default {
  props: ['movie'],
  mounted() {
    console.log(this.movie)
  },
  methods: {
    goTo(movieId) {
      window.open(`https://www.imdb.com/title/${movieId}/?ref_=fn_al_tt_1`);
    }
  }
}
</script>

<style>
.movie-preview {
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: all 0.4s;
}
.movie-preview:hover {
  box-shadow: inset 0 0 20px 3px rgb(0, 0, 0);
  cursor: pointer;
}

button {
  background: none;
  border: 0;
  background-color: white;
  padding: 7px 15px;
  border-radius: 10px;
  margin: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  outline: none;
}
button:hover {
  background-color: whitesmoke;
}
</style>
