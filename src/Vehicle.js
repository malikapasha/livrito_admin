import React , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Switch from "react-switch";
import StarRatings from 'react-star-ratings';
import { Button, Label,Dropdown,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Content from './Content';
import axios from 'axios';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';

class Vehicle extends Component
{
   
  state = {
  Items:[],
  
  id: '',
  newOrderModal: false,
     
       editData:
       {
         _id: '',
         name:'',
         vehicle_type:'',
         manufacturer_name:'',
         model_name:'',
         model_year:'',
         vehicle_number:'',
         status:'',

       }
 };

 constructor() {
   super();
   this.getItems();
     this.handleDeleteRow = this.handleDeleteRow.bind(this);
 
    
 }
 toggleNewOrders()
{

  this.setState({
    newOrderModal: true
  }) 
}
 
 editOrder(_id, name,
         vehicle_type,
         vehicle_number,
       
         model_name,
         model_year,
           manufacturer_name,
          status ,
         )
 {
   console.log(name,
         vehicle_type,
         vehicle_number,
       
         model_name,
         model_year,
           manufacturer_name,
          status)
   this.setState ({
     editData: {_id ,name,
         vehicle_type,
         vehicle_number,
       
         model_name,
         model_year,
           manufacturer_name,
          status ,} , newOrderModal: !this.state.newOrderModal
   })
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
      url:'http://www.cinemahd-apk.com:3005/ryders' 
    }).then(({ data}) =>
    data);
    console.log(data.ryders)
    this.setState({Items: data.ryders})
    }catch(err)
    {
      console.log(err)
    }
 }
 
  handleChange(checked) {
    this.setState({ checked });
  }
   updateOrder()
 {
  

   let { name,
         vehicle_type,
         vehicle_number,
       
         model_name,
         model_year,
           manufacturer_name,
          status ,} = this.state.editData;

   
   console.log(" _id : " +  this.state.editData._id)
console.log(" status: " + this.state.editData.status)
console.log(" name: " + this.state.editData.name)
console.log(" vehicle_type: " + this.state.editData.vehicle_type)
console.log(" manufacturer_name: " + this.state.editData.manufacturer_name)
console.log(" model_name: " + this.state.editData.model_name)
console.log(" model_year: " + this.state.editData.model_year)
console.log(" vehicle_number: " + this.state.editData.vehicle_number)





const url = "http://www.cinemahd-apk.com:3005/ryderupdatestatus";
const data = { _id: this.state.editData._id, 
status:this.state.editData.status, 
name: this.state.editData.name,
vehicle_type: this.state.editData.vehicle_type,
manufacturer_name: this.state.editData.manufacturer_name,
model_name: this.state.editData.model_name,
model_year: this.state.editData.model_year,
vehicle_number: this.state.editData.vehicle_number,



  }
fetch(url, { method: 'POST', 
body: JSON.stringify({
   _id:  this.state.editData._id, 
status:this.state.editData.status, 
name: this.state.editData.name,
vehicle_type: this.state.editData.vehicle_type,
manufacturer_name: this.state.editData.manufacturer_name,
model_name: this.state.editData.model_name,
model_year: this.state.editData.model_year,
vehicle_number: this.state.editData.vehicle_number,
}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
      if(data.success == true)
      {
     window.location.reload(true)
      }
    
      
})
.catch(error => console.error('Error:', error))

   

 }
  
  render()
  {

    //  if (localStorage.getItem('res') === 'true') {
    //      return <Redirect to='/' />
    // }


    //  if (localStorage.getItem('str') === 'true') {
    //      return <Redirect to='/' />
    // }

     if (localStorage.getItem("admin") !== "true") {
       return <Redirect to="/" />;
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
            <h1><b> Vehicle</b></h1>
          </div>
          <div class="col-sm-12">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Vehicle Table</li>
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
              <h3 class="card-title">Vehicle List</h3>
               <Link to = "/viewriders" > <input type = "submit"  style = {{ float: 'right' ,color: '#fff', marginRight:'10' }} class="btn btn-info" value = "Back"/></Link> 
                 {/* <Link to = "/addrider">  <input type="submit" value="Add New Vehicle"  class="btn btn-success"  style = {{ float: 'right' ,color: '#fff'}}/></Link> */}
            <Button color="#fff" onClick={this.toggleNewOrders.bind(this)}></Button>
      <Modal isOpen={this.state.newOrderModal} onClick ={this.handleClose} >
        <ModalHeader  style = {{background:'green' , color:'#fff'}} ><p style = {{color:'#fff'}}>View Vehicle Details</p> </ModalHeader>
        <ModalBody>
         <Label> Name </Label>
        <FormGroup>
       
         <Input type="text" value ={ this.state.editData.name} onChange = {(e) =>{
          let {editData} = this.state;
          editData.name = e.target.value;
          this.setState({editData})
        }} placeholder="Name" /></FormGroup>
      <Label>Vehicle Type</Label>
       <FormGroup>
        <div>
      <select value ={ this.state.editData.vehicle_type} onChange = {(e) =>{
          let {editData} = this.state;
          editData.vehicle_type = e.target.value;
          this.setState({editData})
        }}>
          <option  onChange = {(e) =>{
          let {editData} = this.state;
          editData.status = e.target.value;
          this.setState({editData})
        }}>Car</option>
          <option >Van</option>
          <option  >Motor Bike</option>
           <option  >Bi-Cycle</option>
      </select>
      
      </div>
        </FormGroup>
          <Label> Vehicle Number </Label>
        <FormGroup>
         <Input type="text" value ={ this.state.editData.vehicle_number} onChange = {(e) =>{
          let {editData} = this.state;
          editData.vehicle_number = e.target.value;
          this.setState({editData})
        }} placeholder="Vehicle Number" />
        </FormGroup>
          <Label>Model Name </Label>
        <FormGroup>
         <Input type="text" value ={ this.state.editData.model_name} onChange = {(e) =>{
          let {editData} = this.state;
          editData.model_name = e.target.value;
          this.setState({editData})
        }} placeholder="Model Name" />
        </FormGroup>
          <Label> Model Year </Label>
        <FormGroup>
         <Input type="number" value ={ this.state.editData.model_year} onChange = {(e) =>{
          let {editData} = this.state;
          editData.model_year = e.target.value;
          this.setState({editData})
        }} placeholder="Model Year" />
        </FormGroup>
         <Label> Manfacturer Name </Label>
         <FormGroup>
         <Input type="text" value ={ this.state.editData.manufacturer_name} onChange = {(e) =>{
          let {editData} = this.state;
          editData.manufacturer_name = e.target.value;
          this.setState({editData})
        }} placeholder="Manufacturer Name" />
        </FormGroup>
      <Label>Status</Label>
       <FormGroup>
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
        }}>approved</option>
          <option >rejected</option>
         
      </select>
      
      </div>
        </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          
          <Button color="secondary" onClick = {this.handleClose} >Cancel</Button>
        </ModalFooter>
      </Modal>
            
            </div>
           
            <div class="card-body">
              <table  class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>id</th>
                 <th> Rider Name </th>
                  <th>Vehicle Type</th>
                  <th>Manfacturer Name</th>
                  <th>Model Name</th>
                    <th>Model Year </th>
                     <th>Vehicle Number </th>
                      
                 <th>Status</th>
                 
                 
                    <th>Action</th>
                    
                
                </tr>
                </thead>
                <tbody>
                
              
               
                    {
                this.state.Items.map((item , i) =>
                
                <tr key = {i}>
                <td hidden = "true">{item._id} </td>
                <td>{i} </td>
                <td>{item.name}</td>
                  <td>{item.vehicle_type }</td>
                
                  
                   <td>{item.manufacturer_name }</td>
                   <td> {item.model_name}  </td>
                   <td> {item.model_year} </td>
                   <td> {item.vehicle_number} </td>
                    <td>{item.status}</td>
                   
                   <td> <div style = {{display:'flex'}} ><button onClick = {this.editOrder.bind(this , item._id ,  item.name , item.vehicle_type , item.vehicle_number, item.model_name , item.model_year   , item.manufacturer_name, item.status )}  class="btn btn-info btn-info"  >
                              <i class="far fa-edit"  >
                              </i>
                            
                          </button>
                          
                         <a class="btn btn-info btn-danger" onClick={i => this.handleDeleteRow(i)}>
                             <i class="fas fa-trash" style = {{ color:'#fff'}} ></i>
                    </a>
                    </div>
                      </td>
            
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
export default  Vehicle