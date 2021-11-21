import React, { Component } from 'react';
import {BrowserRouter , Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import StarRatings from 'react-star-ratings';
import Switch from "react-switch";
import axios from 'axios';
import {EmailShareButton} from "react-share";


class PendingRes extends Component
{
  state = {
  Items:[],};
  constructor(props){
        super(props);
       
          this.getItems();
     this.handleDeleteRow = this.handleDeleteRow.bind(this);
 
    }
    
    sendEmail(message) {

    var email =  message.emailId;
    var subject = message.subject;
    var emailBody = 'Hi '+ message.from;
    document.location = "mailto:"+email+"?subject="+subject+"&body="+emailBody;
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
      url:'https://livrito.herokuapp.com/restaurants' 
    }).then(({ data}) =>
    data);
    console.log(data.restaurants)
    this.setState({Items: data.restaurants})
    }catch(err)
    {
      console.log(err)
    }
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
            <h1>Pending Resturant </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Pending Resturants</li>
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
              <h3 class="card-title">Pending Resturants</h3>
               
            </div>
           
            <div class="card-body">
              <table id= "example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>No</th>
                  <th> Resturant Name</th>
                     <th>Email</th>
                    
                     <th>Meeting Date</th>
                   
                     
                      <th>Action</th>



                  
                </tr>
                </thead>
                <tbody>
                {
                this.state.Items.map((item , i) =>
                <tr className="trow" key = {item._id}>
                 <td hidden = "true">{ item._id} {i}</td>
                  <td>{i}</td>
                   <td>{ item.name}</td>
                    <td><button class="emailReplyButton" onClick= {this.sendEmail}><i style = {{color:'red' }}class="far fa-envelope"></i></button>  {item.email}</td>
                     
                      <td>12-04-209</td>
                 
                 
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
                   
                </tr>)}
               
                
               
            
               
              
                
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


export default PendingRes
