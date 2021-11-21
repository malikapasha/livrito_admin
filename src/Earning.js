import React   , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import {Link , BrowserRouter,Redirect} from 'react-router-dom';
import axios from 'axios';

 class Earning extends Component
{
  constructor(props){
    super(props)
    this.state = {
      file: "assets/dist/img/im.jpg"
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
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
        <div class="wrapper" >
        <Header/>
        <Sidebar/>
          <div class="content-wrapper" style = {{background:'#fff'}}>
   
    <section class="content-header" >
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-12">
            <h1>Resturant Earning Report</h1>
          </div>
          <div class="col-sm-12">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Add Menu </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
         <div class="card card-default">
          <div class="card-header">
             <div class="col-12 col-md-8">
                   
                    <nav class="navbar navbar-expand navbar-white navbar-light">
                     
                      <ul class="navbar-nav">
                        <li class="nav-item">
                          <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
                        </li>
                        <li class="nav-item d-none d-sm-inline-block">
                          <a href="#" class="nav-link">Today</a>
                        </li>
                        <li class="nav-item d-none d-sm-inline-block">
                          <a href="#" class="nav-link">Yesterday</a>
                        </li>
                        <li class="nav-item d-none d-sm-inline-block">
                          <a href="#" class="nav-link">This Week</a>
                        </li>
                         <li class="nav-item d-none d-sm-inline-block">
                          <a href="#" class="nav-link">This Month</a>
                        </li>
                        <li class="nav-item d-none d-sm-inline-block">
                          <a href="#" class="nav-link">Last Month</a>
                        </li>
                        <li class="nav-item d-none d-sm-inline-block">
                          <a href="#" class="nav-link">This Year</a>
                        </li>
                        <li class="nav-item d-none d-sm-inline-block">
                          <a href="#" class="nav-link">Last Year</a>
                        </li>
                      </ul>
                     
                    </nav>
</div>
            <div class="card-tools">
              <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
              <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-remove"></i></button>
            </div>
          </div>
         
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                 <div class="form-group">
              
                  <select class="form-control select2bs4"  style= {{width: '100%'}}>
                    <option selected="selected">Select Driver</option>
                    <option>A</option>
                    <option>B</option>
                   
                  </select>
                
                </div>
            
              <div class="form-group">
                  <label>Date range:</label>

                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="far fa-calendar-alt"></i>
                      </span>
                    </div>
                    <input type="text" class="form-control float-right" id="reservation" />
                  </div>
                 
                </div>
         
             
              </div>
            
              <div class="col-md-6">
             
                 <div class="form-group">
                  
                  <select class="form-control select2bs4"  style= {{width: '100%'}}>
                    <option selected="selected">Select Driver Payment Status</option>
                    <option>A</option>
                    <option>B</option>
                   
                  </select>
                </div>
              
                <div class="form-group">
                
                  <select class="form-control select2bs4"  style= {{width: '100%'}}>
                    <option selected="selected">Select Customer</option>
                     <option>A</option>
                    <option>B</option>
                   
                  </select>
                </div>
              <div class="form-group">
                 
                  <select class="form-control select2bs4"  style= {{width: '100%'}}>
                    <option selected="selected">Select Store</option>
                     <option>A</option>
                    <option>B</option>
                   
                  </select>
                </div>
                
              </div>
              
         
            </div>
           
          </div>
         
          <div class="col-12">
          
        <div class="btn-group" style = {{float:'right' , padding:5, margin:5}}>
        <form class="form-inline ml-3">
      <div class="input-group input-group-sm">
        <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>

                        <button type="button" class="btn btn-default">Clear</button>
                        
                      </div>
                    
        </div>
        </div>
          <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                <th><input type="checkbox" value="" name="todo1" id="todoCheck1"/></th>
                  <th>Driver & Store Payment Status</th>
                  <th>Customer Name</th>
                  <th>Driver Name</th>
                      <th>Store Name</th>
                      <th>Order Date</th>
                      <th>Order Id</th>
                      <th>Product Amount</th>
                     <th>Store Offer </th>
                      <th>Store Package&Charges </th>
                       <th>Admin Charge </th>
                         <th>Delivery Charges </th>
                         <th>Tax</th>
                         <th>Store&Earning</th>
                          <th>PayToDeliver</th>
                           <th>Collect From Driver</th>
                            <th>User Pay</th>
                 
                 
                   
                    
                
                </tr>
                </thead>
                <tbody>
                
              
             
               
              

              
              
               
                </tbody>
                <tfoot>
                <tr>
                <td >
            
                  </td>
                </tr>
                </tfoot>
              </table>
            </div>
</div>
       
  </div>
    );
  }
  
}
export default Earning
 