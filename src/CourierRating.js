import React, {Component } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import {Link , BrowserRouter,Redirect} from 'react-router-dom';
import StarRatings from 'react-star-ratings';
const CourierRating = () =>
{  
  if (localStorage.getItem('admin') !== 'true') {
    return <Redirect to='/' />
  }

  if (localStorage.getItem("loginstatus") !== "true") {
    return <Redirect to="/" />;
  }
    
  return(
     <div class="wrapper">
      <Header/>
      <Sidebar/>
 <div class="content-wrapper">
         <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Rating Table</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Courier Rating Table</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Courier Rating Table</h3>
               <Link to = "/viewriders" > <input type = "submit"  style = {{ float: 'right' ,color: '#fff', }} class="btn btn-info" value = "Back"/></Link> 
            </div>
           
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>No</th>
                  <th> User Name</th>
                  <th>Driver Name</th>
                  <th>Rating</th>
                  
                   
                   
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                 
                  <td>abc</td>
                   <td>abc </td>
                  <td> <StarRatings
          //rating={this.state.rating}
          starRatedColor= { 'yellow'}
          rating={2.403}
        starDimension="25px"
        starSpacing="15px"
         starHoverColor	= {'white'}
         // changeRating={this.changeRating}
          numberOfStars={2}
          starSpacing = {1}
          name='rating'
        /> 2.5</td>
                  
                  
                   
                </tr>
         
               
             
                </tbody>
                
              </table>
            </div>
           
          </div>
         
        </div>
       
      </div>
    
    </section>
    
</div>
  <Footer/>
  </div>


  );

}
export default CourierRating;