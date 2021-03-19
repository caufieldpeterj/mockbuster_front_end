import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';

// == COMPONENTS == //
import Nav from './components/Nav'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'


// == CSS == //
import './App.css';


// == CONNECTION TO DB == //
let baseURL = 'https://mockbusters.herokuapp.com';
/*
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://mockbusters.herokuapp.com'
}
*/

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: []
    }
    this.getMovies = this.getMovies.bind(this);
  }

  componentDidMount() {
    this.getMovies()
  }

  // == FETCH MOVIES FROM MOCKBUSTER DB == //
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

// == Rendering Page Components including NavBar, Body, Footer == //
  render() {
    return (

      <div>
      {/* NAV BAR */}
        <Nav />

      {/* REACT ROUTES */}
        <Switch>

          {/* //Pass Current State as Props to the Home Component */}
          {/* HOME.JSX is the parent of the ADD A MOVIE/WATCHLIST/INFORMATION Containers */}
          <Route path="/" render={props => (<Home state={this.state} />)} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </Switch>

      {/* FOOTER */}
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <strong>Mockbuster</strong> by Eric Oeur, Robert "Rikk" Guest, and Peter Caufield for General Assembly SEI-119 Project 3.
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;