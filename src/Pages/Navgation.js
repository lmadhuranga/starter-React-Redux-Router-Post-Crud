import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {  appConfig  } from '../config/globel.conf'

class Navgation extends Component {
  
  render() { 
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">{appConfig.app.name}</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item ">
              <NavLink className="nav-link" to="/home">Home</NavLink> 
            </li>
            <li class="nav-item ">
              <NavLink className="nav-link" to="/user">Users</NavLink> 
            </li>
            <li class="nav-item ">
              <NavLink className="nav-link" to="/post">Posts</NavLink> 
            </li> 
          </ul>
        </div> 
      </nav>
    );
    
  }
}

export default Navgation;