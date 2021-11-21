import React, { Component } from 'react';
import { BrowserRouter, Link, Redirect} from 'react-router-dom';
import Header from'./Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import axios from 'axios';
import {default as UUID} from "node-uuid";
const initialState =
 {

      code: '',
      amount: '',
      minorder: '',
      maxorder:'',
      usagelimit:'',
      res_id:'' ,
      nameError:'',
   promoby:'other',
      
   
      
 }
class AddPromos extends Component
{
  constructor(props){
    super(props)
    
     
    
       this.state = initialState;
  }
  handleChange = event =>{
    this.setState({ [event.target.name]:event.target.value } )
this.setState({ [event.target.code]:event.target.value } )
this.setState({ [event.target.amount]:event.target.value } )
this.setState({ [event.target.minorder]:event.target.value } )
this.setState({ [event.target.maxorder]:event.target.value } )
this.setState({ [event.target.usagelimit]:event.target.value } )


    if (localStorage.getItem('admin') === 'true') {
      this.setState({ promoby: 'admin' });

      console.log(" Promo By: " + this.state.promoby);

      return;
    }
  }
   componentWillMount() {
    this.id = UUID.v4();
  }
validate = () =>
{
   let nameError = '';
     if( !this.state.code || !this.state.amount || !this.state.minorder ||
     !this.state.maxorder || !this.state.usagelimit )
{
  nameError = "fill all the fields";
}
     

if( nameError )
{
  this.setState({ nameError });
  return false;
}
return true;
}
handleSubmit = event =>{
event.preventDefault();

this.setState({nameError: ""})

const isValid = this.validate();
if(isValid)
{
console.log(" code : " + this.state.code)
console.log(" amount: " + this.state.amount)
console.log(" minorder: " + this.state.minorder)
console.log(" maxorder: " + this.state.maxorder)
console.log(" usagelimit: " + this.state.usagelimit)
console.log(" res_id: " + this.state.res_id)



const url = "https://livrito.herokuapp.com/promos";
const data = { code:this.state.code, 
amount:this.state.amount , 
minorder: this.state.minorder, 
maxorder:this.state.maxorder ,
usagelimit: this.state.usagelimit,
res_id: localStorage.getItem('_id'),
  status:'active',

  promoby: this.state.promoby,
  }
fetch(url, { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
      if(data.success == true)
      {
          alert('Promo has been added successfully');
          //  window.location.href = '/viewpromo'

        this.props.history.push('/viewpromo');
      }
    
      
})
.catch(error => console.error('Error:', error))

}}
   
  

  render()

  
  {

    // if (localStorage.getItem('admin') === 'false') {
    //   return <Redirect to='/' />
    // }
  
   if (localStorage.getItem("loginstatus") !== "true") {
     return <Redirect to="/" />;
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
            <h1> Add Promo</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active"> Add Promo</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

  
    <section class="content">
      <div class="row">
        <div class="col-md-10">
          <div class="card card-primary">
            <div class="card-header" style = {{background: ' #28a745'}} >
              <h3 class="card-title">Add Promo</h3>

              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i class="fas fa-minus"></i></button>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label for="inputName">Promo Code</label>
                <input type="text" name = "code" class="form-control" onChange={this.handleChange}/>
              </div>
               <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
              
              <div class="form-group">
                <label for="inputStatus">Discount In Percentage{"%"}</label>
                  <input type ="number" class="form-control" name = "amount" onChange={this.handleChange} />
                
              </div>
           
             
              <div class="form-group">
                <label>Min Order</label>
                   <input type ="number" class="form-control" name = "minorder"  onChange={this.handleChange}/>
              
              </div>
               <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
              <div class="form-group">
                <label for="inputDescription">Max Order</label>
                <input type = "number"  class="form-control"  name ="maxorder" onChange={this.handleChange} />
              
              </div>
               <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
             
              <div class="form-group">
                <label >Usage Limit</label>
                <input type = "number"  class="form-control" onChange={this.handleChange} name = "usagelimit" />
              
              </div>
               <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
              
               
               
               
               <div class="col-12">
          <Link to = "/viewpromo">  <button class="btn btn-secondary">Cancel</button> </Link>
        <input type="submit" value="Add Promo" class="btn btn-success float-right" onClick= {this.handleSubmit}  />
        </div>
             
              
            </div>
         
          </div>
        
        </div>
        
      </div>
      <div class="row">
       
      </div>
    </section>
   
  </div>
  

 <Footer/>
 
        </div>
  
    );
}
}
export default AddPromos