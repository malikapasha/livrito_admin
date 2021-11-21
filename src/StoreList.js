import React , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { Button, Label,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Switch from "react-switch";
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import Content from './Content';
import {Link , BrowserRouter, Redirect} from 'react-router-dom';
class StoreList extends Component
{
  state = {
  Items:[],
  newOrderModal: false,
       editData:
       {
         id: '',
         name:'',
          email:'',
          contact:'',
          address:'',
          password:'',
          city:'',
          image_path:'',
          is_deleted:'',
       }
}
apiUsers = [];
    
 constructor() {
   super();
   this.getItems();
     this.handleDeleteRow = this.handleDeleteRow.bind(this);

      this.filterbyid = this.filterbyid.bind(this);

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
      url:'https://livrito.herokuapp.com/stores' 
    }).then(({ data}) =>
    data);
    console.log( data)
    
    this.apiUsers =  data.stores;
    this.setState({Items: data.stores})

     if(localStorage.getItem('searchid') !== 'empty')
    {
      this.filterbyid(localStorage.getItem('searchid') );
    }

    }catch(err)
    {
      console.log(err)
    }
 }

  filterbyid(searchid) {
    console.log(searchid);
        let newArray = this.apiUsers.filter((d)=>{
          console.log(d)
            let searchValue = d._id.toLowerCase();
          return searchValue.indexOf(searchid) !== -1;
        });
        console.log(newArray)
        this.setState({
            Items:newArray
        })
    }
    
 onChangeHandler(e) {
        console.log(e.target.value);
        let newArray = this.apiUsers.filter((d)=>{
          console.log(d)
            let searchValue = d.name.toLowerCase();
            return searchValue.indexOf(e.target.value) !== -1;
        });
        console.log(newArray)
        this.setState({
            Items:newArray
        })
    }
  pendingHandler(e)
{
  console.log(e.target.value);

        let newArray = this.apiUsers.filter((d)=>{
        
            let clickValue = d.is_deleted.toLowerCase();
            return clickValue.indexOf(e.target.value) !== -1;
        });
        console.log(newArray)
        this.setState({
            Items:newArray
})
}

 toggleNewOrders()
{
  this.setState({
    newOrderModal: true
  }) 
}
 editOrder(_id,  name,
          email,
          contact,
          address,
          password,
          city,
         is_deleted, )
 {
   console.log(name,
          email,
          contact,
          address,
          password,
          city,
           is_deleted,)
   this.setState ({
     editData: {_id  , name,
          email,
          contact,
          address,
          password,
          city,
          is_deleted , } , newOrderModal: !this.state.newOrderModal
   })
 }
  editproduccts(_id, storename)
 {
    console.log(storename);
    localStorage.setItem('storen', storename);
    localStorage.setItem('storeid', _id);
    //  window.location.href = '/productview'

    this.props.history.push('/productview');
 }

  deletenow(_id)
 {
console.log(_id);

if (window.confirm('Sure to Delete?')) {

const url = "https://livrito.herokuapp.com/removestore/";
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

 updateOrder()
 {
   let {_id ,  name,
          email,
          contact,
          address,
          password,
          city, is_deleted ,
           } = this.state.editData;
   console.log(" _id : " +  this.state.editData._id)
console.log(" status " + this.state.editData.is_deleted )
console.log(" name" + this.state.editData.name )
console.log(" email" + this.state.editData.email)
console.log(" contact" + this.state.editData.contact)
console.log(" address" + this.state.editData.address)
console.log(" password" + this.state.editData.password)
console.log(" city" + this.state.editData.city)

   const url = "https://livrito.herokuapp.com/storeupdatestatus";
const data = {
  
  storeid: this.state.editData._id, 
  status:this.state.editData.is_deleted, 


  }
fetch(url, { method: 'POST', 
body: JSON.stringify({
   storeid:  this.state.editData._id, 
  status:this.state.editData.is_deleted,
}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      console.log(data)
      if(data.success === true)
      {
//  window.location.href = '/storelist'
        // this.props.history.push('/storelist');

        window.location.reload(true);
      }
})
.catch(error => console.error('Error:', error))
 }
  render()
  {

    if (localStorage.getItem("admin") !== "true") {
       return <Redirect to="/" />;
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
          <div class="col-sm-10">
            <h1><b> Store</b></h1>
          </div>
          <div class="col-sm-12">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Store Table</li>
                 <Button color="#fff" onClick={this.toggleNewOrders.bind(this)}></Button>
      <Modal isOpen={this.state.newOrderModal} toggle={this.toggleNewOrders.bind(this)} >
        <ModalHeader style = {{background:'green' , color:'#fff'}} ><p style = {{color:'#fff'}}> Update Store Status</p> </ModalHeader>
        <ModalBody>
        {/* <Label>Name</Label>
         <FormGroup>
        
      <Input type = "text" value ={ this.state.editData.name} onChange = {(e) =>{
          let {editData} = this.state;
          editData.name = e.target.value;
          this.setState({editData})
        }}/> */}
        
      {/* </FormGroup>
      <Label>Email</Label>
       <FormGroup>
        
      <Input type = "email" value ={ this.state.editData.email} onChange = {(e) =>{
          let {editData} = this.state;
          editData.email = e.target.value;
          this.setState({editData})
        }}/>
        
      </FormGroup> */}

      {/* <Label>Contact</Label>
       <FormGroup>
        
      <Input type = "text" value ={ this.state.editData.contact} onChange = {(e) =>{
          let {editData} = this.state;
          editData.contact = e.target.value;
          this.setState({editData})
        }}/>
        
      </FormGroup>
      <Label>Address</Label>
       <FormGroup>
        
      <Input type = "text" value ={ this.state.editData.address} onChange = {(e) =>{
          let {editData} = this.state;
          editData.address = e.target.value;
          this.setState({editData})
        }}/>
        
      </FormGroup> */}
      {/* <Label>Password</Label> */}
      {/* <FormGroup>
        
      <Input type = "text" value ={ this.state.editData.password} onChange = {(e) =>{
          let {editData} = this.state;
          editData.password = e.target.value;
          this.setState({editData})
        }}/>
        
      </FormGroup> */}
      {/* <Label>City</Label>
       <FormGroup>
        
      <Input type = "text" value ={ this.state.editData.city} onChange = {(e) =>{
          let {editData} = this.state;
          editData.city = e.target.value;
          this.setState({editData})
        }}/>
        
      </FormGroup> */}
        <Label>Status</Label>
         <FormGroup>
          <div>
      <select style = {{width:'70%' , padding:8, height:'80%' , borderRadius:'15' ,}}  value ={ this.state.editData.is_deleted} onChange = {(e) =>{
          let {editData} = this.state;
          editData.is_deleted = e.target.value;
          this.setState({editData})
        }}>
         <option >pending</option>
          <option >approved</option>
          <option >rejected</option>
          
      </select>
      
      </div></FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.updateOrder.bind(this)}>Update Status</Button>
          <Button color="secondary" onClick = {this.handleClose} >Cancel</Button>
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
              <h3 class="card-title"> 
                   <button type="submit"  class = "btn  btn-info" onClick = {this.pendingHandler.bind(this)}  style= {{float:'right', marginLeft:2}} ><i class="fas fa-list"></i> All</button> 
                   <button type="submit" value="approved"  class = "btn  btn-success"  onClick = {this.pendingHandler.bind(this)} style= {{float:'right', marginLeft:2}} >Accepted<i class="fas fa-check-circle"></i></button> 
              <button type = "submit" value= "pending"   class = "btn btn-secondary" onClick = {this.pendingHandler.bind(this)} style= {{float:'right', marginLeft:2}} >Pending <i class="fas fa-pause-circle"></i></button> 
                   <button type="submit" value="rejected"  class="btn btn-info btn-danger" onClick={this.pendingHandler.bind(this)} style= {{float:'right', marginLeft:2}} >Rejected<i class="fas fa-ban"></i></button> </h3>
             
              <Link to = "/addstore" > <input type = "submit"  style = {{ float: 'right' ,color: '#fff'}} class="btn btn-success" value = "Add Store"/></Link>
                 <Input type="text"  value={this.state.value}  placeholder="Search for..."  onChange={this.onChangeHandler.bind(this)} style = {{float:'right' , width:'20%' , marginRight:5}} />
            </div>
            <div class="card-body">
              <table  class="table table-bordered table-striped">
                <thead>
                 <tr>
                  {/* <th>ID</th> */}
                  <th>Store Name</th>
                    {/* <th>Image</th> */}
                  <th>Products</th>
                  <th>Email</th>
                  {/* <th>Company Name</th> */}
                  <th>City</th>
                  {/* <th>Contact</th> */}
                    {/* <th>Password</th> */}
                  <th>Status</th>
                  <th>Action</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                  this.state.Items.map(( item ,i) =>
                <tr key = {item._id}     >
                
                  {/* <td>{item._id }</td> */}
                  <td>{ item.name} 
      </td>
                  {/* <td><img src = {item.id_image} style = {{width:50 , height:50}}  /> </td> */}
                 <td>  
                
                 <Input type = "submit" onClick ={this.editproduccts.bind(this , item._id ,item.name )} class = "btn btn-info btn-success" value = " View Products" />        
                   
                 
                              </td>
                  <td>{item.email}</td>
                  {/* <td>{item.home_address} </td> */}
                    <td> {item.city_name} </td>
                  {/* <td>{item.contact}</td> */}
                   {/* <td>{item.password}</td> */}
                   <td>{item.status}</td>
                  <td style = {{display:'flex'}}> 
                 
           <button class = "btn btn-info btn-success" onClick ={this.editOrder.bind(this , item._id , item.name ,item.email, item.contact, item.address , item.password  , item.city, item.is_deleted)}>        
  <i class="fas fa-edit" >
                              </i>
                              </button>
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
export default  StoreList