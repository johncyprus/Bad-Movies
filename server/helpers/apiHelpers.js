const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file

const getBadMovies = (genreWithId) => {
    let genreId = genreWithId.id;
    let genreName = genreWithId.genre;

    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&vote_count.gte=1000&vote_average.gte=2&with_genres=${genreId}`
    return axios.get(url)
        .then(movieList => {
            // array of movie objects
            return movieList.data.results
        })
        .catch(error => {
            console.log('Error getting movies:', error);
        })


    // Must alter the url according to genres!
}

module.exports.getBadMovies = getBadMovies;