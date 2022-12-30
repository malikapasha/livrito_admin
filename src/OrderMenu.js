import React   , {Component} from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import {AsyncStorage} from 'AsyncStorage';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';
import axios from 'axios';

class  OrderMenu extends Component
{
  
state = {
  Items:[],
}
 constructor() {
   super();
   this.getItems();
     this.handleDeleteRow = this.handleDeleteRow.bind(this);
 
    
 }
 invoice(id, name , quantity , price)
 {
    console.log(name);
    localStorage.setItem('pname', name);
   localStorage.setItem('pid', id);
    localStorage.setItem('price', price);
     
      localStorage.setItem('quantity', quantity);
    //  window.location.href = '/invoice'
   this.props.history.push('/invoice');
 
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
      url:'http://www.cinemahd-apk.com:3005/ordermenu/5eb6f9b4f8f8cb00171112b2' 
    }).then(({ data}) =>
    data);
    console.log(data.menu)
    this.setState({Items: data.menu})
    }catch(err)
    {
      console.log(err)
    }
 }



   
  
  render()
  {

     if (localStorage.getItem('res') !== 'true') {
        return <Redirect to='/' />
      }

    if (localStorage.getItem("loginstatus") !== "true") {
      return <Redirect to='/' />
    }

 return(
        <div className="wrapper">
        <Header/>
        <Sidebar/>
         <div class="content-wrapper">
         <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1><b>Order Menus</b></h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Order Menus</li>
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
              <h3 class="card-title">Order Menus</h3>
            <Link to = "/table1" > <input type = "submit"  style = {{ float: 'right' ,color: '#fff', marginLeft:10}} class="btn btn-info" value = "Back"/></Link>
             
        
            </div>
           
            <div class="card-body">
              <table  class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>No</th>
                  
                  <th>Name</th>
                  <th hidden = "true">Menu Id</th>
                    <th hidden = "true">Order Id</th>
                  <th>Image</th>
                    <th>Quantity</th>
                  
                  <th>Price</th>
                    <th>Action</th>
                  
                 
                   
                </tr>
                </thead>
                <tbody>
                {
                  this.state.Items.map((item , i) =>
            <tr className="trow" key = {i} > 
            <td hidden = "true">{item._id}</td>
                <td>{i}</td>

                  
                  
                    <td>{item.name} </td>
                      <td  hidden = "true">{item.menu_id} </td>
                       <td  hidden = "true">{item.order_id} </td>
                     
                      <td><img src = {item.image_path_one} style = {{width:100 , height:100}} /> </td>
                       <td>

                 {item.quantity}
                   </td>
                  <td>

                 {item.price}
                   </td>
                     <td>
                 <button  class="btn btn-info " onClick ={this.invoice.bind(this , item._id ,item.name , item.quantity , item.price )} >
                              <i class="far fa-folder">
                              </i>
                            
                          </button> </td>
                   
                
                 
                 
                
                 
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
export default OrderMenu
 