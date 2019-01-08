import Vue from 'vue'
import Vuex from 'vuex'
import movieService from './services/movieService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    filterBy: null,
    isMore: false,
    pages: 0,
    isNoResults: false,
    currMovie: null,
  },
  getters: {
    getMovies: (state) => state.movies,
    hasMore: (state) => state.isMore,
    hasNoResults: (state) => state.isNoResults,
    getCurrMovie: (state) => state.currMovie
  },
  mutations: {
    setMovies(state, {res}){
      if(!res.Search){
        state.isNoResults = true
        return
      }
      if(res.totalResults > 10){
        state.pages = Math.ceil(res.totalResults / 10)
        state.isMore = true
      }else{
        state.isMore = false
      }
      state.movies = res.Search
    },
    setMoreMovies(state, {movies}){
      state.movies.push(...movies)
    },
    setFilter(state, {filterBy}){
      state.filterBy = filterBy
    },
    addPage(state){
      state.filterBy.page++
      if(state.filterBy.page === state.pages){
        state.isMore = false
      }
    },
    setCurrMovie(state,{movie}){
      state.currMovie = movie
    }
  },
  actions: {
    searchMovies({commit}, { filterBy }){
      filterBy.page = 1
      commit({type: 'setFilter', filterBy})

      movieService.loadMovies(filterBy)
      .then(res=>{
        commit({type: 'setMovies', res})
      })
    },
    loadMore({commit, state}){
      commit({type:'addPage'})
      movieService.loadMovies(state.filterBy)
      .then(res=>{
        commit({type: 'setMoreMovies', movies: res.Search})
      })
    },
    closeNoResults({state}){
      state.isNoResults = false
    },
    getMovieById({commit},{imdbID}){
      movieService.getMovieById(imdbID)
      .then(movie=>{
        commit({type: 'setCurrMovie', movie})
      })
    },
    cleanMovie({state}){
      state.currMovie = null
    }
  }
})
