const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');
const axios = require('axios');
const {API_KEY} = require('../../config');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {

    let genreWithId = req.query;
    apiHelpers.getBadMovies(genreWithId)
      .then(movieList => {
        let formattedList = movieList.map((movie) => {
          return {
            vote_average: movie.vote_average,
            title: movie.title,
            id: movie.id,
            release_date: movie.release_date,
            overview: movie.overview,
            poster_path: movie.poster_path
          }
        });
        res.send(formattedList);
      })
      .catch(error => {
        console.log('Error getting movies list:', error);
      });
  },
  getGenres: (req, res) => {

    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    axios.get(url)
      .then(apiResponse => {
        let genres = apiResponse.data.genres;
        res.send(genres);
      })
      .catch(error => {
        console.log('Error getting genres list:', error)
      })

  },
  saveMovie: (req, res) => {
    //console.log('IS CONTROLLER TRIGGERED:', req.body);  // must be an object

   movieModel.saveToDb(req, res);

  },
  deleteMovie: (req, res) => {
    movieModel.deleteFromDb(req, res);
  }
}