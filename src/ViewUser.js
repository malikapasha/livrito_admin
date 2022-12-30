import React , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import axios from 'axios';
import { Button, Label,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';

class  ViewUser extends Component
{
  state = {
  Items:[],
    newOrderModal: false,
  newOrderModal: false,
     
       editData:
       {
         name:'',
          email:'',
          contact:'',
         id: '',
         status: '',
        

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
      url:'http://www.cinemahd-apk.com:3005/allusers' 
    }).then(({ data}) =>
    data);
    console.log(data.users)
    this.setState({Items: data.users})
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
 
deletenow(_id)
 {
console.log(_id);

if (window.confirm('Sure to Delete?')) {

const url = "http://www.cinemahd-apk.com:3005/removeuser/";
fetch(url, { method: 'POST', 
body: JSON.stringify({
   _id:  _id, 
}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
      window.location.reload()
    
      
})
.catch(error => console.error('Error:', error))
 console.log('Thing was saved to the database.');
} else {
  // Do nothing!
  console.log('Thing was not saved to the database.');
}
 }

  editOrder(id, status)
 {
    console.log(id);
    console.log(status);
   this.setState ({
     editData: { id, status} , newOrderModal: !this.state.newOrderModal
   })
 }

 updateOrder()
 {
  

  //  let {id , email, contact} = this.state.editData;

    
   console.log(" _id : " +  this.state.editData.id);


   const url = "http://www.cinemahd-apk.com:3005/updateuserstatus";
   const data = {
     _id: this.state.editData.id, 
status:this.state.editData.status, 

  }
fetch(url, { method: 'POST', 
body: JSON.stringify({
  _id: this.state.editData.id,
  status: this.state.editData.status, 

}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => 
  {
  console.log('Success:', response.status);

  if(response.status)
  {
    window.location.reload();
  }
  //  this.props.history.push('/viewuser');
  });
// window.location.href = '/viewuser'
   
  
 }
 
  
  handleClose = () => {
    this.setState({ newOrderModal: false })
}

//   editOrder(_id, status)
//  {
//    console.log(status)
//    this.setState ({
//      editData: {_id , status} , newOrderModal: !this.state.newOrderModal
//    })
//  }

  render()
  {
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

     <Modal isOpen={this.state.newOrderModal} toggle={this.handleClose.bind(this)} >
        <ModalHeader  style = {{background:'green' , color:'#fff'}} ><p style = {{color:'#fff'}}> Update User Status</p> </ModalHeader>
        <ModalBody>
        
        <FormGroup>
          <Label>Status </Label>
         <div>
      <select style = {{width:'70%' , padding:8, height:'80%' , borderRadius:'15' ,}}  value ={ this.state.editData.status} onChange = {(e) =>{
          let {editData} = this.state;
          editData.status = e.target.value;
          this.setState({editData})
        }}>
          <option  onChange = {(e) =>{
          let {editData} = this.state;
          editData.status = e.target.value;
          this.setState({editData})
        }}>pending</option>
          <option >approved</option>
          <option >rejected</option>
          
      </select>
      
      </div>
     
      </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.updateOrder.bind(this)}>Update</Button>
          <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
        </ModalFooter>
      </Modal>

 <div class="content-wrapper">
         <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1><b>User</b></h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Users Table</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            {/* <div class="card-header">
              <h3 class="card-title">View Users</h3>
              <Link to = "/adduser" style = {{ float: 'right' ,color: '#28a745'}}><input type = "submit" value = "Add New User" class="btn btn-success" /></Link>
             
            
            </div> */}
           
            <div class="card-body">
              <table class="table table-bordered table-hover">
                <thead>
                <tr>
                  {/* <th> User Id</th> */}
                  <th>User Name</th>
                  
                  <th>Email</th>
                  
                 
                       <th>Status</th>

                       <th>Action</th>
                   
                     <th>Delete</th>

                </tr>
                </thead>
                <tbody>
                {
                  this.state.Items.map((item , i) =>
            <tr className="trow" key = {i} > 
            <td hidden = "true">{item._id}</td>
                {/* <td>{item._id}</td> */}

                  <td>{item.name} </td>
                  <td>
                 {item.email}
                   </td>
                
                 <td>
                {item.status}
                 </td>
                 
                 <td>
                        <button type="submit" style={{ float: 'right', marginLeft: 2 }} class="btn btn-block btn-outline-success btn-sm" onClick={this.editOrder.bind(this, item._id, item.status)} >Update Status</button>
                 </td>
                
                <td>
                    <button  class="btn btn-info btn-sm"
  style={{marginLeft:5}}
   onClick ={this.deletenow.bind(this , item._id)} >
                              <i class="fa fa-trash">
                              </i>
                            
                          </button>
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
export default ViewUser