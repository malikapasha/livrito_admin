import React, { Component } from 'react';
import {BrowserRouter , Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import StarRatings from 'react-star-ratings';
import Switch from "react-switch";



class Orders extends Component
{
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(checked) {
    this.setState({ checked });
  }
  render(){
    return(
          <div class="wrapper">
          <Header/>
          <Sidebar/>
          
 <div class="content-wrapper">
         <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Order Table</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Order Table</li>
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
              <h3 class="card-title">Order List</h3>
              <div style = {{width:200 , float:'right' , fontWeight:'bold'}}>
              <h3 class="card-title">Filter By:</h3>
                 <select  name = "type" class="form-control">
                <option value="1">Date</option>
				
			      	<option value="2">Status</option>
              	{/* <option value="3">Resturant</option> */}
                	<option value="2">Client</option>
                  	<option value="2">Courier</option></select>  </div>             
               
            </div>
           
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>No</th>
                  <th> User Name</th>
                  <th>Orders</th>
                   
                     <th>Total Cost</th>
                   
                      <th>Status</th>
                     
                      <th>Details</th>



                  
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>xyz</td>
                  <td>Cuisine Name</td>
                  <td>..</td>
                   <td> <button type="button" class="btn btn-block btn-success btn-sm">Completed</button></td>
                  <td><Link to = "/ordertable">view details </Link></td>
                  
                  
                  
                  
                </tr>
               
                
               
            
               
              
                
                </tbody>
                <tfoot>
               
                
              
                </tfoot>
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
}
export default Orders