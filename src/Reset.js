import {BrowserRouter , Link} from 'react-router-dom';
import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import StarRatings from 'react-star-ratings';
import Switch from "react-switch";



class Reset extends Component
{
    render(){

    return(
      <div className = "hold-transition login-page"  style = {{ "background-image" : "url('assets/dist/img/ff.jpg')" , "width":
"100%" , "Height": "100%"}} >

<div class="login-box">
  <div class="login-logo">
   
  </div>
 
  <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">You are only one step a way from your new password, recover your password now.</p>

      <form action="login.html" method="post">
        <div class="input-group mb-3">
          <input type="password" class="form-control" placeholder="Password" />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" placeholder="Confirm Password"/>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button type="submit" class="btn btn-primary btn-block">Change password</button>
          </div>
        
        </div>
      </form>
      <div class="col-12" style = {{marginTop:10}}>
          <Link to ="/login">  <button type="submit" class="btn btn-primary btn-block">Login</button></Link>
          </div>

    
    </div>
    
  </div>
  </div>
</div>
    )
    }}
    export default Reset