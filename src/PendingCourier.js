import React, { Component } from 'react';
import {BrowserRouter , Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import StarRatings from 'react-star-ratings';
import Switch from "react-switch";



class PendingCourier extends Component
{
  
  constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        window.location.href = `mailto:${this.props.email}`;
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
            <h1>Pending courier </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Pending couriers</li>
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
              <h3 class="card-title">Pending couriers</h3>
               
            </div>
           
            <div class="card-body">
              <table id= "example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>No</th>
                  <th> courier Name</th>
                     <th>Email</th>
                     <th> SMS</th>
                     <th>Meeting Date</th>
                   
                     
                      <th>Action</th>



                  
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                   <td>1</td>
                    <td><button onClick={this.onClick}>Email</button></td>
                     <td>SMS</td>
                      <td>1</td>
                 
                 
                  <td>
                     <Link to = "/"  class="btn btn-info btn-sm" >
                              <i class="fas fa-edit">
                              </i>
                            
                          </Link>
                          <a class="btn btn-danger btn-sm" href="#">
                              <i class="fas fa-trash">
                              </i>
                             
                          </a>
                       
                          
                          </td>
                   
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
export default PendingCourier