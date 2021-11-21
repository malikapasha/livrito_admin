import React, {Component } from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
 
return(

<nav className="main-header navbar navbar-expand navbar-white navbar-light">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars"></i></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <Link to ="/dashboard" className="nav-link">Home</Link>
      </li>
     
    </ul>
    
    <ul className="navbar-nav ml-auto">
     
      
    </ul>
  </nav>
      
);
   
}

export default Header;


