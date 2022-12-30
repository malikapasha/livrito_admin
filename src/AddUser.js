import React   , {Component} from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import {AsyncStorage} from 'AsyncStorage';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
 const initialState =
 {

      name: '',
      email: '',
      password: '',
      contact:'',
      nameError:'',
      emailError:'',
      documentError:'',
      passwordError:'',
      contactError:'',
 }
class AddUser extends Component
{
  state = { file: "assets/dist/img/uu.png"}
  constructor(props){
    super(props)
    
     
    
       this.state = initialState;
       this.state = {
         Formerrors:
         {
           name:'' ,
           email:'' ,
           password:'',
           contact:'',
         }
       }
  }
  handleChange = event =>{
this.setState({ [event.target.name]:event.target.value } )
this.setState({ [event.target.email]:event.target.value } )
this.setState({ [event.target.password]:event.target.value } )
this.setState({ [event.target.contact]:event.target.value } )
  }
validate = () =>
{
   let nameError = '';
     let  emailError = '';
     let  documentError = '';
     let passwordError = '';
     let  contactError = '';
 
if( !this.state.name)
{
 nameError = "fill the name"
} 

if(!validEmailRegex.test(this.state.email))         
{
emailError = 'Invalid Email';
}

if( !this.state.password   )
{
passwordError = 'empty or invalid password';
}
if(emailError || nameError || passwordError)
{
  this.setState({emailError , nameError , passwordError});
  return false;
}
return true;
}
handleSubmit = event =>{

event.preventDefault();

this.setState({emailError: ""})
this.setState({nameError: ""})
this.setState({passwordError: ""})
const isValid = this.validate();
if(isValid)
{
console.log(" name : " + this.state.name)
console.log(" email: " + this.state.email)
console.log(" password: " + this.state.password)
console.log(" contact: " + this.state.contact)




const url = "http://www.cinemahd-apk.com:3005/users";
const data = { name:this.state.name, 
email:this.state.email , 
password: this.state.password, 
contact:this.state.contact ,

  }
fetch(url, { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
      if(data.status == true)
      {
          alert('User has been added successfully');
          //  window.location.href = '/viewuser'
        this.props.history.push('/viewuser');
      }
    
      
})
.catch(error => alert('failed to add user , email already exist', error))
 

}}
   
    
  
  render()
  {

    if (localStorage.getItem('admin') !== 'true') {
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
   
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          
          <div class="col-sm-8">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active"> Add User</li>
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
              <h3 class="card-title" >Add User</h3>

              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i class="fas fa-minus"></i></button>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label>User Name</label>
                <input type="text" class="form-control" name = "name" onChange={this.handleChange} />
              </div>
              <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
              <div class="form-group">
                <label >User Contact</label>
                <input type="text" name = "contact" onChange={this.handleChange} class="form-control"/>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email"  class="form-control" name = "email"   onChange={this.handleChange}/>
              </div>
              <div style = {{color:'red', fontSize:10}}> { this.state.emailError } </div>
               <div class="form-group">
                <label >Password</label>
                <input type="password"  class="form-control" name = "password"   onChange={this.handleChange}/>
              </div>
               <div style = {{color:'red', fontSize:10}}> { this.state.passwordError } </div>
              <div class="col-12">
          <Link to = "/viewuser"> <button class="btn btn-secondary">Cancel</button> </Link>
        <Link to = "/viewuser"> <button type="submit" class="btn btn-success float-right" onClick= {this.handleSubmit} >Add User</button></Link>
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
export default AddUser
 