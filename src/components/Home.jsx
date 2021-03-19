// == HOME is the PARENT COMPONENT that holds all child components found in the body of the REACT App== //
// == Child Components include Form, Movie List, and Movie Info== //

import React, { Component } from 'react';
import Form from './Form'
import Movielist from './Movielist'
import Movieinfo from './Movieinfo'


// == CONNECTION TO DB == //
let baseURL = 'https://mockbusters.herokuapp.com'
/*
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://mockbusters.herokuapp.com'
}
*/

export default class Home extends Component {
  constructor() {
    super();
    //STATE Holds Movie Data including the Populated List from MongoDB
    this.state = {
      movies: [],
      title: '',
      director: '',
      year: 0,
      platform: '',
      description: '',
      image: ''
    }
    this.handleAddMovie = this.handleAddMovie.bind(this)
    this.handleDeleteMovie = this.handleDeleteMovie.bind(this)
    this.getMovies = this.getMovies.bind(this);
  }

  // == Mount the Movie's Fetch Request Upon Page Load == //
  componentDidMount() {
    this.getMovies()
  }

  // == Fetch Movies from MongoDB Server == //
  getMovies() {
    fetch(baseURL + '/mockbuster')
      .then(data => {
        return data.json()
      },
        err => console.log(err))
      .then(parsedData =>
        this.setState({ movies: parsedData }),
        err => console.log(err))
  }

  // == Method for handling adding a movie to the "Copy Movies array" == //
  handleAddMovie(movie) {
    const copyMovies = [...this.state.movies]
    copyMovies.unshift(movie)
    this.setState({
      movies: copyMovies,
      title: '',
      director: '',
      year: 0,
      platform: '',
      description: '',
      image: ''
    })
  }

  // == Delete a Movie based off Movie ID== //
  handleDeleteMovie(e, id) {
    e.preventDefault(); //To Prevent link from clicking and only button
    console.log("delete button")
    console.log(id)

    fetch(baseURL + '/mockbuster/' + id, {
      method: 'DELETE',
    }).then(res => {
      const copyMovies = [...this.state.movies];
      const findIndex = this.state.movies.findIndex(movie => movie._id === id)
      copyMovies.splice(findIndex, 1);
      this.setState({
        movies: copyMovies,
        movie: ''
      })
    })
  }

  // == Edit Movie based off of ID == //
  handleEditMovie(e, resJson) {
    e.preventDefault();
    console.log("edit movie called");

    const id = (resJson._id);
    console.log(id)

    fetch(baseURL + '/mockbuster/' + id, {
      method: 'PUT',
    }).then(res => {
      console.log("test")
      const copyMovies = [...this.state.movies];
      console.log(copyMovies)
      const findIndex = this.state.movies.findIndex(movie => movie._id === id)
      copyMovies[findIndex] = resJson;
      this.setState({
        movies: copyMovies,
      })
    })
  }

  // == Handle viewing the movie by setting the individually clicked movie to the parent's state == //
  handleViewMovie(e, movie) {
    e.preventDefault();
    // console.log(movie);
    this.setState({
      movie
    });
  }

  render() {
    return (

      <section className="section">
        <div className="container">
          <div className="columns is-centered">

            {/* CHILD COMPONENTS - FORM, MOVIELIST/WATCHLIST, MORE INFORMATION */}

            {/* FORM COLUMN */}
              {/* handleAddMovie is sent down to the child as props  */}
            <Form handleAddMovie={this.handleAddMovie.bind(this)} />

            {/* MOVIELIST/WATCHLIST COLUMN */}
             {/* the current MOVIES array from DB, handleViewMovie and Delete is sent down to the child as props */}
            <Movielist 
              movies={this.state.movies} 
              handleViewMovie={this.handleViewMovie.bind(this)} 
              handleDeleteMovie={this.handleDeleteMovie.bind(this)} />

            {/* MOVIE INFORMATION */}
              {/* the current MOVIE (just one) that is clicked on in movielist is passed down, and methods for viewing and editing movie goes into this component */}
            <Movieinfo 
              movie={this.state.movie} 
              handleViewMovie={this.handleViewMovie.bind(this)} 
              handleEditMovie={this.handleEditMovie.bind(this)} />

          </div>
        </div>
      </section>

    );
  }
}