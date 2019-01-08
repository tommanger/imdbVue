

function loadMovies(filterBy) {
    return fetch(`http://www.omdbapi.com/?apikey=d777cf78&s=${filterBy.term}&type=movie&page=${filterBy.page}`)
        .then((res) => {
            return res.json()
        })
}
function getMovieById(imdbID) {
    return fetch(`http://www.omdbapi.com/?apikey=bdfb6376&i=${imdbID}`)
    .then((res) => {
        return res.json()
    })
  }


export default{
    loadMovies,
    getMovieById
}