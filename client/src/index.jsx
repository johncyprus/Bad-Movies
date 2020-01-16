import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [{deway: "favorites"}],
      showFaves: false,
    };
    
    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
  }
  
  componentDidMount() {
    let defaultGenre = {id: 28, genre: "Action"};
    this.getMovies(JSON.stringify(defaultGenre));
  }

  getMovies(genre) {
    //make an axios request to your server on the GET SEARCH endpoint
    let genreWithId = JSON.parse(genre);
    
    axios.get('/search', {
      params: genreWithId
    })
      .then(movieList => {
        // console.log('DID THIS WORK???:', movieList.data);
        this.setState({
          movies: movieList.data
        })
      })
      .catch(error => {
        console.log('Error loading movies');
        throw error('Unable to load movies');
      })

  
  }

  saveMovie() {
    // same as above but do something diff
  }

  deleteMovie() {
    // same as above but do something diff
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));