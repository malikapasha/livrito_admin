import React   , {Component} from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const initialState =
{
name :"" ,
    address:'',
    contact:'',
    image_path:null,
    password:'',
    email:'',
    document_one:'',
    document_two:'',
    vehicle_type:'',
    manufacturer_name:'',
    model_name:'',
    model_year:'',
  vehicle_number:'',
    gender:'', 
    is_online:'',
    errorAll: '',

  image_path: '',
  image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
  image_base64: '',
}
class AddRider extends Component
{
   constructor(props){
    super(props)
    this.state = initialState;
   }
    handleChange = event =>{
this.setState({ [event.target.name]:event.target.value } )
this.setState({ [event.target.email]:event.target.value } )
this.setState({ [event.target.password]:event.target.value } )
this.setState({ [event.target.contact]:event.target.value } )
this.setState({ [event.target.image_path]:event.target.files } )
this.setState({ [event.target.document_one]:event.target.value } )
this.setState({ [event.target.document_two]:event.target.value } )
this.setState({ [event.target.vehicle_type]:event.target.value } )
this.setState({ [event.target.manufacturer_name]:event.target.value } )
this.setState({ [event.target.model_name]:event.target.value } )
this.setState({ [event.target.model_year]:event.target.value } )
this.setState({ [event.target.vehicle_number]:event.target.value } )
this.setState({ [event.target.gender]:event.target.value } )
this.setState({ [event.target.is_online]:event.target.value } )

  }
  validate = () =>
{
   let errorAll = '';
   let emailError = ""
   
if( !this.state.name.match('/^[a-zA-Z]+$/') || !this.state.model_name || !this.state.model_year 
|| !this.state.vehicle_number || !this.state.vehicle_name || !this.state.manufacturer_name )
{
  errorAll = 'field cannot be empty'
}
if(!validEmailRegex.test(this.state.email)) 
{
emailError = 'Invalid format ' 
}
if(errorAll , emailError )
{
  this.setState({errorAll  , emailError});
  return false;
}
return true;

}

handleSubmit = event =>{
event.preventDefault();
this.setState({errorAll: "" ,  emailError:''})
const isValid = this.validate();
if(isValid)
{
console.log(" name : " + this.state.name)
console.log(" email: " + this.state.email)
console.log(" password: " + this.state.password)
console.log(" contact: " + this.state.contact)
console.log(" image_path: " + this.state.image_path)
console.log(" document_one: " + this.state.document_one)
console.log(" document_two: " + this.state.document_two)
console.log(" Vehicle_type: " + this.state.vehicle_type)
console.log(" Manufacturer Name: " + this.state.manufacturer_name)
console.log(" model_name: " + this.state.model_name)
console.log(" model_year " + this.state.model_year)
console.log(" vehicle_number: " + this.state.vehicle_number)
console.log(" gender: " + this.state.gender)
console.log(" is_online: " + this.state.is_online)


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
          image_base64: responseJson.imagepath,

        },

      );

      if (responseJson.success === 1) {

const url = "http://www.cinemahd-apk.com:3005/ryder";
const data = { 
 name : this.state.name ,
    address:this.state.address,
    contact:this.state.contact,
  image_path: 'http://livritomanager.livrito.com/apis/' + this.state.image_base64, 
    email:this.state.email,
    document_one:this.state.document_one,
    document_two:this.state.document_two,
    vehicle_type:this.state.vehicle_type,
    manufacturer_name:this.state.manufacturer_name,
    model_name:this.state.model_name,
    model_year:this.state.model_year,
  vehicle_number:this.state.vehicle_number,
    gender:this.state.gender, 
    password:this.state.password,
    is_online:this.state.is_online,
  }
fetch(url, { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => {
// alert ('registered successfully'  , response)
//console.log('Success:', response)

  this.props.history.push('/viewriders');

}
); 

 }

    })
    .catch(error => {
      console.error(error);
    }); // end of if

}}
 

handleImageChange = event => {
   let image_path = event.target.files;
   console.log('datafiles' , image_path)
   let reader = new FileReader();
   reader.readAsDataURL(image_path[0])
   reader.onload =(e) =>
   {
     console.log('data' , e.target.result);
     let bs64 = e.target.result.split('base64,');
     console.log('data', bs64[0]);
     console.log('base64 data', bs64[1]);

     this.setState({ image: e.target.result, image_base64: bs64[1]});
   }
  };

  render()
  {

if (localStorage.getItem("loginstatus") !== "true") {
  return <Redirect to="/" />;
}
    
    if (localStorage.getItem('admin') !== 'true') {
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
           
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active"> Add Courier</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

  
    <section className="content" >
      <div className="row">
        <div className="col-md-10">
          <div className="card card-primary">
            <div className="card-header" style = {{background: ' #28a745'}}  >
              <h3 className="card-title">Add New Courier</h3>
           

              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i className="fas fa-minus"></i></button>
              </div>
            </div>
               <label for="inputStatus"><h3><br/>Personel Information<b/></h3></label>
            <div className="card-body">
              <div className="form-group">
                <label for="inputName">Full Name</label>
                <input type="text"  className="form-control" name = "name" onChange={this.handleChange}/>
                </div>
                 
                 <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
                   
                 <div class="form-group">
                <label >Image</label>
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

                        <div className="form-group">
                <label >Phone Number</label>
                  <input type = "text" className="form-control" onChange={this.handleChange} name = "contact"/>
                  </div>
                  <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
                  <div className="form-group">
                  <label >Gender</label>
                  <input type = "text" className="form-control" onChange={this.handleChange} name = "gender"/>
                  <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
       </div>
              
            
              
              
              <label style = {{background: '#20d994RGB '}}><h3>Vehicle Information</h3></label>
              <div className="form-group">
               <label > Enter Vehicle Type</label>
                     <select  name = "type" className="form-control" onChange={this.handleChange} name = "vehicle_type"
                     >
                <option value="1">Car</option>
                	<option value="2">Bike</option>
				           	<option value="3">Van</option>
			            	<option value="4">Bi-Cycle</option>
                    </select>
                    </div>
                     
                         <div className="form-group">
                <label>Enter Manufacture Name</label>
                <input type="text"  className="form-control"  onChange={this.handleChange} name = "manufacturer_name"/> </div>
                   <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
                      <div className="form-group">
                <label >Enter Model Name</label>
                <input type="text"  className="form-control"  onChange={this.handleChange}  name = "model_name"/> </div>
                  <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
                     <div className="form-group">
                <label >Enter Model Year</label>
                <input type="text" className="form-control"  onChange={this.handleChange} name = "model_year"/> </div>
                  <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
                     <div className="form-group">
                <label > Enter Vehicle Plat#</label>
                <input type="text"  className="form-control"  onChange={this.handleChange}  name = "vehicle_number"/> </div>
                   <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
                     
                <label >Driving License</label>
                 <div className="form-group">
                <input type="file"   onChange={this.handleChange} name = "document_one"/> </div>
                          <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
                             
              <label >Vehicle Assurance</label>
              <div className="form-group">
                <input type="file"   onChange={this.handleChange} name = "document_two"/> </div>
                <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
                  
                  
                   
              
             
              
             
              <label for="inputClientCompany" style = {{background: '#20d994RGB '}}><h3>For Courier Login</h3></label>

             <div className="form-group">
                <label for="inputClientCompany">Email ID</label>
                      <input type="email" className="form-control" name="email" onChange={this.handleChange} />
                <label for="inputStatus">Password</label>
                  <input type="text"  className="form-control" name="password"  onChange={this.handleChange}/>
                  
                  
              </div>
               <div className="col-12">
          <Link to = "/viewriders">  <a href="#" className="btn btn-secondary">Cancel</a> </Link>
        <Link to = "/viewriders"> <button type="submit" onClick= {this.handleSubmit} className="btn btn-success float-right"> Add New Courier</button></Link>
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
export default AddRider
 