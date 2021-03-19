import React, { Component } from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { Button, Navbar } from 'react-bulma-components'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'



class Nav extends Component {
  render() {
    return (

      <nav className="navbar is-warning">
        <div className="navbar-brand">
          <Link to="/">
            <figure className="image is-96x96 ml-3">
              <img src="https://iconape.com/wp-content/png_logo_vector/blockbuster-video-1.png" alt="bbuster" className="py-1 px-1 " />
              {/* ../img/Blockbuster_Video.png */}
              {/* https://iconape.com/wp-content/png_logo_vector/blockbuster-video-1.png */}
            </figure>
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">

    
              {/* <Link to="/signup">
                <a className="button is-link m-3">
                  <strong>Sign up</strong>
                </a>
              </Link>

              <Link to="/login">
                <a className="button is-info m-3">
                  Log in
                </a>
              </Link> */}
            </div>
          </div>
        </div>

        <Switch>

{/* //Pass Current State as Props to the Home Component */}
{/* HOME.JSX is the parent of the ADD A MOVIE/WATCHLIST/INFORMATION Containers */}
<Route path="/login" exact component={Login} />
<Route path="/signup" exact component={Signup} />
</Switch>
      </nav>
    )
  }
}


export default Nav;
