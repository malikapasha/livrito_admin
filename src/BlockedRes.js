import React, { Component } from 'react';
import {BrowserRouter , Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import StarRatings from 'react-star-ratings';
import Switch from "react-switch";



class BlockedRes extends Component
{
  
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
            <h1>Blocked Resturants Table</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Blocked Resturants Table</li>
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
              <h3 class="card-title">Blocked List</h3>
               
            </div>
           
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>No</th>
                  <th> Resturant Name</th>
                 
                   
                     
                      <th>Reason</th>
                       <th>Possibility to unblock</th>
                        <th>Action</th>



                  
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                   <td>...</td>
                    <td>...</td>
                     <td>...</td>
                 
                 
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
export default BlockedRes