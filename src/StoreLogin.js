import React, {Component , Alert } from 'react';
import { BrowserRouter , Link , Redirect} from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
export const myContext = React.createContext();
const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  
 export default class  StoreLogin extends Component 
{ 
  
 constructor() {
        super();

        this.state = {  email:null,

            password: null ,
           
            str: false,
            }
this.login= this.login.bind(this);
this.onChange = this.onChange.bind(this);
        

    }

login (e)
{
  e.preventDefault();

  if (!this.state.email || !this.state.password) {
    alert("fill all fields");
  } 
  else {
    fetch(
      "http://www.cinemahd-apk.com:3005/storeslogin",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);

        localStorage.setItem("_id", data.data._id);
        localStorage.setItem("loginstatus", data.status);
        localStorage.setItem("email", data.data.email);

        localStorage.setItem("name", data.data.name);

        localStorage.setItem("contact", data.data.contact);
        localStorage.setItem("city", data.data.city);
        localStorage.setItem("address", data.data.address);

        localStorage.setItem("admin", false);

         localStorage.setItem("str", true);

        // localStorage.setItem('log', JSON.stringify({
        //  // log:true,
        //   token: data.restaurant._id ,
        //   email: data.restaurant.email,

        //   }))

        alert(
          "Welcome " +
            data.data.name +
            " to Livritro Panel"
        );

        this.setState({ log: true });

        return <Redirect to="dashboard" />;
        // alert('Welcome '+data.restaurant.name+' to Zenfood Panel')
      })
      .catch((error) =>
        //console.error('Error:', error)
        alert("Error Occurred, please try again")
      );
  }

};
  
    onChange(e)
    {
this.setState({[e.target.name]: e.target.value});
console.log(this.state);

    }

 

 render() {
    

   if (localStorage.getItem('loginstatus') === 'true') {
     return <Redirect to='dashboard' />
   }
  
  return(  
    
  <div className = "hold-transition login-page"  style = {{ "background-image" : "url('assets/dist/img/groc.jpg')" , "width":
"100%" , "Height": "100%"}} >

<div className="login-box" >
    <div className="card">
     <div class="login-logo">
       <p className="login-box-msg"  style = {{color: 'orange'}}>< h1><br/>Store Login</h1></p>
    <img src = "assets/dist/img/empcart.png " style = {{width: '140px' , height: '100px'}} />
  </div>
    <div className="card-body login-card-body">
    

      
        <div className="input-group mb-3">
          <input type="email" className="form-control"  required  placeholder="Email" name = "email"  onChange ={this.onChange} />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope"></span>
            </div>
          </div>
        </div>
      
        <div className="input-group mb-3">
          <input type="password" className="form-control"  placeholder="Password" required  name = "password" onChange ={this.onChange}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock"></span>
            </div>
          </div>
        </div>
      
         
          <div class="social-auth-links text-center mb-">
                      <button  type = "submit" className="btn btn-block btn-primary" onClick = {this.login} > Sign In</button>
      
          </div>
         
       
      

     
    
      
    </div> 
    
  </div>
</div> 
</div>

  );
 }
  

}

