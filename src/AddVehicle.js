import React   , {Component} from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';

class AddVehicle extends Component

{
   constructor(props){
    super(props)
    
       this.state = {

       name:'',
       
        }
   }
   handleChange = event =>{
this.setState({ [event.target.name]:event.target.value } )
this.setState({ [event.target.email]:event.target.value } )
this.setState({ [event.target.password]:event.target.value } )
this.setState({ [event.target.contact]:event.target.value } )
  }

handleSubmit = event =>{
event.preventDefault();
console.log(" name : " + this.state.name)
console.log(" email: " + this.state.email)
console.log(" password: " + this.state.password)
console.log(" contact: " + this.state.contact)




const url = "http://www.cinemahd-apk.com:3005/users";
const data = { menu_name:this.state.name, 
email:this.state.email , 
password: this.state.password, 
price:this.state.contact ,

  }
fetch(url, { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response)); }
       
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
          <div class="col-sm-6">
           
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active"> Add Vehicle</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

  
    <section class="content" >
      <div class="row">
        <div class="col-md-10">
          <div class="card card-primary">
            <div class="card-header" style = {{background: ' #28a745'}}  >
              <h3 class="card-title">Add New Vehicle</h3>
           

              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i class="fas fa-minus"></i></button>
              </div>
            </div>
               
            <div class="card-body">
             
              
              
              
              <label for="inputClientCompany" style = {{background: '#20d994RGB '}}><h3>Vehicle Information</h3></label>
              <div class="form-group">
               <label for="inputStatus"> EnterVehicle Type</label>
                     <select  name = "type" class="form-control">
                <option value="1">Car</option>
                	<option value="2">Bike</option>
				           	<option value="3">Van</option>
			            	<option value="4">Bi-Cycle</option>
                    </select>
                <label for="inputClientCompany">Enter Manufacture Name</label>
                <input type="text" id="inputClientCompany" class="form-control"/>
                <label for="inputClientCompany">Enter Model Name</label>
                <input type="text" id="inputClientCompany" class="form-control"/>
                <label for="inputClientCompany">Enter Model Year</label>
                <input type="text" id="inputClientCompany" class="form-control"/>
                <label for="inputClientCompany">Enter Vehicle Plat#</label>
                <input type="text" id="inputClientCompany" class="form-control"/>
                <label >Driving License</label>
                <input type="file" class="form-control"/>
              <label >Vehicle Assurance</label>
                <input type="file" class="form-control"/>
              
                  
                  
                   
              </div>
             
              
             
              
               <div class="col-12">
          <a href="#" class="btn btn-secondary">Cancel</a>
        <Link to = "/vehicle"> <input type="submit" value="Add New Vehicle" class="btn btn-success float-right"/></Link>
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
export default AddVehicle
 