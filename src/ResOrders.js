import React, {Component } from 'react';
import Sidebar from './Sidebar';
import { Button, Label,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import axios from 'axios';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import {Link , BrowserRouter} from 'react-router-dom';

class ResOrders  extends Component
{
  state = {
       Items : [],
      
       newOrderModal: false,
     
       editData:
       {
         id: '',
         status:'',

       }
      
    };
    
  constructor() {
    super()
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
 
  
 getItems = async () =>
    {
      try{

      

  let data =   await axios({
      method: 'get' ,
      url:'http://www.cinemahd-apk.com:3005/resorder/5e8d28f8b1a88f4c8886d28b' 
    }).
    then(({ data}) =>
    data);
    console.log(data.order)
    this.setState({Items: data.order})
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
 
 editOrder(_id, status)
 {
   console.log(status)
   this.setState ({
     editData: {_id , status} , newOrderModal: !this.state.newOrderModal
   })
 }

 updateOrder()
 {
  

   let {status} = this.state.editData;

    console.log('id is'+this.state.editData._id)

   console.log(" _id : " +  this.state.editData._id)
console.log(" status: " + this.state.editData.status)





const url = "http://www.cinemahd-apk.com:3005/updateorderstatus";
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
// window.location.href = '/resorders'

   this.props.history.push('/resorders');
   

 }
 handleClose = () => {
    this.setState({ newOrderModal: false })
}
  
  render()
  {
  
 
  
  return(
      <div class="wrapper">
      <Header/>
      <Sidebar/>
        
            
 <div class="content-wrapper">
         <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1></h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Order Table</li>
             
      <Button color="#fff" onClick={this.toggleNewOrders.bind(this)}></Button>
      <Modal isOpen={this.state.newOrderModal}  toggle={this.toggleNewOrders.bind(this)} >
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
              <h3 class="card-title">Order Table
              </h3>
               <Link to = "/resturanttable" > <input type = "submit"  style = {{ float: 'right' ,color: '#fff', }} class="btn btn-info" value = "Back"/></Link> 
            </div>
           
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>Id</th>
                  <th>Person Name</th>
                 <th>Address</th>
                 <th>Contact</th>
                  <th> Total Bill </th>
                  
                  
                   <th>Discount</th>
                    <th>Assigned To</th>
                   <th>Total Ride</th>
                    
                     <th>Current Status </th>
                     <th> Update Status </th>
                  
                  
                   
                </tr>
                </thead>
                <tbody>
              
                    {
                this.state.Items.map((item , i) =>
            <tr className="trow" key = {item._id}> <td  hidden = "true">{item._id }</td>
            <td>{i}</td>
            
            <td>  {item.name} 
        </td>     <td> {item.address} </td>  
         <td> {item.cell} </td>  
         <td> {item.total_bill} </td>
         <td>{item.discount}</td> 
         
    
         <td>{item.assigned_to} </td> 
         <td>{item.ride_total}  </td>
        
         <td> <button class="btn btn-block btn-outline-success btn-sm"> {item.status} </button></td>
         <td> <button type = "submit"  class="btn btn-block btn-outline-success btn-sm"  onClick ={this.editOrder.bind(this , item._id , item.status)} >Update</button>
        
          </td>
       
                                </tr>
                               ) }
                     
                   
                 
                
         
               
             
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
export default ResOrders;