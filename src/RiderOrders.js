
import React , {Component ,useState} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Switch from "react-switch";
import StarRatings from 'react-star-ratings';
import Content from './Content';

import axios from 'axios';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';
import { Button, Label,Dropdown,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

 class RiderOrders extends Component {
 
 
   state = {
   currency: '',
   dropDownOpen: '',
};

toggle = () => {
    this.setState({
       dropDownOpen: !this.state.dropDownOpen,
    })
}


handleChange = (event) => {
    this.setState({
        [event.target.status]:event.target.value
    })
}
  state = {
  Items:[],
  newOrderModal: false,
     
       editData:
       {
         _id: '',
         status:'',

       }
 };

    

 constructor() {
   super();
   this.getItems();
     this.handleDeleteRow = this.handleDeleteRow.bind(this);
 
 }
 handleSelectChange = (event) => {
    this.setState({
      result: event.target.value
    })
  }

 toggleNewOrders()
{

  this.setState({
    newOrderModal: true
  }) 
}
 
 editOrder(_id, status)
 {
   console.log(status)
   this.setState ({
     editData: {_id , status} , newOrderModal: !this.state.newOrderModal
   })
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
      url:'http://www.cinemahd-apk.com:3005/ryderorders/0' 
    }).then(({ data}) =>
    data);
    console.log(data.order)
    this.setState({Items: data.order})
    }catch(err)
    {
      console.log(err)
    }
 }
 
 handleClose = () => {
    this.setState({ newOrderModal: false })
}
  handleChange(checked) {
    this.setState({ checked });
  }
  updateOrder()
 {
  

   let {status} = this.state.editData;

    console.log('id is'+this.state.editData._id)

   console.log(" _id : " +  this.state.editData._id)
console.log(" status: " + this.state.editData.status)





const url = "http://www.cinemahd-apk.com:3005/ryderupdatestatus";
const data = { _id: this.state.editData._id, 
status:this.state.editData.status, 

  }
fetch(url, { method: 'POST', 
body: JSON.stringify({
   _id:  this.state.editData._id, 
status:this.state.editData.status, 
}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
   
window.location.href = '/riderorders'
 }
  render()
  {
    
    if (localStorage.getItem("admin") !== "true") {
      return <Redirect to='/' />
    }

    if (localStorage.getItem("loginstatus") !== "true") {
      return <Redirect to='/' />
    }

   
 return (
  <div class="wrapper">
  <Header/>
 <Sidebar/>
 <div class="content-wrapper">
         <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-10">
            <h1><b> Riders Orders</b></h1>
          </div>
          <div class="col-sm-12">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Rider Orders</li>

            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-22">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">View Riders Orders</h3>
               <Link to = "/viewriders" > <input type = "submit"  style = {{ float: 'right' ,color: '#fff', }} class="btn btn-info" value = "Back"/></Link> 

                
              <Button color="#fff" onClick={this.toggleNewOrders.bind(this)}></Button>
          <Modal isOpen={this.state.newOrderModal} toggle={this.toggleNewOrders.bind(this)} >
        <ModalHeader toggle={this.toggleNewOrders.bind(this)}>Update Status </ModalHeader>
        <ModalBody>
        
        <FormGroup>
          <Label>Status </Label>
        
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
        }}>Accepted</option>
          <option >Packed</option>
          <option  >Delivered</option>
      </select>
      
      </div>
     
       

      </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateOrder.bind(this)}>Update</Button>
          <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
            </div>
           
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th> Id</th>
                  <th>Name</th>
                  <th>cell</th>
                     <th>Address</th>
                     <th>Assigned To</th>
                     <th>Total Bill</th>
                     <th>Discount</th>
                     <th>Total Rides </th>
                    
                   
                   
           
                
                </tr>
                </thead>
                <tbody> 
               {
                  this.state.Items.map((item , i ) =>
                  <tr  key = {item._id} > 
                  <td hidden = "true">{item._id} </td>
                <td>{i}</td>
                  <td>{item.name}</td>
                   <td>{item.cell}</td>
                    <td>{item.address}</td>

                     <td>{item.assigned_to }</td>
                   
        <td>{item.total_bill}</td>
       <td>{item.discount}</td>
       <td>{item.ride_total} </td>
        
     
                
                  
                  
                                   
                  
                </tr>
                
               
               
              )}
                </tbody>
                
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
export default RiderOrders