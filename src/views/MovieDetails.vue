<template>
  <div v-if="movie" class="details-container">
    <div class="flex column details-header">
      <div class="flex space align-center">
        <h1>
          {{movie.Title}}
          <span>({{movie.Year}})</span>
        </h1>
        <div>
          <h1>
            {{movie.imdbRating}}
            <span>/10</span>
          </h1>
          <h4>{{movie.imdbVotes}}</h4>
        </div>
      </div>
      <div>
        <h4>
          {{movie.Rated}} | {{movie.Runtime}} | {{movie.Genre}} | {{movie.Released}}
          <span>({{movie.Country}})</span>
        </h4>
      </div>
    </div>
    <div class="flex details">
      <div
        class="image"
        :style="'background-image:url('+ ((movie.Poster !== 'N/A') ? movie.Poster : '../noimage.jpg')+')'"
      ></div>
      <div class="flex column details-more">
        <h4>{{movie.Plot}}</h4>
        <h4>
          Director:
          <span>{{movie.Director}}</span>
        </h4>
        <h4>
          Writer:
          <span>{{movie.Writer}}</span>
        </h4>
        <h4>
          Actors:
          <span>{{movie.Actors}}</span>
        </h4>
        <h4>
          Production:
          <span>{{movie.Production}}</span>
        </h4>
        <h4>
          BoxOffice:
          <span>{{movie.BoxOffice}}</span>
        </h4>
      </div>
    </div>
    <router-link to="/" tag="button" class="btn-back">Back to List</router-link>
  </div>
</template>

<script>
export default {
  created() {
    const imdbID = this.$route.params.imdbID;
    this.$store.dispatch({ type: 'getMovieById', imdbID })
  },
  computed: {
    movie() {
      return this.$store.getters.getCurrMovie
    },
  },
  destroyed() {
    console.log('bye bye')
    this.$store.dispatch({ type: 'cleanMovie' })

  }
}
</script>

<style>
.details-container {
  border: 2px solid #4caf50;
  border-radius: 17px;
  overflow: hidden;
}
.flex {
  display: flex;
}
.column {
  flex-direction: column;
}
.justify-center {
  justify-content: center;
}
.align-center {
  align-items: center;
}

.space {
  justify-content: space-between;
}
.details-header {
  color: #1b1b1b;
  background-color: #4caf50;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.details-more {
  text-align: start;
  margin: 25px 25px 0 25px;
  max-width: 1300px;
}
.details-more > h4 {
  margin-top: 40px;
}
.details-more > h4:first-child {
  margin: 0;
}
h1,
h4 {
  margin: 0;
  text-align: start;
}
.btn-back {
  background-color: #4caf50;
  border-radius: 10px 10px 0 0;
  border: 2px solid #4caf50;
  margin: 0;
}
.image {
  width: 1000px;
  height: 500px;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: all 0.4s;
}
@media only screen and (max-width: 600px) {
  .details {
    flex-direction: column;
  }
  .image {
    background-position: unset;
    background-repeat: no-repeat;
    background-size: contain;
  }
}
</style>
