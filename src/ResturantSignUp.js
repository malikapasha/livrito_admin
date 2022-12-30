import React   , {Component} from 'react';

import {Link , BrowserRouter} from 'react-router-dom';
const initialState =
{


      name :"" ,
    address:'',
    open_at:'' ,
    close_at:'',
    contact:'',
  image_path:'',
  image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
  image_base64: '',
    city:'',
    email:'',
     password:"",
    document_one:'',
    document_two:'',
    del_time:'',
    
  stlatitude: '',
  stlangitude: '',

      nameError:'',
      emailError:'',

}
class  ResturantSignUp extends Component
{
  state = {file: "assets/dist/img/respic.jpg",}
   constructor(props){
    super(props)
    this.state = initialState;
   }
  handleChange = event =>{
this.setState({ [event.target.name]:event.target.value } )
this.setState({ [event.target.address]:event.target.value } )
this.setState({ [event.target.city]:event.target.value } )
this.setState({ [event.target.contact]:event.target.value } )
this.setState({ [event.target.email]:event.target.value } )
this.setState({ [event.target.document_one]:event.target.value } )
this.setState({ [event.target.document_two]:event.target.value } )
this.setState({ [event.target.password]:event.target.value } )
this.setState({ [event.target.del_time]:event.target.value } )
this.setState({ [event.target.open_at]:event.target.value } )
this.setState({ [event.target.close_at]:event.target.value } )

  this.setState({ [event.target.stlatitude]: event.target.value })
      this.setState({ [event.target.stlangitude]: event.target.value })

// this.setState({image_path: event.target.result})


}
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
 
  validate = () =>
{
   let nameError = '';
     let  emailError = '';
     let  documentError = '';
     let passwordError = '';
     let  contactError = '';
if( !this.state.name)
{
  nameError = "fill all the fields";
}
if(!this.state.email.includes('@'))
{
emailError = 'Invalid Email';
}

if( !this.state.password  )
{
passwordError = 'enter password';
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
console.log(" image: " + this.state.result)
console.log(" address: " + this.state.address)
console.log(" city: " + this.state.city)
console.log(" contact: " + this.state.contact)
console.log(" email: " + this.state.email)
console.log(" document one: " + this.state.document_one)
console.log(" document two: " + this.state.document_two)
console.log(" delivery time: " + this.state.del_time)
console.log(" open : " + this.state.open_at)
console.log(" close: " + this.state.close_at)
console.log(" password: " + this.state.password)

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

      


const url = "http://www.cinemahd-apk.com:3005/restaurants";
const data = { name:this.state.name ,
  image_path: 'http://livritomanager.livrito.com/apis/'+this.state.image_base64, 
address: this.state.address, 
city:this.state.city ,
email: this.state.email,
contact: this.state.contact,
document_one :this.state.document_one,
document_two:this.state.document_two,
del_time : this.state.del_time,
open_at: this.state.open_at,
close_at: this.state.close_at,
password: this.state.password,
  }
fetch(url, { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
      if(data.status === true)
      {
    //  window.location.href = '/resturanttable'
        if (localStorage.getItem('loginstatus')==='true')
       { 
         this.props.history.push('/resturanttable');
        }
        else
        {
          this.props.history.push('/');
        }
      }
    
      
})
.catch(error => console.error('Error:', error))

      }

    })
    .catch(error => {
      console.error(error);
    }); // end of if

}
}

  render()
  {
    return(
       <div className = "wrapper" style = {{ backgroundImage : "url('assets/dist/img/ff.jpg')" , "width":
"100%" , "Height": "100%"}}>
      
         <div className="content-wrapper"   >
   
   

  
    <section className="content"   >
      <div className="row" >
        <div className="col-md-30" style = {{ backgroundImage : "url('assets/dist/img/ff.jpg')" , "width":"100%" , "Height": "100%"}}>
          <div className="card card-primary">
            <div className="card-header" style = {{background: ' #28a745'}}  >
              <h3 className="card-title" >Restaurant Sign Up</h3>
           

              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                 </button>
              </div>
            </div>
               <label  ><h2><br/>Resturant Information<b/></h2></label>
            <div className="card-body">
           <div class="form-group">
                <label >Resturant Image</label>
                </div>
                 <div class="form-group">
                      <img src={this.state.image} name = "image_path"  id = "image_path"   alt = '' style = {{height: '200px', width: '250px'}} onChange={this.handleImageChange} />
                 
                 </div>
                 <input type="file" ref = {fileInput => this.fileInput = fileInput}  style = {{color: 'red' , display:'none'}} name = "image_path"  onChange = {this.handleImageChange}/>
      
                  <button onClick = { () => this.fileInput.click()}   style = {{ background:'green', color: '#fff',

  boxSizing: 'content-box',

  
  display: 'block'}} > Upload Image</button>
              <div className="form-group">
               <label >Resturant Name</label>
                <input type="text"  className ="form-control"  name = "name" onChange={this.handleChange} required/>
                </div>
                 <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
              <label >Document 1:  </label>
                <input type="file" style = {{color: 'red'}} onChange={this.handleChange} name = "document_one" onChange={this.handleChange} required/>
                <label  >Document 2:</label>
                 <input type="file"   style = {{color: 'red'}} onChange={this.handleChange}    name = "document_two"  required/>
 <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
              <div className="form-group">
               <label  >Address</label>
               
                <textarea type="address" id="inputName" className="form-control" name = "address" onChange={this.handleChange} required/> </div>
              
                    <label >Address Latitude</label>
                  <input type = "number"  className="form-control"  onChange={this.handleChange } name = "stlatitude"/>

                      <label >Address Longitude</label>
                      <input type="number" className="form-control" onChange={this.handleChange} name="stlongitude" />

                 <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
                 <div className ="form-group">
                  <label >City</label>
                <input type="address"  className="form-control"  name = "city" onChange={this.handleChange} required/>
               
              </div>
               <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
              <div className ="form-group">
                <label >Phone Number</label>
                <input type = "phone"  className ="form-control" onChange={this.handleChange} name = "contact" required/>
                </div>
                 <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
                 <div className ="form-group">
                <label >Email</label>
                  <input type = "email" onChange={this.handleChange}  className="form-control" name = "email" required />
                   
              </div>
       <div style = {{color:'red', fontSize:10}}> { this.state.emailError } </div>
               <div className ="form-group">
                   <label>Delivery Time</label>
                  <input type = "text"   onChange={this.handleChange} className="form-control" name = "del_time"  required/> </div>

                    <div className ="form-group">
                   <label>Password</label>
                  <input type = "text"   onChange={this.handleChange} className="form-control" name = "password" required />
                  </div>
                   <div style = {{color:'red', fontSize:10}}> { this.state.passwordError } </div>
                   <div className ="form-group">
               <label>Opening Time</label>
                  <input type = "time"  className="form-control" name = "open_at"  onChange={this.handleChange} required />
                  <label >Closing Time</label>
                  <input type = "time"  className="form-control"  onChange={this.handleChange} name = "close_at"  required/>
              </div>
               <div style = {{color:'red', fontSize:10}}> { this.state.nameError } </div>
             
              <div className="col-12">
          <Link to ="/" className="btn btn-secondary">Cancel</Link>
         <button type="submit"  onClick ={this.handleSubmit} className="btn btn-success float-right">Add </button>
        
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
export default ResturantSignUp
 