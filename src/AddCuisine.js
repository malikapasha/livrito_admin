import React   , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';
import axios from 'axios';

 class AddCuisine extends Component
{
  
  render()
  {
    if (localStorage.getItem('str') === 'true') {
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
            <h1>Add Cuisine</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Add Cuisine </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

  
    <section class="content" >
      <div class="row">
        <div class="col-md-10" >
          <div class="card card-primary" >
            <div class="card-header" style = {{background: ' #28a745'}}   >
              <h3 class="card-title" >Add Cuisine</h3>

              <div class="card-tools" >
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i  class="fas fa-minus"></i></button>
              </div>
            </div>
            <div class="card-body">
            
              <div class="form-group">
                <label for="inputDescription">Cuisine name</label>
               <input type="text" id="inputName" class="form-control"/>
              </div>
              <div class="form-group">
                <label for="inputDescription">Cuisine Description</label>
               <input type="text" id="inputName" class="form-control"/>
              </div>
             
             
            
              
              
              
              
                
                
              
             
              
                
               
                 <div class="form-group">
                <label for="inputClientCompany">Product Type</label>
                <select  name = "type" class="form-control">
                <option value="1">Regular Product</option>
				
				<option value="3">Category</option></select>
              </div>
               
             <div class="col-12">
           <Link to = "/cuisine"> <button class="btn btn-secondary">Cancel</button></Link>
        <Link to = "/cuisine"> <input type="submit" value="Add New Cuisine" class="btn btn-success float-right"/></Link>
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
export default AddCuisine
 