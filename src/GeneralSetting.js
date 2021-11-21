import React   , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import {Link , BrowserRouter, Redirect} from 'react-router-dom';
import Switch from "react-switch";
import axios from 'axios';

 class GeneralSetting extends Component
{ 
      constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(checked) {
    this.setState({ checked });
  }
    render()
    {
      if (localStorage.getItem('admin') !== 'true') {
        return <Redirect to='/' />
      }

      if (localStorage.getItem("loginstatus") !== "true") {
        return <Redirect to='/' />
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
            <h1>General Settings</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">General Setting </li>
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
              <h3 class="card-title" >General Settings</h3>

              <div class="card-tools" >
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i  class="fas fa-minus"></i></button>
              </div>
            </div>
            <div class="card-body">
             
              <div class="form-group">
                <label for="inputDescription">Resturant Search Radius(in KM):</label>
               <input type="text" id="inputName" class="form-control"/>
              </div>
               <div class="form-group">
                <label for="inputDescription">Driver Search Radius(in KM):</label>
               <input type="text" id="inputName" class="form-control"/>
              </div>
               <div class="form-group">
                <label for="inputDescription">Driver Accept Timeout(in Second):</label>
               <input type="text" id="inputName" class="form-control"/>
              </div>
               
 <div class="row mb-6">
                       <div class="form-group" >
                <label for="inputEstimatedBudget">Twilio Server Key</label>
                <input type="number" id="inputEstimatedBudget" class="form-control"  />
                <div class="form-group">
                <label for="inputEstimatedBudget">Twilio Auth Token</label>
                <input type="number" id="inputEstimatedBudget" class="form-control" />
              </div>
              </div>
              <div class="form-group" style = {{marginLeft: 15}}>
                <label for="inputEstimatedBudget">Twilio Verify Service Key</label>
                <input type="number" id="inputEstimatedBudget" class="form-control" />
                <div class="form-group">
                <label for="inputEstimatedBudget">Twilio Contact Number</label>
                <input type="number" id="inputEstimatedBudget" class="form-control" />
              </div>
              </div>

            </div>

              
             
             
               
                 
             <div class="col-12">
          <a href="#" class="btn btn-secondary">Cancel</a>
        <Link to = "/menutable"> <input type="submit" value="Save" class="btn btn-success float-right"/></Link>
        </div>
             
            </div>
         
          </div>
        
        
        
      </div> 
       
      <div class="col-md-6">
          <div class="card card-secondary">
    
      <div class="row">
        <div class="col-12">
         
             
             <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Vehicle Management</h3>

              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i class="fas fa-minus"></i></button>
              </div>
            </div>
          </div>
           
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>No</th>
                  <th>Resturant  Name</th>
                  <th>Vehicle Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                 
                   
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>Xyz</td>
                  <td>20%</td>
                    <td><Switch height = {20}
                     width = {30}
                     onChange={this.handleChange} checked={this.state.checked} /></td>
                 
                  
                  
                  <td>

                          <Link to = "/addpromos"  class="btn btn-info btn-sm" >
                              <i class="fas fa-file-signature"></i>
                          </Link>
                         
                            <a class="btn btn-danger btn-sm" href="#">
                              <i class="fas fa-trash">
                              </i>
                             
                          </a>
                      </td>
                      

                </tr>
                
                </tbody>
                
              </table>
            </div>
           
          
         
        </div>
       
      </div>
    
    
         
          </div>
         
        </div>
      </div>
      
    </section>
   
  </div>
  

  <footer class="main-footer">
    <div class="float-right d-none d-sm-block">
      <b>Version</b> 1.0.1
    </div>
    <b>Developed By:</b>
<strong>  <a href=""> Circular Byte</a>.</strong> All rights are reserved
  </footer>
  </div>
    );
     }
  
}
export default GeneralSetting