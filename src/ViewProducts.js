import React, {Component } from 'react';
import Sidebar from './Sidebar';
import { Button, Label,Dropdown,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Header from './Header';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';


class ViewProducts extends Component
{  

state = {
  Items:[],
   menu : false,
  newOrderModal: false,
     
       editData:
       {
         id: '',
         name:'',
        price:'',
       

       }
 };
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

      

    let data = await axios({
      method: 'get' ,
      url: 'http://www.cinemahd-apk.com:3005/supplement/' + localStorage.getItem('menuid') 
    }).then(({ data}) =>
    data);
    console.log(data.supplements)
    this.setState({Items: data.supplements})
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
 
 editOrder(_id, name , price)
 {
   
   this.setState ({
     editData: {_id , price , name} , newOrderModal: !this.state.newOrderModal
   })
 }

 updateOrder()
 {
  

   let {_id , name , price} = this.state.editData;

    
   console.log(" _id : " +  this.state.editData._id)
console.log(" name: " + this.state.editData.name)
console.log(" price: " + this.state.editData.price)





const url = "http://www.cinemahd-apk.com:3005/updateorderstatus";
const data = { _id: this.state.editData._id, 
name:this.state.editData.name, 
price:this.state.editData.price, 

  }
fetch(url, { method: 'POST', 
body: JSON.stringify({
   _id:  this.state.editData._id, 
name:this.state.editData.name, 
price:this.state.editData.price, 
}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
// window.location.href = '/viewproducts'
   
   this.props.history.push('/viewproducts');

 }
 
 

 
    render()
    {

      if (localStorage.getItem("loginstatus") !== "true") {
        return <Redirect to='/' />
      }
  return(




 <div className="wrapper">
 <Header/>
 <Sidebar/>
  <div className="content-wrapper">
   
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Supplement</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Supplements</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            
            <div className="invoice p-3 mb-3">
              
              <div className="row">
                <div className="col-12">
                  <h4>
                        <i ></i> Menu Details ({localStorage.getItem('menuname')})
                     {/* <Link to = "/ordertable" > <input type = "submit"  style = {{ float: 'right' ,color: '#fff', marginLeft:10}} class="btn btn-info" value = "Back"/></Link> */}
                 
                 
                  </h4>
        
           <div className="col-12">
                  
                  
                        <Link to="/addsupplements" >  <button type="button" className="btn btn-primary float-right" style={{ "margin-right": "5px", "margin-bottom": "5px" , background: ' #28a745'}}>
                   Add New Supplement
                  </button>
               </Link>
              </div>
              
                </div>
              
              </div>
            
              <div className="row invoice-info">
               
               
                
                
              </div>
              <div className="row">
                <div className="col-12 table-responsive">
                  <table className="table table-striped">
      <thead>
                    <tr>
                   
                      <th>ID</th>
                      <th>Supplement Name</th>
                     
                      
                      <th>Price</th>
                       {/* <th>Quantity</th>
                      <th>Update Items</th>
                       <th>Delete Items</th> */}

                    
                      
                    </tr>
                    </thead>
                    <tbody>
                   
                    
                   
                    {
                  this.state.Items.map((item , i) =>
            <tr className="trow" key = {item._id} > 
                <td>{item._id}</td>
            <td hidden = "true">{item._id} </td><td>  {item.name} 
        </td> 
       
        <td> {item.price} </td>
         {/* <td> {item.quantity} </td>
        <td><button type = "submit"  class="btn btn-block btn-outline-success btn-sm" style = {{width:100 , }}  onClick ={this.editOrder.bind(this , item._id , item.name , item.price)} >Update</button> </td>
        <td> <button  onClick={i => this.handleDeleteRow(i)}  class="btn btn-danger btn-sm" href="#">
                              <i class="fas fa-trash">
                              </i>
                             
                          </button>   </td> */}
                                </tr>
                               ) }
                     
                    </tbody>
                  </table>
                </div>
             
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
export default ViewProducts;

