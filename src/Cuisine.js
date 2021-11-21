import React, {Component } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Button, Label,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Header from './Header';
import {Link , BrowserRouter,Redirect} from 'react-router-dom';
import axios from 'axios';
import Switch from "react-switch";
class Cuisine  extends Component
{
   state = {
  Items:[],
  newOrderModal: false,
     
       editData:
       {
         id: '',
         status:'',
        menu_name:'',
        

       }
 };

 constructor() {
   super();
   this.getItems();
     this.handleDeleteRow = this.handleDeleteRow.bind(this);
 
    
 }
handleDeleteRow(i) {
    let Items = [...this.state.Items]
    Items.splice(i, 1)
    this.setState({ 
      Items: Items
    })
  }
  handleClose = () => {
    this.setState({ newOrderModal: false })
}

  getItems = async () =>
    {
      try{

      

    let data = await axios({
      method: 'get' ,
      url:'https://livrito.herokuapp.com/menu/5e8d28f8b1a88f4c8886d28b/' 
    }).then(({ data}) =>
    data);
    console.log(data.menus)
    this.setState({Items: data.menus})
    }catch(err)
    {
      console.log(err)
    }
 }
 toggleNewOrders()
{

  this.setState({
    newOrderModal: true
  }) 
}
 
 editOrder(_id, status , menu_name)
 {
   console.log(status)
   this.setState ({
     editData: {_id , status , menu_name} , newOrderModal: !this.state.newOrderModal
   })
 }

 updateOrder()
 {
  

   let {status , menu_name} = this.state.editData;

    
   console.log(" _id : " +  this.state.editData._id)
console.log(" status: " + this.state.editData.status)
console.log(" cuisine: " + this.state.editData.menu_name)





const url = "https://livrito.herokuapp.com/updateorderstatus";
const data = { _id: this.state.editData._id, 
status:this.state.editData.status, 
menu_name:this.state.editData.menu_name, 

  }
fetch(url, { method: 'POST', 
body: JSON.stringify({
   _id:  this.state.editData._id, 
status:this.state.editData.status, 
menu_name:this.state.editData.menu_name, 
}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
// window.location.href = '/cuisine'

   this.props.history.push('/cuisine');
   

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
         <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>cuisine Table</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">cuisine Table</li>
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
              <h3 class="card-title">cuisine Details</h3>
            <Link to = "addcuisine" > <input type = "submit"  style = {{ float: 'right' ,color: '#fff'}} class="btn btn-success" value = "Add cuisine"/></Link>
            <Button color="#fff" onClick={this.toggleNewOrders.bind(this)}></Button>
      <Modal isOpen={this.state.newOrderModal} toggle={this.toggleNewOrders.bind(this)} >
        <ModalHeader toggle={this.toggleNewOrders.bind(this)}>Edit Cuisine </ModalHeader>
        <ModalBody>
        
        <FormGroup>
         <Input type="text" value ={ this.state.editData.menu_name} onChange = {(e) =>{
          let {editData} = this.state;
          editData.menu_name = e.target.value;
          this.setState({editData})
        }} placeholder="Cuisine Name" /></FormGroup>
       <FormGroup>   <Label>Status </Label>
         <div>
      <select value ={ this.state.editData.status} onChange = {(e) =>{
          let {editData} = this.state;
          editData.status = e.target.value;
          this.setState({editData})
        }}>
          <option  onChange = {(e) =>{
          let {editData} = this.state;
          editData.status = e.target.value;
          this.setState({editData})
        }}>Available</option>
          <option >Not available</option>
         
      </select>
      
      </div>
     
      </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateOrder.bind(this)}>Update</Button>
          <Button color="secondary" onClick = {this.handleClose} >Cancel</Button>
        </ModalFooter>
      </Modal>
            </div>
           
            <div class="card-body">
              <table id="" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>No</th>
                 
                  <th>Menu Name</th>
                   <th>Cuisine Name</th>
                   <th>Description</th>
                 <th>Cuisine Image </th>
                  <th>Price</th>
                     
                   <th>Action</th>
                  
                </tr>
                </thead>
                <tbody>
                
              
           {
             this.state.Items.map((item , i) =>
            <tr className="trow" key = {i} > 
                <td>{item.res_id.name}</td>
               
                  
                  <td> {item.name} </td>
                  <td> {item.menu_name} </td>
                  <td> {item.description} </td>
                  <td><img src = {item.image_path_one} style = {{width:80 , height: 80}} /> </td>
                  <td> {item.price} </td>
                  
                  
                  
                
                  <td>

                          <a class="btn btn-info btn-sm"  onClick ={this.editOrder.bind(this , item._id , item.status , item.menu_name)} >
                              <i class="fas fa-edit" style = {{color:'#fff'}}  >
                              </i>
                            
                          </a>
                          <a class="btn btn-danger btn-sm" href="#" onClick={i => this.handleDeleteRow(i)}>
                             <i class="far fa-window-close">
                              </i>
                             
                          </a>
                      </td>
                </tr>
                 )
                }
            
               
              
               
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
export default Cuisine;