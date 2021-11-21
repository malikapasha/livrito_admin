import React   , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import {Link , BrowserRouter,Redirect} from 'react-router-dom';
import Switch from "react-switch";
import axios from 'axios';

 class Com extends Component
{ 
      
    render()
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
   
    <section class="content-header" >
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
           
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Commision Management</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

  
    <section class="content" >
      <div class="row">
        <div class="col-md-6" >
          <div class="card card-primary" >
            <div class="card-header" style = {{background: ' #28a745'}}   >
              <h3 class="card-title" >For Resturant</h3>

              <div class="card-tools" >
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i  class="fas fa-minus"></i></button>
              </div>
            </div>
            <div class="card-body">
             
              <div class="form-group">
                <label for="inputDescription">Resturant Commision(in %):</label>
               <input type="text" id="inputName" class="form-control" value = "10"/>
              </div>
                
               
 
<div class="col-12">
        
          
        <input type="submit" value="Validate" class="btn btn-success float-right"/>
        </div>
             
            </div>
         
          </div>
          
        
        
        
 
       
      
           
          
         
       
    
         
          </div>
          <div class="col-md-6" >
           <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Service  fee</h3>

              
            </div>
            <div class="card-body">
             
              <div class="form-group">
                <label for="inputDescription">Service Fee: </label>
               <input type="text" id="inputName" class="form-control" value = "10 DA"/>
              
              </div>
                 <div class="col-12">
       
        <input type="submit" value="Add" class="btn btn-success float-right"/>
        </div>
              </div>
            
          </div>
         
        </div>
        </div>
        
         <div class="row">
        <div class="col-md-6" >
          <div class="card card-primary" >
            <div class="card-header" style = {{background: ' #28a745'}}   >
              <h3 class="card-title" >For Courier</h3>

              <div class="card-tools" >
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i  class="fas fa-minus"></i></button>
              </div>
            </div>
            <div class="card-body">
             
              <div class="form-group">
                <label for="inputDescription">Resturant Commision(in %):</label>
               <input type="text" id="inputName" class="form-control" value = "10"/>
              </div>
               <div class="col-12">
      
        <input type="submit" value="Validate" class="btn btn-success float-right"/>
        </div>
             
            </div>
         
          </div>
          </div>
          
</div>
         
        
      
    </section>
   
  </div>
  
</div>
  
    );
     }
  
}
export default Com;