import React , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import { Button, Label,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Switch from "react-switch";
import { Link, BrowserRouter, Redirect} from 'react-router-dom';
import axios from 'axios';

class ViewPromo extends Component
{
  state = {
  Items:[],
  newOrderModal: false,
     
       editData:
       {
         _id:'',
        status:'',
        code:'',
        amount:'',
        minorder:'',
        maxorder:'',
        usagelimit:'',
        

       }
  }
    constructor(props) {
    super(props);
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

        //'https://livrito.herokuapp.com/promos';
        let theurl = 'https://livrito.herokuapp.com/respromos/' + localStorage.getItem("_id");
 let data = 'null';
      if(localStorage.getItem("admin") !== "true")
      {
        theurl = 'https://livrito.herokuapp.com/respromos/'+localStorage.getItem("_id");

         data = await axios({
      method: 'get' ,
      url:theurl 
    }).then(({ data}) =>
    data);
    console.log(data)
        this.setState({ Items: data.promos})
      }
else
    {
    //   data = await axios({
    //   method: 'get' ,   
    //   url:theurl 
    // }).then(({ data}) =>
    // data);
    // console.log(data)
    // this.setState({Items: data.data})

        data = await axios({
          method: 'get',
          url: theurl
        }).then(({ data }) =>
          data);
        console.log(data)
        this.setState({ Items: data.promos })
  }



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
 
 editOrder(_id, code , minorder ,  maxorder , amount , usagelimit , status )
 {
   console.log(code)
   this.setState ({
     editData: {_id, code , maxorder , amount ,minorder, status , usagelimit } , newOrderModal: !this.state.newOrderModal
   })
 }

 updateOrder()
 {
  

   let { code , maxorder , amount ,minorder,  usagelimit  , status ,} = this.state.editData;

    
   console.log(" _id : " +  this.state.editData._id)
console.log(" code: " + this.state.editData.code)
console.log(" max order " + this.state.editData.maxorder)
console.log(" min order " + this.state.editData.minorder)
console.log(" amount " + this.state.editData.amount)
console.log(" status " + this.state.editData.status)
console.log(" usagelimit" + this.state.editData.usagelimit)





const url = "https://livrito.herokuapp.com/updatepromo";
const data = { _id: this.state.editData._id, 
code:this.state.editData.code, 
 
minorder:this.state.editData.minorder, 
maxorder:this.state.editData.maxorder, 

amount:this.state.editData.amount,
usagelimit:this.state.editData.usagelimit,
status:this.state.editData.status,

  }
fetch(url, { method: 'POST', 
body: JSON.stringify({
   _id: this.state.editData._id, 
code:this.state.editData.code, 

minorder:this.state.editData.minorder, 
maxorder:this.state.editData.maxorder, 
amount:this.state.editData.amount,
usagelimit: this.state.editData.usagelimit,

status:this.state.editData.status,

}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
      if(data.success == true)
      {
        alert('status updated successfully')
     window.location.reload(true)

      }
    
      
})
.catch(error => console.error('Error:', error))

   

 }
 
  
  render(){

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
          <div class="col-sm-6">
            <h1><b>Promocode</b></h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Promo</li>
                <Button color="#fff" onClick={this.toggleNewOrders.bind(this)}></Button>
      <Modal isOpen={this.state.newOrderModal} toggle={this.toggleNewOrders.bind(this)}>
        <ModalHeader  style = {{background:'green' , color:'#fff'}} ><p style = {{color:'#fff'}}> Update Promo</p> </ModalHeader>
        <ModalBody>
        <Label  hidden = "true" >Promo Code </Label>
        <FormGroup   hidden = "true">
         <Input type="text"  value ={ this.state.editData.code} onChange = {(e) =>{
          let {editData} = this.state;
          editData.code = e.target.value;
          this.setState({editData})
        }}  /></FormGroup>
      <Label   hidden = "true">Minimum Order </Label>
       <FormGroup   hidden = "true">
         <Input type="text" value ={ this.state.editData.minorder} onChange = {(e) =>{
          let {editData} = this.state;
          editData.minorder = e.target.value;
          this.setState({editData})
        }}  />
        </FormGroup>
        <Label   hidden = "true">Maximum Order </Label>
         <FormGroup  hidden = "true">
         <Input type="text" value ={ this.state.editData.maxorder} onChange = {(e) =>{
          let {editData} = this.state;
          editData.maxorder = e.target.value;
          this.setState({editData})
        }}  />
        </FormGroup>
        <Label   hidden = "true">Amount </Label>
         <FormGroup   hidden= "true">
         <Input type="text" value ={ this.state.editData.amount} onChange = {(e) =>{
          let {editData} = this.state;
          editData.amount = e.target.value;
          this.setState({editData})
        }}  />
        </FormGroup>
        <Label   hidden = "true">Usage Limit</Label>
         <FormGroup  hidden = "true">
         <Input type="text" value ={ this.state.editData.usagelimit} onChange = {(e) =>{
          let {editData} = this.state;
          editData.usagelimit = e.target.value;
          this.setState({editData})
        }}  />
        </FormGroup>
        <Label>Status </Label>
        <FormGroup>

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
        }}>active</option>
          <option >expired</option>
          
      </select>
      
      </div>
      </FormGroup>
       
      
          
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.updateOrder.bind(this)}>Update Promo</Button>
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
          {/* {localStorage.getItem("admin") !== "true" ? ( */}
            <div class="card-header" >
              
              <Link to = "/addpromos" style = {{ color: ' #fff', float: 'right' , marginLeft:10}}><input type = "submit" value = "Add New Promo" class="btn btn-success"/></Link>
             
           
              <Link to = "/share" style = {{ marginRight:10,}} > <input type = "submit"   value="Sharing Gift"  class="btn btn-success float-right"/></Link>
            </div>
              {/* ) : null} */}

            <div class="card-body">
              <table  class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>No</th>
                  <th>Promocode</th>
                  
                  <th>Amount</th>
                  <th>Minimum Order</th>
                   <th>Maximum Order</th>
                     <th>Usage Limit </th>
                      <th>Status </th>
                    <th>Action</th>
                  
                  
                   
                </tr>
                </thead>
                <tbody>
                {
                  this.state.Items.map((item , i) =>
            <tr className="trow" key = {i} > 
             <td hidden = "true" > {item._id} </td>
                <td>{i}</td>

              
                  
                
                  <td>{ item.code}</td>
                    <td> {item.amount} </td>
                    <td>{item.minorder} </td>
                     <td>{item.maxorder} </td>
                      <td>{item.usagelimit} </td>
                   <td><button type="button" class="btn btn-block btn-outline-danger btn-sm">{ item.status}</button></td>
                  
                
                  
                  
                  <td>

                          <a  class="btn btn-info btn-sm"  onClick ={this.editOrder.bind(this , item._id , item.code ,  item.minorder , item.maxorder , item.amount,
                     item.usagelimit , item.status)} > 
                              <i class="far fa-edit" style ={{color:'#fff'}} >
                              </i>
                              </a>
                            
                         
                          
                        
                      </td>

                </tr>
               
              )}  </tbody> 
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
  </div>
  );
  }
}
export default ViewPromo