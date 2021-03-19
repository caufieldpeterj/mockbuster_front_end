import React, { Component } from 'react';


let baseURL = 'https://mockbusters.herokuapp.com'
/*
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://mockbusters.herokuapp.com'
}
*/

class Omdb extends Component {
  constructor (props) {
    super(props)
    this.state = {
      baseURL: 'http://www.omdbapi.com/?',
      apikey: 'apikey=' + '98e3fb1f',
      query: '&t=',
      movieTitle: '',
      searchURL: '', 
      title: '',
      director: '',
      year: 0,
      platform: '',
      description: '',
      image: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitMovieMongo = this.handleSubmitMovieMongo.bind(this)
  }
  handleChange (event) {
    this.setState({ [event.target.id]: event.target.value })
  }
  handleSubmit (event) {
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
        year: json.Year,
        platform: json.Type,
        description: json.Plot,
        image: json.Poster
      }), 
      err => console.log(err))
    })
  }


  handleSubmitMovieMongo(event) {
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









  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='movieTitle'>Title</label>
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

        {(this.state.movie)
          ? <form onSubmit={this.handleSubmitMovieMongo}>

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
          
          
          
          
          : ''
        }


      </div>
    )
  }


}

export default Omdb;