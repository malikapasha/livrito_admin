import React   , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';
import {default as UUID} from "node-uuid";
const initialState =
 {
   _id:'',
    name:'',
    order_menu_id:'',
    price:'',
    quantity:'',
    nameError:'',
    quantityError:'',
    priceError:'' ,}
 class AddSupplements extends Component
{
  
  
  constructor(props){
    super(props)
    
       this.state = initialState;
   }
   componentWillMount() {
    this.id = UUID.v4();
  }
  handleChange = event =>{


this.setState({ [event.target.order_menu_id]:event.target.value } )
this.setState({ [event.target.price]:event.target.value } )
this.setState({ [event.target.quantity]:event.target.value } )



this.setState({ [event.target.name]:event.target.value } )


}
validate = () =>
{
   let nameError = '';
     let  priceError = '';
    
    if(!this.state.name )
    {
      nameError = "empty field"

    }
  
     if( !this.state.price)
    {
priceError = "add price "
    }
 

if(nameError || priceError)
{
  this.setState({nameError ,  priceError});
  return false;
}
return true;
}

handleSubmit = event =>{
event.preventDefault();
const isValid = this.validate();
if(isValid){

console.log(" price: " + this.state.price)

console.log(" name: " + this.state.name)
  console.log(" menu_id: " + localStorage.getItem('menuid'))




  const url = "https://livrito.herokuapp.com/supplement";
const data = {
  name:this.state.name, 
price:this.state.price ,

  menu_id: localStorage.getItem('menuid'),


  }
fetch(url, { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => 
  {
    console.log('Success:', response)
  this.props.history.push('/viewproducts');
}
  );
  //window.location.href = '/viewproducts' 

 
  } }

  
  render()
  {
     
    //  if (localStorage.getItem('admin') === 'false') {
    //    return <Redirect to='/' />
    // }
    
if (localStorage.getItem('str') === 'true') {
         return <Redirect to='/' />
    }

     if (localStorage.getItem("loginstatus") !== "true") {
       return <Redirect to="/" />;
     }
    
    return(
        <div class="wrapper">
        <Header/>
        <Sidebar/>
         <div class="content-wrapper">
   
    <section class="content-header" >
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Add supplements</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Add supplements </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

  
    <section class="content" >
      <div class="row">
        <div class="col-md-10" >
          <div class="card card-primary" >
            <div class="card-header" style = {{background: ' #28a745'}}   >
              <h3 class="card-title" >Add supplements</h3>

              <div class="card-tools" >
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i  class="fas fa-minus"></i></button>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group">
            
                <div> 
                <label htmlFor={this.id} hidden = "true"  >supplement id</label>
               <input type="text" name = "_id" id={this.id}  onChange={this.handleChange} class="form-control" hidden = "true"/> </div>
               </div>
              <div class="form-group">
                <label for="inputDescription">Supplement name</label>
               <input type="text" name = "name"  onChange={this.handleChange} class="form-control"/>
              </div>
              <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>         
            
            
              <div class="form-group">
                <label for="inputDescription">Price</label>
               <input type="text" name = "price" class="form-control" onChange={this.handleChange}/>
              </div>
              <div style = {{color:'red', fontSize:10}}> { this.state.priceError } </div>
              <div class="form-group">
                <label htmlFor={this.id} hidden = "true">order_menu_id</label>
               <input type="text" name = "order_menu_id" id = {this.id} hidden = "true"  onChange={this.handleChange} class="form-control"/>
              </div>
              
          
          
             <div class="col-12">
          <Link to = "supplements"  class="btn btn-secondary">Cancel</Link>
         <button type="submit" onClick= {this.handleSubmit}  class="btn btn-success float-right">Add New supplement</button>
        </div>
             
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
export default AddSupplements
 