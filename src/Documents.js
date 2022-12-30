import React, {Component } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import axios, { post } from 'axios';
import {Link , BrowserRouter,Redirect} from 'react-router-dom';


class Documents  extends Component
{   

 constructor() {
   super();
  
     this.handleDeleteRow = this.handleDeleteRow.bind(this);
 
    
 }
 state = {
  Items:[],
 };
 componentDidMount()
 {
 this.getItems();

 }
handleDeleteRow(i) {
    let Items = [...this.state.Items]
    Items.splice(i, 1)
    this.setState({ 
      Items: Items
    })
  }
  getItems = async () =>
    {
      try{

      

    let data = await axios({
      method: 'get' ,
      url:'http://www.cinemahd-apk.com:3005/restaurants' 
    }).then(({ data}) =>
    data);
    console.log(data.restaurants)
    this.setState({Items: data.restaurants})
    }catch(err)
    {
      console.log(err)
    }
 }
  
 
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
 <div class="content-wrapper" style = {{background:'white'}}>
      <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1><b>Resturants Documents</b></h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Documents Table</li>
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
              <h3 class="card-title">View Documents</h3>
              
            </div>
           
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                 <th>No</th>
                  <th>Resturants Name</th>
                  <th>Documents</th>
                  
                  
                 
                  <th>Action</th>
                   
                </tr>
                </thead>
                <tbody>
                
              {
                this.state.Items.map((item , i) =>
                <tr className="trow" key = {i}>
                 <td>{i}</td>
                <td>{item.name} </td>
                 
                    <td><a href = ""> {item.document_one} <br/> {item.document_two}</a> </td>
                
                 
                
                 <td>
                   <Link to = "/adduser"  class="btn btn-info btn-sm" >
                              <i class="fas fa-edit">
                              </i>
                            
                          </Link>
                          <a class="btn btn-danger btn-sm" href="#" onClick={i => this.handleDeleteRow(i)} >
                              <i class="fas fa-trash">
                              </i>
                             
                          </a>
                 </td>
                </tr>
                )
                 }
              

              
               
                </tbody>
                <tfoot>
                <tr>
                  <th ></th>
                  
                </tr>
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
export default Documents;