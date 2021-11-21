import React , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';
import { Button, Form,FormText, Col, Row, Label,Dropdown,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Content from './Content';
import Footer from './Footer';
import {Link , BrowserRouter,Redirect} from 'react-router-dom';

class  DocRider extends Component
{
  state = {
  Items:[],
 
  newOrderModal: false,
  resOrderModal: false,
     
       editData:
       {
         _id: '',
         name:'',
         email:'',
         document_one:'',
         document_two:','

       },};
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
  toggle = () => {
    this.setState({
       dropDownOpen: !this.state.dropDownOpen,
    })
}

 toggleNewOrders()
{

  this.setState({
    newOrderModal: true
  }) 
  
}
handleClose = () => {
    this.setState({ newOrderModal: false })
     
}
editOrder(_id, name , email , contact , document_one , document_two)
 {
  
   this.setState ({
     editData: {_id, name , email , contact , document_one , document_two} , newOrderModal: !this.state.newOrderModal
   })
 }

 getItems = async () =>
    {
      try{

      

    let data = await axios({
      method: 'get' ,
      url:'https://livrito.herokuapp.com/ryders' 
    }).then(({ data}) =>
    data);
    console.log(data.ryders)
    this.setState({Items: data.ryders})
    }catch(err)
    {
      console.log(err)
    }
 }
  updateOrder()
 {
  

   let {_id, name , email , contact , document_one , document_two} = this.state.editData;

   

   console.log(" _id : " +  this.state.editData._id)
console.log(" name: " + this.state.editData.name)
console.log(" contact: " + this.state.editData.contact)
console.log(" email: " + this.state.editData.email)
console.log(" document: " + this.state.editData.document_one)
console.log(" document: " + this.state.editData.document_two)

 

const url = "https://livrito.herokuapp.com/ryderupdatestatus";
const data = { _id: this.state.editData._id, 
status:this.state.editData.status, 

  }
  
 

fetch(url, { method: 'POST', 
body: JSON.stringify({
   _id:  this.state.editData._id, 
   name:this.state.editData.name,
   contact:this.state.editData.contact,
   email:this.state.editData.email,
   document_one:this.state.editData.document_one,
   document_two:this.state.editData.document_two,




}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
   
// window.location.href = '/viewriders'
    this.props.history.push('/viewriders');
 }
  
 
  render()
  {
    if (localStorage.getItem('admin') !== 'true') {
      return <Redirect to='/' />
    }
 
    if (localStorage.getItem("loginstatus") !== "true") {
      return <Redirect to="/" />;
    }
    
 return (
  <div class="wrapper">
  <Header/>
  <Sidebar/>
 <div class="content-wrapper">
         <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1><b>Rider Documents</b></h1>
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
               <Link to = "/viewriders" > <input type = "submit"  style = {{ float: 'right' ,color: '#fff', }} class="btn btn-info" value = "Back"/></Link> 
              <Button color="#fff" onClick={this.toggleNewOrders.bind(this)}></Button>
      <Modal isOpen={this.state.newOrderModal} toggle={this.toggleNewOrders.bind(this)} >
        <ModalHeader toggle={this.toggleNewOrders.bind(this)}>Edit Documents </ModalHeader>
        <ModalBody>
        <Label> Courier Name</Label>
        <FormGroup>
      
         <Input type="text" value ={ this.state.editData.name} onChange = {(e) =>{
          let {editData} = this.state;
          editData.name = e.target.value;
          this.setState({editData})
        }}  /></FormGroup>
      <Label>Email</Label>
       <FormGroup>
         <Input type="text" value ={ this.state.editData.email} onChange = {(e) =>{
          let {editData} = this.state;
          editData.email = e.target.value;
          this.setState({editData})
        }}  />
        </FormGroup>
        <Label>Contact</Label>
         <FormGroup>
         <Input type="text" value ={ this.state.editData.contact} onChange = {(e) =>{
          let {editData} = this.state;
          editData.contact = e.target.value;
          this.setState({editData})
        }}  />
        </FormGroup>
        <Label>Document One</Label>
        <FormGroup>
         <Input type="file"  onChange = {(e) =>{
          let {editData} = this.state;
          editData.document_one = e.target.value;
          this.setState({editData})
        }}  />
        </FormGroup>
        <Label>Document Two</Label>
         <FormGroup>
         <Input type="file"  onChange = {(e) =>{
          let {editData} = this.state;
          editData.document_two = e.target.value;
          this.setState({editData})
        }}  />
        </FormGroup>
      
          
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.updateOrder.bind(this)}>Update Documents</Button>
          <Button color="secondary" onClick = {this.handleClose} >Cancel</Button>
        </ModalFooter>
      </Modal>
            </div>
           
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                 <th>Id </th>
                  <th>Courier Name</th>
                  <th>Document</th>
                  
                  <th>Email</th>
                  
                  <th>Contact</th>
                  <th>Action</th>
                   
                </tr>
                </thead>
                <tbody>
                
              {
                  this.state.Items.map((item , i) =>
            <tr className="trow" key = {i} > 
                <td>{i}</td>
                <td>{item.name} </td>
                 
                    <td><a href = "">{item.document_one}<br/> {item.document_two} </a> </td>
                  <td>
                 {item.email}
                   </td>
                
                 <td>
                {item.contact}
                 </td>
                 
                
                 <td>
                   <button  class="btn btn-info btn-sm" onClick ={this.editOrder.bind(this , item._id , item.name , item.email , item.contact , item.document_one,
                   item.document_two)} >
                              <i class="fas fa-edit">
                              </i>
                            
                          </button>
                          <a class="btn btn-danger btn-sm" href="#" onClick={i => this.handleDeleteRow(i)}>
                              <i class="fas fa-trash" >
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
export default DocRider