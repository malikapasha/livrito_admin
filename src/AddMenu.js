import React   , {Component , Alert } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
import  {AsyncStorage} from "AsyncStorage";
const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const initialState =
{
 menu_name:'' ,
       name:'',
    image_path_one:null,
    image_path_two: null,
    image_path_three:null,
   
    description:'',
    price:'',
    emailError:'',
    errorAll:'',

  image_path: '',
  image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
  image_base64: '',
}
class AddMenu extends Component
{
  constructor(props){
    super(props)
    this.state = {
     
    }

  }

  handleImageChange = event => {
    let image_path = event.target.files;
    console.log('datafiles', image_path)
    let reader = new FileReader();
    reader.readAsDataURL(image_path[0])
    reader.onload = (e) => {
      console.log('data', e.target.result);
      let bs64 = e.target.result.split('base64,');
      console.log('data', bs64[0]);
      console.log('base64 data', bs64[1]);

      this.setState({ image: e.target.result, image_base64: bs64[1] });
    }
  };

 
handleChange = event =>{
this.setState({ [event.target.menu_name]:event.target.value } )
this.setState({ [event.target.image_path_one]:event.target.result } )
this.setState({ [event.target.description]:event.target.value } )
this.setState({ [event.target.price]:event.target.value } )
this.setState({ [event.target.image_path_two]:event.target.result } )
this.setState({ [event.target.image_path_three]:event.target.result} )
this.setState({ [event.target.name]:event.target.value } )
}
validate = () =>
{
   let errorAll = '';
   let emailError ='';
   
if( !this.state.name)
{
 errorAll = "field cannot be empty"
}

if(errorAll )
{
  this.setState({errorAll });
  return false;
}
return true;

}

handleSubmit = event =>{
event.preventDefault();
this.setState({errorAll: ""})
const isValid = this.validate();
if(isValid)
{

   let res_id;
        if (localStorage.getItem('admin') === 'false') {
          res_id = localStorage.getItem('_id');
          localStorage.setItem('resid', res_id);
        }
        else {
          res_id = localStorage.getItem('resid');
        }
      
        console.log('Res Id is:' + res_id);

console.log(" name : " + this.state.menu_name)
console.log(" image: " + this.state.image_path_one)
console.log(" description: " + this.state.description)
console.log(" price: " + this.state.price)
console.log(" image2: " + this.state.image_path_two)
console.log(" image3: " + this.state.image_path_three)
console.log(" name: " + this.state.name)

  const dbData = new FormData();
  dbData.append('image', this.state.image_base64);
  fetch('http://livritomanager.livrito.com/apis/uploadbaseimage.php', {
    method: 'POST',
    body: dbData,
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log('RESULTS HERE:', responseJson.msg);
      this.setState(

        {
          image_base64: "http://livritomanager.livrito.com/apis/"+responseJson.imagepath,

        },

      );

      if (responseJson.success === 1) {

const url = "https://livrito.herokuapp.com/menu";
const data = {
   menu_name:this.state.menu_name, 
  image_path_one:this.state.image_base64 , 
description: this.state.description, 
price:this.state.price ,
name:this.state.name,
  res_id: res_id,

  }
fetch(url, { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => 

console.log('Success:', response)); 
 //window.location.href = '/menutable'
        this.props.history.push('/menutable');
   }

    })
    .catch(error => {
      console.error(error);
    }); // end of if

 }
 }

  render()
  {
    // if (localStorage.getItem('res') !== 'true') {
    //      return <Redirect to='/' />
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
            <h1>Add Menu</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Add Menu </li>
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
              <h3 class="card-title" >Add Menu</h3>

              <div class="card-tools" >
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i  class="fas fa-minus"></i></button>
              </div>
            </div>
            <div class="card-body">
             
              <div class="form-group">
                <label>Menu Title</label>
               <input type="text" class="form-control" name = 'menu_name' onChange={this.handleChange}
                 />
                 <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
              </div>
               <div class="form-group">
                <label>Name</label>
                <input type="text"  class="form-control" name = "name" onChange={this.handleChange} />
       
      
              </div>
               <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
                    <div class="form-group">
                      <label >Menu Image</label>
                    </div>
                    <div class="form-group">
                      <img src={this.state.image} name="image_path" id="image_path" alt='' style={{ height: '200px', width: '250px' }} onChange={this.handleImageChange} />

                    </div>
                    <input type="file" ref={fileInput => this.fileInput = fileInput} style={{ color: 'red', display: 'none' }} name="image_path" onChange={this.handleImageChange} />

                    <button onClick={() => this.fileInput.click()} style={{
                      background: 'green', color: '#fff',

                      boxSizing: 'content-box',


                      display: 'block'
                    }} > Upload Image</button>
                

              <div class="form-group">
                <label >Type of Cusine</label>

               
                     <input type = "text" className="form-control" onChange={this.handleChange} name = ""/>
               
               <label >Product Type</label>

               
                     <select  name = "type" className="form-control" onChange={this.handleChange} name = "vehicle_type"
                     >
                <option value="1">Regular</option>
                <option value="1">Trending</option>
               </select>
               

              </div>
              <div class="form-group">
                <label >Description</label>
                <input type="text"  class="form-control" name = "description" onChange={this.handleChange} />
              </div>
              <div class="form-group">
                <label > Price</label>
                <input type="text"  class="form-control" name = "price" onChange={this.handleChange} />
              </div>
               <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
               
               
               
              
             <div class="col-12">
          <Link to = "/menutable">  <button class="btn btn-secondary">Cancel</button></Link>
        <Link to = "/menutable"> <button type="submit" class="btn btn-success float-right" onClick= {this.handleSubmit}>Add Menu</button></Link>
        </div>
             
            </div>
         
          </div>
        
        </div>
        
      </div>
      
    </section>
   
  </div>
  

  <footer class="main-footer">
    <div class="float-right d-none d-sm-block">
      <b>Version</b> 1.0.1
    </div>
    <b>Developed By:</b>
<strong>  <a href=""> Circular Byte</a>.</strong> All rights are reserved
  </footer>
  </div>
    );
  }
  
}
export default AddMenu
 