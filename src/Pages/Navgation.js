import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
 
class Navgation extends Component {
  
  render() { 
    return (
      <div className="hunter">
        <NavLink to="/home">Home</NavLink> &nbsp;|&nbsp;
        <NavLink to="/user">Users</NavLink> &nbsp;|&nbsp;
        <NavLink to="/post">Posts</NavLink> 
      </div>
    );
    
  }
}

export default Navgation;