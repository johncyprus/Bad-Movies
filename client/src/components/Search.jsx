import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      currentValue: {id: 28, genre: "Action"}
    };
    this.getGenres = this.getGenres.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.getGenres(); // sets official list of genres in select element
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get("/genres")
      .then(response => {
        let genres = response.data // array of genres
        this.setState({
          genres: genres
        })

      })
      .catch(error => {
        console.log('Error loading genres:', error);
      })
  }

  handleChange(e) {
    
    this.setState({
      currentValue: e.target.value
    })
  }

  handleSearch() {
    let selectedGenre = this.state.currentValue; // a JSON object
    // console.log('What shows when we click SEARCH:', selectedGenre);
    this.props.getMovies(selectedGenre);
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.handleChange}>
          {this.state.genres.map((genre) => {
            return (
              <option key={genre.id} value={JSON.stringify(genre)}>{genre.name}</option>
            )
          })}
        </select>
        <br/><br/>

        <button onClick={this.handleSearch}>Search</button>

      </div>
    );
  }
}

export default Search;