// == COMPONENTS == //
import React, { Component } from 'react'

// == Connection to DB Since we are making API calls == //
let baseURL = 'https://mockbusters.herokuapp.com'
/*
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://mockbusters.herokuapp.com'
}
*/

class Movieinfo extends Component {
  constructor(props) {
    super(props);
    // == Hold ONE MOVIE information and toggleEdit form boolean == //
    this.state = {
      movie: null,
      toggleEdit: false,
      title: '',
      director: '',
      year: 0,
      platform: '',
      description: '',
      image: ''
    }
    this.toggleForm = this.toggleForm.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  // == componentDidUpdate is used since we need the conditional if the movie is clicked on in the sibling component(Movie List). That onClick from movieList will send that information to the parent (via a bind) that there is ONE MOVIE in state, which is then passed down to the MovieINFO child component as props and can populate. Would run an error if mounted and didn't have a movie yet-- almost like a promise == //
  componentDidUpdate(movie) {
    if (this.props.movie && !this.state.movie) {
      this.setState({
        movie: this.props.movie,
        title: this.props.movie.title,
        director: this.props.movie.director,
        year: this.props.movie.year,
        platform: this.props.movie.platform,
        description: this.props.movie.description,
        image: this.props.movie.image
      })
    } else if (this.props.movie != this.state.movie) {
      this.setState({
        movie: this.props.movie,
        title: this.props.movie.title,
        director: this.props.movie.director,
        year: this.props.movie.year,
        platform: this.props.movie.platform,
        description: this.props.movie.description,
        image: this.props.movie.image
      })
    }
  }

  handleChange(event) {
    console.log(event.target.id);
    this.setState({ [event.target.id]: event.target.value })
  }

  // == FETCH ONE MOVIE FROM MONGODB NOT ARRAY OF MOVIES == // 
  getMovies() {
    fetch(baseURL + '/mockbuster/' + this.props.movie._id)
      .then(data => {
        return data.json()
      },
        err => console.log(err))
      .then(parsedData =>
        this.setState({
          movie: parsedData,
          title: parsedData.title,
          director: parsedData.director,
          year: parsedData.year,
          platform: parsedData.platform,
          description: parsedData.description,
          image: parsedData.image
        }),
        err => console.log(err))
  }

  // == Convert Updated fields into a string so it is readable by mongo == // 
  handleUpdate(id, e) {
    e.preventDefault()
    console.log("Update Button Pressed")
    this.toggleForm()

    // Take object and convert it into a string, so mongo can read it 
    fetch(baseURL + '/mockbuster/' + id, {
      method: 'PUT',
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

      //A promise that takes the props and envokes the "handleEdit" method found in home(parent) component
    }).then(res => res.json())
      .then(resJson => {
        this.props.handleEditMovie(e, resJson)
      }).catch(error => console.log({ 'Error': error }))
  }

  // == Method to Handle Toggle Form if the state of toggleEdit is true or false == //
  toggleForm() {
    console.log(this.state)
    this.setState(prevState => ({ toggleEdit: !prevState.toggleEdit }));
    console.log(this.state)
  }

  // == Here we are rendering the return of this component based on the conditional of if toggle form is FALSE or TRUE. If false, just show movie info, if true, show the edit form == // 
  render() {
    if (this.state.toggleEdit === false) {
      // == SINGLE MOVIE INFORMATION == //
      return (
        <div className="movieInfo column is-4 m-2 p-4">

          <h1 className="is-size-3 has-text-link has-background-warning has-text-centered m-3 p-2 is-uppercase has-text-weight-bold	"> Information</h1>

          <figure className="image image is-4by5 m-5">
            {this.props.movie ?
              <img src={this.props.movie.image} alt="Movie Poster" /> : null
            }
          </figure>

          <h2 className="is-size-5 has-text-weight-bold m-1">{this.props.movie ? this.state.title : null}</h2>
          <h2 className="is-size-6 is-italic ml-1">{this.props.movie ? this.state.director : null} {this.props.movie ? this.state.year : null}</h2>

          <p className="m-1">{this.props.movie ? this.state.description : null} <span className="is-size-6 is-italic has-text-weight-semibold">{this.props.movie ? "(" + this.state.platform + ")" : null}</span></p>

          {this.props.movie ? <button className="button is-danger is-medium mt-1 is-fullwidth" onClick={this.toggleForm}>Edit</button> : null}
        </div>
      )
    } else {
      // == EDIT MOVIE FORM == //
      return (
        <div className="movieInfo column is-4 m-2 p-4">
          <h1 className="is-size-3 has-text-link has-background-warning has-text-centered m-3 p-2 is-uppercase has-text-weight-bold		"> Edit Movie</h1>

          <form onSubmit={(e) => this.handleUpdate(this.state.movie._id, e)}>

            {/* TITLE */}
            <div className="column mb-2">
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <div className="control">
                    <input className="input is-large is-danger" type="text" placeholder="Title" onChange={this.handleChange} id="title" name="title" value={this.state.title} />
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
                    <input className="input is-large is-danger" type="text" placeholder="Director" onChange={this.handleChange} id="director" name="director" value={this.state.director} />
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
                    <input className="input is-large is-danger" type="text" placeholder="Year" onChange={this.handleChange} id="year" name="year" value={this.state.year} />
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
                    <input className="input is-large is-danger" type="text" placeholder="Description" onChange={this.handleChange} id="description" name="description" value={this.state.description} />
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
                    <input className="input is-large is-danger" type="text" placeholder="Image (URL)" onChange={this.handleChange} id="image" name="image" value={this.state.image} />
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
                    <input className="input is-large is-danger" type="text" placeholder="Where to Watch" onChange={this.handleChange} id="platform" name="platform" value={this.state.platform} />
                    <span className="icon is-small is-left">
                      <i className="fas fa-play-circle" />
                    </span>
                  </div>
                </p>
              </div>
            </div>
            {/* SUBMIT */}
            <div className="column">
              <button className="button is-danger is-medium mt-1 is-fullwidth" type="submit">Submit Edit</button>
            </div>
          </form>

          {/* TOGGLE FORM/MOVIE INFO  */}
          <div className="column">
            <button className="button is-link is-medium is-fullwidth" onClick={this.toggleForm}>Back to Movie Information</button>
          </div>
        </div>
      )
    }
  }
}

export default Movieinfo;