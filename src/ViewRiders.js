import React , {Component ,useState} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { Offline, Online , Detector} from "react-detect-offline";
import Switch from "react-switch";
import StarRatings from 'react-star-ratings';
import Content from './Content';

import axios from 'axios';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';
import { Button, Form,FormText, Col, Row, Label,Dropdown,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
const url = "https://livrito.herokuapp.com/ryderupdatestatus";

class ViewRiders extends Component
{
   state = {
   currency: '',
   dropDownOpen: '',
};


  state = {
  Items:[],
  newOrderModal: false,
  vehiclemodal:false,
  
    vehicle_type:'',
    manufacturer_name:'',
    model_name:'',
    model_year:'',
    vehicle_number:'',
    name:'',
    
     
       editData:
       {
         _id: '',
         status:'',
          name:'',
               gender:'',
               email:'',
               password:'',
               contact:'',
               image_path:'',

       },
       

 };
apiUsers = [];
    

 constructor() {
   super();
   this.getItems();
     this.handleDeleteRow = this.handleDeleteRow.bind(this);
 
 }
 toggle = () => {
    this.setState({
       dropDownOpen: !this.state.dropDownOpen,
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
 

handleChange = (event) => {
    this.setState({
        [event.target.status]:event.target.value
    })
    this.setState({ [event.target.name]:event.target.value})
    this.setState({ [event.target.gender]:event.target.value})
    this.setState({ [event.target.email]:event.target.value})
    this.setState({ [event.target.password]:event.target.value})
    this.setState({ [event.target.contact]:event.target.value})

}
 handleSelectChange = (event) => {
    this.setState({
      result: event.target.value
    })
  }

  

   viewdetails()
{

  // this.setState({
  //   newOrderModal: true
  // }) 
  
}
 toggleNewOrders()
{

  this.setState({
    newOrderModal: true
  }) 
  
}
  togglevehicles(name, vehicle_type, manufacturer_name, model_name, model_year, vehicle_number) {

    this.setState({
      vehiclemodal: true,
      name:name,
      vehicle_type:vehicle_type,
      manufacturer_name:manufacturer_name,
      model_name:model_name,
      model_year:model_year,
      vehicle_number: vehicle_number,
    })

  }

 
 editOrder(_id, status , name ,email, password , contact , gender)
 {
   console.log(status ,  name ,email, password , contact , gender)
   this.setState ({
     editData: {_id , status , name ,email, password , contact , gender} , newOrderModal: !this.state.newOrderModal
   })

   
 }
 
 deletenow(_id)
 {
console.log(_id);

if (window.confirm('Sure to Delete?')) {

const url = "https://livrito.herokuapp.com/removecourier";
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
      url:'https://livrito.herokuapp.com/ryders' 
    }).then(({ data}) =>
   {
     console.log(data.ryders)
 this.apiUsers =  data.ryders;
    this.setState({Items: data.ryders})

   })
}catch(err)
    {
      console.log(err)
    }
 }
 
 handleClose = () => {
    this.setState({ newOrderModal: false })
     this.setState({vehiclemodal : false })
}
  handleChange(checked) {
    this.setState({ checked });
  }
  async updateOrder()
 {
  let {status ,  name ,email, password , contact , gender} = this.state.editData;
console.log(" _id : " +  this.state.editData._id)
console.log(" status: " + this.state.editData.status)

 

  
   let turl = 'https://livrito.herokuapp.com/ryderupdatestatus';

fetch(turl, { method: 'POST', 
body: JSON.stringify({
   _id:  this.state.editData._id, 
status:this.state.editData.status, 


}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
     if(data.success == true)
      {
    window.location.reload(true)
    alert('status updated successfully');
      }
      
})
.catch(error => console.error('Error:', error))

 }
  pendingHandler(e)
{
  console.log(e.target.value);

        let newArray = this.apiUsers.filter((d)=>{
        
            let clickValue = d.status.toLowerCase();
            return clickValue.indexOf(e.target.value) !== -1;
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
        
            let clickValue = d.status.toLowerCase();
            return clickValue.indexOf(e.target.value) !== -1;
        });
        console.log(newArray)
        this.setState({
            Items:newArray
})
}

 
 
  
  


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
          <Sidebar/> <div class="content-wrapper"><section class="content-header"> <div class="container-fluid">  <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Couriers Table</h1>
          </div>
          <div class="col-sm-6"> <ol class="breadcrumb float-sm-right"><li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Couriers Table</li>
               
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
               <button type = "submit"  value={this.state.value}   class = "btn btn-info" onClick = {this.pendingHandler.bind(this)} style= {{float:'right', marginLeft:2}} >All<i class="fas fa-check-circle"></i></button>
                   <button type="submit" value= "approved"   class = "btn btn-success" onClick = {this.pendingHandler.bind(this)} style= {{float:'right', marginLeft:2}} >Approved<i class="fas fa-check-circle"></i></button> 
              <button type = "submit" value= "pending"   class = "btn btn-info" onClick = {this.pendingHandler.bind(this)} style= {{float:'right', marginLeft:2}} >Pending <i class="fas fa-pause-circle"></i></button> 
              <button type = "submit"   value= "rejected" class = "btn btn-info btn-danger"  onClick = {this.pendingHandler.bind(this)} style= {{float:'right', marginLeft:2}} >Rejected<i class="fas fa-ban"></i></button> </h3>
              
               {/* <Link to = "/addrider">  <input type="submit" value="Add Courier"  class="btn btn-success"  style = {{ float: 'right' ,color: '#fff'}}/></Link> */}
              
               <Input type="text"  value={this.state.value}  placeholder="Search for..."  onChange={this.onChangeHandler.bind(this)} style = {{float:'right' , width:'20%' , marginRight:5}} />
             
                 <Modal isOpen={this.state.vehiclemodal} onClick={this.handleClose} >
                   <ModalHeader style={{ background: 'green', color: '#fff' }} ><p style={{ color: '#fff' }}>View Vehicle Details</p> </ModalHeader>
                   <ModalBody>
                     <Label> Name </Label>
                     <FormGroup>

                       <Input type="text" value={this.state.name} onChange={(e) => {
                         let { editData } = this.state;
                         editData.name = e.target.value;
                         this.setState({ editData })
                       }} placeholder="Name" /></FormGroup>
                     <Label>Vehicle Type</Label>
                      <FormGroup>
                       <Input type="text" value={this.state.vehicle_type} onChange={(e) => {
                         let { editData } = this.state;
                         editData.vehicle_type = e.target.value;
                         this.setState({ editData })
                       }} placeholder="Vehicle Type" />
                     </FormGroup>
                     <Label> Vehicle Number </Label>
                     <FormGroup>
                       <Input type="text" value={this.state.vehicle_number} onChange={(e) => {
                         let { editData } = this.state;
                         editData.vehicle_number = e.target.value;
                         this.setState({ editData })
                       }} placeholder="Vehicle Number" />
                     </FormGroup>
                     <Label>Model Name </Label>
                     <FormGroup>
                       <Input type="text" value={this.state.model_name} onChange={(e) => {
                         let { editData } = this.state;
                         editData.model_name = e.target.value;
                         this.setState({ editData })
                       }} placeholder="Model Name" />
                     </FormGroup>
                     <Label> Model Year </Label>
                     <FormGroup>
                       <Input type="number" value={this.state.model_year} onChange={(e) => {
                         let { editData } = this.state;
                         editData.model_year = e.target.value;
                         this.setState({ editData })
                       }} placeholder="Model Year" />
                     </FormGroup>
                     <Label> Manfacturer Name </Label>
                     <FormGroup>
                       <Input type="text" value={this.state.manufacturer_name} onChange={(e) => {
                         let { editData } = this.state;
                         editData.manufacturer_name = e.target.value;
                         this.setState({ editData })
                       }} placeholder="Manufacturer Name" />
                     </FormGroup>
                   

                   </ModalBody>
                   <ModalFooter>

                     <Button color="secondary" onClick={this.handleClose} >Cancel</Button>
                   </ModalFooter>
                 </Modal>


             
              <Button color="#fff" onClick={this.toggleNewOrders.bind(this)}></Button>
          <Modal isOpen={this.state.newOrderModal} toggle={this.toggleNewOrders.bind(this)} >
        <ModalHeader style = {{background:'green' , color:'#fff'}}  ><p style = {{color:'#fff'}}>Update Status </p> </ModalHeader>
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
               </div>
           <div className="row">
            <div className="col-12 table-responsive table-bordered">
              <table class="table table-bordered ">
                <thead>
                 
                <tr>
                  <th> Id</th>
                  <th>Name</th>
                  <th>Image</th>
                     <th>Email</th>
                     <th>telephone</th>
                     {/* <th>Documents</th> */}
                    
                     {/* <th>Rating  </th> */}
                      {/* <th>storage_price</th> */}
                       {/* <th>Password</th> */}
                     {/* <th>Rider Orders</th> */}

                  
                    
                    <th> Current Status </th>
                    
                     <th>Action </th>
                     <th>More </th>
                       <th>Delete </th>
                
                </tr>
                </thead>
                <tbody> 
               {
                  this.state.Items.map((item , i ) =>
                  <tr  key = {item._id} > 
                  <td hidden = "true">{item._id} </td>
                <td>{i+1}</td>
                  <td>{item.name}</td>
                   <td><img src = { item.image}  style = {{width:50 , height:50 }}/></td>
                    <td>{item.email}</td>
                     <td>{item.telephone }</td>
                      {/* <td><Link to = "docrider" ><i class="fas fa-file-invoice" style = {{color:'green'}}></i> </Link></td> */}
                     
                        {/* <td><StarRatings
          //rating={this.state.rating}
          starRatedColor= { 'green'}
          rating={2.5}
        starDimension="25px"
        starSpacing="15px"
         starHoverColor	= {'white'}
         // changeRating={this.changeRating}
          numberOfStars={1}
          starSpacing = {1}
          name='rating'

                      /> {item.rating} </td> */}
                       {/* <td>{item.my_rating}</td> */}
        {/* <td>{item.storage_price}</td> */}
         {/* <td>{item.password}</td> */}
        {/* <td><Link to = "riderorders"> View </Link>  </td> */}
       
       
        <td > <button class="btn btn-block btn-outline-success btn-sm" >{item.status} </button></td> 
               
 
                    <td style = {{display:'flex'}}>
                    
                     <button  type = "submit" class="btn btn-info btn-sm"  onClick ={this.editOrder.bind(this , item._id , item.status ,item.name ,item.email, item.password, item.contact , item.gender )}  >
                              <i class="far fa-edit" style ={{color:'#fff'}}   >
                              </i>
                            
                          </button>
                          {/* <button class="btn btn-block btn-outline-success btn-sm" >Details </button> */}
                           </td> 
                           
                            <td>
                        <Link
                         to={{
    pathname: "userdetails",
    itemdata: item // your data array of objects
  }}
                      
                         
                         >
                        <button type="submit" class="btn btn-block btn-outline-success btn-sm" 
                        
                        onClick={
                          this.viewdetails.bind(this, item)}  >
                        
                      <i class="fas fa-info-circle"  style={{ color: 'green' }}> Details </i>
                          
                        </button>
                      </Link>

                     

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
       
      </div>
    
    </section>
    
  </div>
  <Footer/>
  </div>
                
  );
  }
}
export default ViewRiders