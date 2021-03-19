import React, { Component } from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Omdb from './Omdb'


// import { Field, Control, Label, Input, Textarea, Select, Checkbox, Radio, Help, InputFile } from 'react-bulma-components'

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
    this.state = {
      movies: [],
      title: '',
      director: '',
      year: '',
      platform: '',
      description: '',
      image: '',
      baseURL: 'http://www.omdbapi.com/?',
      apikey: 'apikey=' + '98e3fb1f',
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

  handleOmdbSubmit (event) {
    event.preventDefault()
    this.setState({
      searchURL: this.state.baseURL + this.state.apikey + this.state.query +  this.state.movieTitle
    }, () => {
      fetch(this.state.searchURL)
      .then(response => {
        return response.json()
      }).then(json => this.setState({
        movie: json,
        movieTitle:'',
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
      <div className="movieForm column m-2">
        
        <h1 className="is-size-4 has-text-link has-background-warning has-text-centered m-3 is-uppercase has-text-weight-bold	">Add a Movie</h1>

        <form onSubmit={this.handleOmdbSubmit}>
          <label htmlFor='movieTitle'>OMDB Title</label>
          <input
            id='movieTitle'
            type='text'
            value={this.state.movieTitle}
            onChange={this.handleChange}
          />
          <input
            type='submit'
            value='Find Movie Info'
          />
        </form>




        <form onSubmit={this.handleSubmit}>

        {/* TITLE */}
          <div className="column">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <div className="control">
                  <input className="input" type="text" placeholder="Title" onChange={this.handleChange} id="title" name="title" value={this.state.title} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-book-reader" />
                  </span>
                </div>
              </p>
            </div>
          </div>

          {/* DIRECTOR */}
          <div className="column">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <div className="control">
                  <input className="input" type="text" placeholder="Director" onChange={this.handleChange} id="director" name="director" value={this.state.director} />
                  <span className="icon is-small is-left">
                    <i className="fas fa-book-reader" />
                  </span>
                </div>
              </p>
            </div>
          </div>

      {/* YEAR */}
      <div className="column">
                  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                      <div className="control">
                        <input className="input" type="text" placeholder="Year" onChange={this.handleChange} id="year" name="year" value={this.state.year} />
                        <span className="icon is-small is-left">
                          <i className="fas fa-book-reader" />
                        </span>
                      </div>
                    </p>
                  </div>
                </div>


        {/* Description */}
        <div className="column">
                  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                      <div className="control">
                        <input className="input" type="text" placeholder="description" onChange={this.handleChange} id="description" name="description" value={this.state.description} />
                        <span className="icon is-small is-left">
                          <i className="fas fa-book-reader" />
                        </span>
                      </div>
                    </p>
                  </div>
                </div>

        {/* Image */}
        <div className="column">
                  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                      <div className="control">
                        <input className="input" type="text" placeholder="image" onChange={this.handleChange} id="image"  name="image" value={this.state.image} />
                        <span className="icon is-small is-left">
                          <i className="fas fa-book-reader" />
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
                        <input className="input" type="text" placeholder="platform" onChange={this.handleChange} id="platform"  name="platform" value={this.state.platform} />
                        <span className="icon is-small is-left">
                          <i className="fas fa-book-reader" />
                        </span>
                      </div>
                    </p>
                  </div>
                </div>
        
            {/* SUBMIT */}
            <div className="column">
              <button className="button is-link is-rounded mt-1" type="submit">Add Movie</button>
            </div>        
      </form>

      {/* <Omdb handleAddMovie={this.props.handleAddMovie.bind(this)}/> */}

      
      </div>
    )
  }
}


export default Form;