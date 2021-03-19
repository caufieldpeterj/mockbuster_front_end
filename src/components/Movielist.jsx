// == COMPONENTS == //
import React, { Component } from 'react'


class Movielist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    }
  }
  render() {
    return (
      <div className="movieList column is-3 m-2 p-4">
        <h1 className="is-size-3 has-text-link has-background-warning has-text-centered m-3 p-2 is-uppercase has-text-weight-bold	">Watch List</h1>

        {/* Render a Movie List based off MOVIES (plural) array sent from parent */}
        {
          this.props.movies.map(movie => {
            return (
              <div className="column mt-1" key={movie._id}>
                <div className="box" onClick={(e) => this.props.handleViewMovie(e, movie)}>

                  <div className="columns is-vcentered">

                    <div className="column is-10">
                      {movie.title}
                    </div>

                  {/* Delete A Movie Button which calls delete movie from parent */}
                    <div className="column is-2">
                      <button className="delete is-medium" type="submit" value="DELETE" onClick={(e) => { this.props.handleDeleteMovie(e, movie._id) }}></button>

                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}


export default Movielist;