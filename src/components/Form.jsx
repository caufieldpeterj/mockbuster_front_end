// == COMPONENTS == //
import React, { Component } from 'react'


// == CONNECTION TO DB -- Needed to Push Form== //
let baseURL = 'https://mockbusters.herokuapp.com'
/*
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://mockbusters.herokuapp.com'
}
*/

class Form extends Component {
  constructor(props) {
    super(props)
    // == Set State for OMDB API (movie, baseURL, query, etc), Movie Inputs to push to DB == //
    this.state = {
      movies: [],
      title: '',
      director: '',
      year: '',
      platform: '',
      description: '',
      image: '',
      baseURL: 'https://www.omdbapi.com/?',
      apikey: 'apikey=98e3fb1f',
      query: '&t=',
      movieTitle: '',
      searchURL: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOmdbSubmit = this.handleOmdbSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  // == Submitting the request for OMDB movie info based off of search, then add to state == // 
  handleOmdbSubmit(event) {
    event.preventDefault()
    this.setState({
      searchURL: this.state.baseURL + this.state.apikey + this.state.query + this.state.movieTitle
    }, () => {
      fetch(this.state.searchURL)
        .then(response => {
          return response.json()
        }).then(json => this.setState({
          movie: json,
          movieTitle: '',
          title: json.Title,
          director: json.Director,
          year: '',
          platform: json.Type,
          description: json.Plot,
          image: json.Poster
        }),
          err => console.log(err))
    })
  }


  // == Submit either OMDB of Custom Movie Info in Form to DB, reset state == // 
  handleSubmit(event) {
    event.preventDefault()
    console.log("Submit Button Pressed")

    // Take object and convert it into a string, so mongo can read it 
    fetch(baseURL + '/mockbuster', {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        director: this.state.director,
        year: this.state.year,
        platform: this.state.platform,
        description: this.state.description,
        image: this.state.image
      }),
      headers: {
        'Content-Type': 'application/json'
      }

      //A promise that takes the props and envokes the "handleAddBookmark" method found in app.js
    }).then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        this.props.handleAddMovie(resJson)
        this.setState({
          title: '',
          director: '',
          year: 0,
          platform: '',
          description: '',
          image: ''
        })
      }).then(
        console.log("this then statement")
        // this.props.history.push('/');


      ).catch(error => console.log({ 'Error': error }))
  }

  render() {
    return (
      <div className="movieForm column m-2 p-4 is-warning">

        <h1 className="is-size-3 has-text-link has-background-warning has-text-centered mt-3 mr-3 ml-3 p-2 is-uppercase has-text-weight-bold	">Add Movie Or TV Show</h1>


        {/* ==== OMDB SUBMIT FORM ==== */}
        <div className="column">
          <h3 className="is-size-6 has-text-link mb-2 ">Search for a movie on OMDB</h3>

          <form onSubmit={this.handleOmdbSubmit}>
            <div className="field has-addons is-12 mb-2">
              <p className="control has-icons-left has-icons-right is-expanded">

                <div className="control is-expanded">

                  <input className="input is-large is-info" type="text" placeholder="Search Movie" onChange={this.handleChange} id="movieTitle" name="movieTitle" value={this.state.movieTitle} />
                  <span className="icon is-large is-left">
                    <i className="fab fa-imdb" />
                  </span>
                </div>
              </p>

              <div className="control">
                <button className="button is-link has-background-link is-large" type="submit" value='Find Movie Info'>Find Movie</button>

              </div>
            </div>
          </form>
        </div>

        {/* ==== CUSTOM MOVIE SUBMIT FORM WHICH AUTOPOPULATES IF OMDB SEARCH IS USED ==== */}
        <form onSubmit={this.handleSubmit}>
          
          {/* TITLE */}
          <div className="column mb-2">
            <h3 className="is-size-6 has-text-link mb-2 ">Add your own movie or use autopopulated OMDB Data</h3>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <div className="control">
                  <input className="input is-large" type="text" placeholder="Title" onChange={this.handleChange} id="title" name="title" value={this.state.title} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-film" />
                  </span>
                </div>
              </p>
            </div>
          </div>

          {/* DIRECTOR */}
          <div className="column mb-2">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <div className="control">
                  <input className="input is-large" type="text" placeholder="Director" onChange={this.handleChange} id="director" name="director" value={this.state.director} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-female" />
                  </span>
                </div>
              </p>
            </div>
          </div>

          {/* YEAR */}
          <div className="column mb-2">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <div className="control">
                  <input className="input is-large" type="text" placeholder="Year" onChange={this.handleChange} id="year" name="year" value={this.state.year} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-calendar" />
                  </span>
                </div>
              </p>
            </div>
          </div>


          {/* Description */}
          <div className="column mb-2">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <div className="control">
                  <input className="input is-large" type="text" placeholder="Description" onChange={this.handleChange} id="description" name="description" value={this.state.description} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-book-reader" />
                  </span>
                </div>
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="column mb-2">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <div className="control">
                  <input className="input is-large" type="text" placeholder="Image (URL)" onChange={this.handleChange} id="image" name="image" value={this.state.image} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-align-center" />
                  </span>
                </div>
              </p>
            </div>
          </div>


          {/* Platform */}
          <div className="column">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <div className="control">
                  <input className="input is-large" type="text" placeholder="Where to Watch" onChange={this.handleChange} id="platform" name="platform" value={this.state.platform} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-play-circle" />
                  </span>
                </div>
              </p>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="column mb-2">
            <button className="button is-link is-fullwidth is-medium mt-1" type="submit">Add Movie</button>
          </div>
        </form>
      </div>
    )
  }
}


export default Form;