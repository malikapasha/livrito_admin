import React, { Component } from 'react';
import { BrowserRouter, Link, Redirect} from 'react-router-dom';
import { Offline, Online , Detector} from "react-detect-offline";
import Sidebar from './Sidebar';
import Header from './Header';
import { Button, Label,  Modal,Form,FormText, Col, Row, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Footer from './Footer';
import Switch from 'react-switch';
import axios from './axios';
import StarRatings from 'react-star-ratings';


  
class ResturantTable extends Component
{
 
  state = {
  Items:[],
    newOrderModal: false,
     
     newInfoModel:false,
       editData:
       {
         _id: '',
         status:'',
        


       } ,
 newData:
 {
 name:'',
     
        address:'',
        city:'', 
        contact:'' ,
        email:'',
        password:'',
        open_at:'',
        close_at:'',
        is_online:'',
 }
      
 };
 apiUsers =[];
 
constructor() {
   super();
   this.getItems();
     this.handleDeleteRow = this.handleDeleteRow.bind(this);

    this.handleChange = this.handleChange.bind(this);
    
  this.filterbyid = this.filterbyid.bind(this);
    
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
          console.log(d)
         
            let clickValue = d.status.toLowerCase();
            return clickValue.indexOf(e.target.value) !== -1;
        });
        console.log(newArray)
        this.setState({
            Items:newArray
})
}

  handleChange(checked) {
   
 this.setState({ checked   });
    
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
    {
console.log(data.restaurants)
 this.apiUsers =  data.restaurants;
    this.setState({Items: data.restaurants})
    })

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

handleClose = () => {
    this.setState({ newOrderModal: false })
     this.setState({resOrderModal : false })
}
closeRes = () =>
{
  this.setState({newInfoModal : false })
}
 

 
 
 
editproduccts(_id, name)
 {
    console.log(name);
    localStorage.setItem('resid', _id);
    localStorage.setItem('resname', name );

    
    //  window.location.href = '/menutable'

  this.props.history.push('/menutable');
 }
 toggleNewOrders()
{

  this.setState({
    newOrderModal: true
  }) 
}
toggleResOrders()
{

  this.setState({
    newInfoModal: true
  }) 
}

 
editOrder(_id, status  )
 {
   console.log(status)
   this.setState ({
     editData: {_id, status  } , newOrderModal: !this.state.newOrderModal
   })
 }
 newOrder(status , name , address , city , contact, email , password , open_at , close_at , is_online )
 {
   console.log(status)
   this.setState ({
     newData: { name ,  address , city , contact, email , password , open_at , close_at , is_online } , newInfoModal: !this.state.newInfoModal
   })
 }

 async updateOrder()
 {
  

   let {status} = this.state.editData;
   let {name ,  address , city , contact, email , password , open_at , close_at , is_online } = this.state.newData;

  

   console.log(" _id : " +  this.state.editData._id)
console.log(" status: " + this.state.editData.status)





const url = "http://www.cinemahd-apk.com:3005/resupdatestatus";
const data = { _id: this.state.editData._id, 
status:this.state.editData.status, 



  }
  
                  
  
fetch(url, { method: 'POST', 
body: JSON.stringify({
   resid:  this.state.editData._id, 
status:this.state.editData.status,
 

}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
      if(data.success == true)

    {
      alert('updated successfully')
      window.location.reload(true)

    }
      
      
})
.catch(error => console.error('Error:', error))
 }
 
 
render(){
   
   if (localStorage.getItem("admin") !== "true") {
       return <Redirect to="/" />;
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
            <h1>Resturant Table</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Resturant Table</li>
              
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content">
     <Button color="#fff" onClick={this.toggleResOrders.bind(this)}></Button>
      <Modal isOpen={this.state.newInfoModal} onClick ={this.closeRes} >
        <ModalHeader style = {{background:'green' , color:'#fff'}}  toggle={this.toggleResOrders.bind(this)}><p style = {{color:'#fff'}} >View Details </p></ModalHeader>
        <ModalBody>
         
         <Label> Name </Label>
        <FormGroup>
       
         <Input type="text" value ={ this.state.newData.name} onChange = {(e) =>{
          let {newData} = this.state;
        newData.name = e.target.value;
          this.setState({newData})
        }} placeholder="Name" /></FormGroup>
    
          <Label> Address </Label>
        <FormGroup>
         <Input type="text" value ={ this.state.newData.address} onChange = {(e) =>{
          let {newData} = this.state;
          newData.address = e.target.value;
          this.setState({newData})
        }} placeholder="Address" />
        </FormGroup>
          <Label> City </Label>
        <FormGroup>
         <Input type="text" value ={ this.state.newData.city} onChange = {(e) =>{
          let {newData} = this.state;
          newData.city = e.target.value;
          this.setState({newData})
        }} placeholder="City" />
        </FormGroup>
          <Label>Email </Label>
        <FormGroup>
         <Input type="text" value ={ this.state.newData.email} onChange = {(e) =>{
          let {newData} = this.state;
          newData.email = e.target.value;
          this.setState({newData})
        }} placeholder="Email" />
        </FormGroup>
          {/* <Label> Password</Label>
        <FormGroup>
         <Input type="number" value ={ this.state.newData.password} onChange = {(e) =>{
          let {newData} = this.state;
          newData.password = e.target.value;
          this.setState({newData})
        }} placeholder="Password" />
        </FormGroup> */}
         <Label> Opening Time </Label>
         <FormGroup>
         <Input type="text" value ={ this.state.newData.open_at} onChange = {(e) =>{
          let {newData} = this.state;
          newData.open_at = e.target.value;
          this.setState({newData})
        }} placeholder="open at" />
        </FormGroup>
       <Label> Closing Time </Label>
        <FormGroup>
         <Input type="text" value ={ this.state.newData.close_at} onChange = {(e) =>{
          let {newData} = this.state;
          newData.close_at = e.target.value;
          this.setState({newData})
        }} placeholder="Time" />
        </FormGroup>
          <Label> Active/Inactive  </Label>
        <FormGroup>
         <Input type="text" value ={ this.state.newData.is_online} onChange = {(e) =>{
          let {newData} = this.state;
          newData.is_online = e.target.value;
          this.setState({newData})
        }} placeholder="Time" />
        </FormGroup>
         
          
        </ModalBody>
        <ModalFooter>
          
          <Button color="secondary" onClick = {this.closeRes} >Cancel</Button>
        </ModalFooter>
      </Modal>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                <button type = "submit" value = {this.state.value} onClick = {this.pendingHandler.bind(this)} class = "btn  btn-info btn-info"  style= {{float:'right', marginLeft:2}} >All<i class="fas fa-check-circle"></i></button> 
              <button type = "submit" value = "approved"  onClick = {this.pendingHandler.bind(this)} class = "btn  btn-success"  style= {{float:'right', marginLeft:2}} >Accepted<i class="fas fa-check-circle"></i></button> 
              <button type = "submit" value= "pending"   class = "btn btn-info" onClick = {this.pendingHandler.bind(this)} style= {{float:'right', marginLeft:2}} >Pending <i class="fas fa-pause-circle"></i></button> 
                      <button type="submit" value="rejected" onClick = {this.pendingHandler.bind(this)}  class = "btn btn-info btn-danger"  style= {{float:'right', marginLeft:2}} >Rejected<i class="fas fa-ban"></i></button> </h3>
                   <Button color="#fff" onClick={this.toggleNewOrders.bind(this)}></Button>
          <Modal isOpen={this.state.newOrderModal} toggle={this.toggleNewOrders.bind(this)} >
        <ModalHeader style = {{background:'green' , color:'#fff'}}  toggle={this.toggleNewOrders.bind(this)}> <p style = {{color:'#fff'}}>Update Status </p> </ModalHeader>
        <ModalBody>
       
        
       
     
        <FormGroup>
          <Label>Status </Label>
        
        <div>
      <select value ={ this.state.editData.status} onChange = {(e) =>{
          let {editData} = this.state;
          editData.status = e.target.value;
          this.setState({editData})
        }} style = {{width:'70%' , padding:8, height:'80%' , borderRadius:'15' ,}}>
        
          <option   onChange = {(e) =>{
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
              <Link to = "/resturantsignup"  class = "btn btn-info btn-danger"  style= {{float:'right', marginLeft:2}} ><i class="fas fa-plus-circle"></i></Link> 
            
                 <Input type="text"  value={this.state.value}  placeholder="Search for..."  onChange={this.onChangeHandler.bind(this)} style = {{float:'right' , width:'20%' , marginRight:5}} />
            </div>
           <div className="row">
            <div className="col-12 table-responsive table-bordered">
              <table  class="table table-bordered ">
                <thead>
                <tr>
                  <th>ID</th>
                  <th> Resturant Name</th>
                  <th> Resturant Image</th>
                  <th>Address</th>
                  <th>City</th>
                    <th> Products</th>
                  
                 
                  

                   {/* <th>Orders </th> */}
                  
                    {/* <th>Rating </th> */}

                    {/* <th>Active/Inactive</th> */}
                     <th>Status</th>
                     
                      
                      <th>Action</th>



                  
                </tr>
                </thead>
                <tbody>
                
                
               
                 {
                this.state.Items.map((item , i) =>
                <tr className="trow" key = {item._id}>
                 <td hidden = "true">{ item._id} {i}</td>
                    <td>{item._id}</td>
                   <td >
                 
                  
                       {item.name} 
                   
              
                 </td>
                 <td>
 <img src = {item.image_path} style = {{width:50, height:50 , margin:2}} />
                 </td>
                 
                  <td>
                 
            {/* {localStorage.setItem('saddress' , item.address )} */}
                    {item.address}
                   
                 
                 </td>
                 
                <td> {item.city} </td>
                  <td>
                   <Input type = "submit" onClick ={this.editproduccts.bind(this , item._id ,item.name )} class = "btn btn-info btn-success" value = " View" />  
                 </td>
                 
                  
                 
                 {/* <td><Link to ="/ordertable">View</Link></td> */}
                  
                  {/* <td> <Link to ="resturantrating"><StarRatings
          //rating={this.state.rating}
          starRatedColor= { 'green'}
          rating={2.5}
        starDimension="20px"
        starSpacing="2px"
         starHoverColor	= {'white'}
         // changeRating={this.changeRating}
          numberOfStars={1}
          starSpacing = {1}
          name='rating'
        /> 2.5 </Link></td> */}
                  {/* <td >{item.is_online}  */}
                  
       
         
        
         {/* </td> */}
                  
                  <td  > {item.status}   </td>
                  
        
                              
                             
              
                  
                 
               
                  
                     
                  
                  <td style = {{display:'flex' , margin:2}}> 
                 
          
                  <button class = "btn btn-info btn-success"   onClick ={this.editOrder.bind(this , item._id , item.status)}    >        
  <i class="fas fa-edit" >
                              </i>
                              </button>
                         
                  <button style = {{ marginLeft:2}} class = "btn btn-success"   onClick ={this.newOrder.bind(this , item._id , item.name , item.address , item.city , item.contact, item.email , item.password , item.open_at , item.close_at , item.is_online)}    >      <i class="fas fa-eye"></i>
                             </button>    </td>         
                              
                    
                          
                     
                               
              
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
       
      </div>
    
    </section>
    
</div>
  <Footer/>
  </div>
  );
    
}
}
export default ResturantTable