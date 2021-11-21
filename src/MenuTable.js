import React, {Component } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import { Button, Label,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import {Link , BrowserRouter, Redirect} from 'react-router-dom';
import axios from 'axios';

class MenuTable  extends Component
{  
 
 state = {
  Items:[],
  menu: false,
  newOrderModal: false,
     
       editData:
       {
         _id: '',
         name:'',
          description:'',
          image_path_one:'',
          menu_name:'',
          price:'',
        

       }
 };
apiUsers = [];

 constructor() {
   super();
   this.getItems();
     this.handleDeleteRow = this.handleDeleteRow.bind(this);
 
    
 }
  handleClose = () => {
    this.setState({ newOrderModal: false })
}

toggleNewOrders()
{

  this.setState({
    newOrderModal: true
  }) 
}
editOrder(_id, name , menu_name, image_path_one , description, price)
 {
   console.log(name)
   this.setState ({
     editData: { _id, name , menu_name, image_path_one , description, price} , newOrderModal: !this.state.newOrderModal
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

        let res_id;
        if (localStorage.getItem('admin') === 'false') {
          res_id = localStorage.getItem('_id');
          localStorage.setItem('resid', res_id);
        }
        else {
          res_id = localStorage.getItem('resid');
        }
      
        console.log('Res Id is:' + res_id);

    let data = await axios({
      method: 'get' ,
      url: 'https://livrito.herokuapp.com/menu/' + res_id 
    }).then(({ data}) =>
    {

    
    console.log(data.menus)
    
  this.apiUsers = data.menus;
    this.setState({Items: data.menus})
     })

      }catch(err)
    {
      console.log(err)
    }
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
 editOrder(_id, name , menu_name, image_path_one , description, price)
 {
   console.log(name)
   this.setState ({
     editData: {_id, name , menu_name, image_path_one , description, price} , newOrderModal: !this.state.newOrderModal
   })
 }
 
async  updateOrder()
 {
  

   let {_id, name , menu_name, image_path_one , description, price} = this.state.editData;

    
   console.log(" _id : " +  this.state.editData._id)
console.log(" name: " + this.state.editData.name)
console.log(" menu name " + this.state.editData.menu_name)
console.log(" image " + this.state.editData.image_path_one)
  console.log(" description : " +  this.state.editData.description)
    console.log(" price : " +  this.state.editData.price)





const url = "https://livrito.herokuapp.com/updateorderstatus";
const data = { _id: this.state.editData._id, 
name:this.state.editData.name, 
menu_name:this.state.editData.menu_name, 
image_path_one:this.state.editData.image_path_one, 
description:this.state.editData.description, 
price:this.state.editData.price, 

  }
fetch(url, { method: 'POST', 
body: JSON.stringify({
  _id: this.state.editData._id, 
name:this.state.editData.name, 
menu_name:this.state.editData.menu_name, 
image_path_one:this.state.editData.image_path_one, 
description:this.state.editData.description, 
price:this.state.editData.price, 

}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
   
      window.location.reload(true)
      
})
.catch(error => console.error('Error:', error))

   

 }

 editproduccts(_id, name)
 {
    console.log(name);
    localStorage.setItem('menuid', _id);
    localStorage.setItem('menuname', name );
    //  window.location.href = '/menutable'

  this.props.history.push('/viewproducts');
 }

  render()
  {
    
    // if (localStorage.getItem('admin') === 'false') {
    //   return <Redirect to='dashboard' />
    // }
   
    if (localStorage.getItem('str') === 'true') {
      return <Redirect to='/' />
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
          <div>
            <h1>Menu Table
             

            </h1>
          </div>
          </div>

          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Menu Table</li>
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
              <h3 class="card-title">Menu Details  of ( { localStorage.getItem('resname')} )
              </h3>
           
            <Link to = "addmenu" > <input type = "submit"  style = {{ float: 'right' ,color: '#fff'}} class="btn btn-success" value = "Add Menu"/></Link>
               <Input type="text"  value={this.state.value}  placeholder="Search for..."  onChange={this.onChangeHandler.bind(this)} style = {{float:'right' , width:'20%' , marginRight:5}} />
          <Button color="#fff" onClick={this.toggleNewOrders.bind(this)}></Button>
      <Modal isOpen={this.state.newOrderModal} toggle={this.toggleNewOrders.bind(this)} >
        <ModalHeader style = {{background:'green' , color:'#fff'}} > <p style = {{color:'#fff'}}> Edit Menu </p> </ModalHeader>
        <ModalBody>
        
        <FormGroup>
         <Input type="text" value ={ this.state.editData.name} onChange = {(e) =>{
          let {editData} = this.state;
          editData.name = e.target.value;
          this.setState({editData})
        }}  /></FormGroup>
     
       <FormGroup>
         <Input type="file" id = "image_path_one" onChange = {(e) =>{
          let {editData} = this.state;
          editData.image_path_one = e.target.value;
          this.setState({editData})
        }}  />
        </FormGroup>
         <FormGroup>
         <Input type="text" value ={ this.state.editData.description} onChange = {(e) =>{
          let {editData} = this.state;
          editData.description = e.target.value;
          this.setState({editData})
        }}  />
        </FormGroup>
        <FormGroup>
         <Input type="text" value ={ this.state.editData.menu_name} onChange = {(e) =>{
          let {editData} = this.state;
          editData.menu_name = e.target.value;
          this.setState({editData})
        }}  />
        </FormGroup>
        <FormGroup>
         <Input type="text" value ={ this.state.editData.price} onChange = {(e) =>{
          let {editData} = this.state;
          editData.price = e.target.value;
          this.setState({editData})
        }}  />
        </FormGroup>
      
          
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.updateOrder.bind(this)}>Update Menu</Button>
          <Button color="secondary" onClick = {this.handleClose} >Cancel</Button>
        </ModalFooter>
      </Modal>
          
          
            </div>
           
            <div class="card-body">
              <table id="" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>Menu Id</th>
                  <th>Title</th>
                  <th>Image</th>
                 
                     

                     
                       <th>Type of Cuisine</th>
                  
                 
                   <th>Product Type</th>
                   <th> Supplement </th>
                   <th>  Price</th>
                     
                   <th>Action</th>
                  
                </tr>
                </thead>
                <tbody>
                
              
            {
                this.state.Items.map((item , i) =>

                <tr className="trow" key = {item._id}>

                <td hidden = "true">{ localStorage.getItem('resid') }</td> <td>{item._id}</td>

               
                  <td>
                 {item.name} </td>
               
                <td >
                 
               <img src = {item.image_path_one} style = {{width:100, height:100 }} />
                   
              
                </td>
               
                 
                   <td> {item.menu_name} </td>
                 
                  <td> Trending </td>

                    <td>
                   <Input type = "submit" onClick ={this.editproduccts.bind(this , item._id ,item.name )} class = "btn btn-info btn-success" value = " View" />  
                 </td>

                  {/* <td><Link to = "viewproducts">View </Link> </td> */}
                 <td>
                 {item.price} </td>
                
              
              <td>

                          <button  class="btn btn-info btn-sm" onClick ={this.editOrder.bind(this , item._id , item.name , item.description, item.image_path_one,
                          item.price , item.menu_name)} >
                              <i class="fas fa-edit">
                              </i>
                            
                          </button>
                         
                      </td>   
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
    
    </section>
    
</div>
  <Footer/>
   </div>
  


  );
   

}
}

export default MenuTable;