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
   
    email:'',
    password:'',
    image_path:'',
  stlatitude:'',
  stlangitude:'',
      open_at:'' ,
    close_at:'',
  str_type: '',
     image_path:'',
  image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
  image_base64: '',

}
class AddStore extends Component
{
   constructor(props){
    super(props)
    this.state = initialState;
   }
    handleChange = event =>{
this.setState({ [event.target.name]:event.target.value } )
this.setState({ [event.target.email]:event.target.value } )
      this.setState({ [event.target.city]: event.target.value })
this.setState({ [event.target.contact]:event.target.value } )
this.setState({ [event.target.address]:event.target.value } )
this.setState({ [event.target.password]:event.target.value } )

this.setState({ [event.target.image_path]:event.target.value } )

this.setState({ [event.target.str_type]:event.target.value } )
this.setState({ [event.target.open_at]:event.target.value } )
this.setState({ [event.target.close_at]:event.target.value } )

      this.setState({ [event.target.stlatitude]: event.target.value })
      this.setState({ [event.target.stlangitude]: event.target.value })
      
      console.log(event.target.value);
      console.log(this.state.close_at);

  }
  validate = () =>
{
   let errorAll = '';
   let emailError = ""
   
if( !this.state.name.match('/^[a-zA-Z]+$/')  )
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
console.log(" contact: " + this.state.contact)
console.log(" address: " + this.state.address)
console.log(" password: " + this.state.password)

console.log(" document_one: " + this.state.image_path)



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

const url = "http://www.cinemahd-apk.com:3005/store";
const data = { 
 name : this.state.name ,
    address:this.state.address,
  address_latitude:this.state.stlatitude,
  address_longitude: this.state.stlangitude,

  open_at: this.state.open_at,
  close_at: this.state.close_at,
    contact:this.state.contact,
  city: this.state.city,
    email:this.state.email,
    password:this.state.password,
  is_deleted: 'pending',
  image_path: 'http://livritomanager.livrito.com/apis/' + this.state.image_base64, 
  my_token:'0',
  store_type: this.state.store_type,
   
  }
fetch(url, { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => {
// alert ('registered successfully'  , response);
console.log('Success:', response)

  if (response.status === true) {
    this.props.history.push('/storelist');
  }
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

    if (localStorage.getItem('admin') !== 'true') {
      return <Redirect to='/' />
    }
  
    if (localStorage.getItem("loginstatus") !== "true") {
      return <Redirect to="/" />;
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
              <li className="breadcrumb-item active"> Add Store</li>
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
              <h3 className="card-title">Add New Store</h3>
           

              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i className="fas fa-minus"></i></button>
              </div>
            </div>
               
            <div className="card-body">
              <div className="form-group">
                <label for="inputName">Store Name</label>
                <input type="text"  className="form-control" name = "name" onChange={this.handleChange}/>
                </div>
                  <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
                 <div className="form-group">
                <label >Image</label>
                  {/* <input type = "file"  className="form-control"  onChange={this.handleChange } name = "image_path"/> */}
                  
                   <div class="form-group">
                      <img src={this.state.image} name = "image_path"  id = "image_path"   alt = '' style = {{height: '200px', width: '250px'}} onChange={this.handleImageChange} />
                 
                 </div>
                 <input type="file" ref = {fileInput => this.fileInput = fileInput}  style = {{color: 'red' , display:'none'}} name = "image_path"  onChange = {this.handleImageChange}/>
      
                      <button onClick={() => this.fileInput.click()} style={{
                        background: 'green', color: '#fff',

                        boxSizing: 'content-box',


                        display: 'block'
                      }} > Upload Image</button>
             </div>   
                 <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
              <div className="form-group">
                <label >Email</label>
                  <input type = "text"  className="form-control"  onChange={this.handleChange } name = "email"/>
                  
             </div>  
                   <div style = {{color:'red', fontSize:10}}> { this.state.emailError } </div>
             
                <div className="form-group">
                <label >Password</label>
                  <input type = "text"  className="form-control"  onChange={this.handleChange } name = "password"/>
                  
             </div>  
               <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
              <div className="form-group">
                <label >Store Address</label>
                  <input type = "text"  className="form-control"  onChange={this.handleChange } name = "address"/>

                      <label >Address Latitude</label>
                  <input type = "number"  className="form-control"  onChange={this.handleChange } name = "stlatitude"/>

                      <label >Address Longitude</label>
                      <input type="number" className="form-control" onChange={this.handleChange} name="stlangitude" />
                  
             </div>  
             
                 <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
                 <div className="form-group">
                <label >City</label>
                  <input type = "text"  className="form-control"  onChange={this.handleChange } name = "city"/>
                  
             </div>   
              <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>

                
                 
             <div className="form-group">
                <label > Phone Number</label>
                  <input type = "text" className="form-control" onChange={this.handleChange} name = "contact"/>
                  </div>
                   <div style = {{color:'red', fontSize:10}}> { this.state.errorAll } </div>
                
                 <div className ="form-group">
               <label>Opening Time</label>
                  <input type = "time"  className="form-control" name = "open_at"  onChange={this.handleChange} required />
                  <label >Closing Time</label>
                  <input type = "time"  className="form-control"  onChange={this.handleChange} name = "close_at"  required/>
              </div>
               <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
			   
                    <div className="form-group">
                      <label > Store Type</label>
                      <input type="text" className="form-control" onChange={this.handleChange} name="str_type" />
                    </div>
      
               <div className="col-12">
          <a href="#" className="btn btn-secondary">Cancel</a>
         <button type="submit" onClick= {this.handleSubmit} className="btn btn-success float-right"> Add New Store</button>
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
export default AddStore
 