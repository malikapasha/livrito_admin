import React, { Component,Alert } from "react";
import Content from './Content';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';



export default class SignUp extends Component {
    state={

email:'',
password:'',



    }
    
    handleFormSubmit( event ) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('email',this.state.email)
        formData.append('password',this.state.password)

        fetch('https://cors-anywhere.herokuapp.com/http://circularbyte.com/Mvpweb/login.php', {
              method: 'POST',
              body: formData,
            })
              .then(response => response.json())
              .then(responseJson => {
                console.log('RESULTS HERE:', responseJson);
                if(responseJson.success===1){
                    // this.context.router.push("/")
                   
                    window.location.href = '/content'



                }
                else if(responseJson.success==0){
                    alert("Please Enter Valid Information")



                }
                  
              })
              
              .catch(error => {
                console.error(error);
              });
              


        console.log(formData);
    }

               render() {
        return (
            
 <div className="auth-wrapper justify-content-center">     
 <div className="container container2">
<div className="row justify-content-center">
<div className="col-xl-10 col-lg-12 col-md-9">

<div className="card o-hidden border-0 shadow-lg my-5 mx-auto">

<div className="card-body">
<div className="row">
<div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
<div className="col-lg-6">
<div className="p-5">
<div className="text-center">
    <div>
    <h1 className="h4 text-gray-900 mb-4">Credentials</h1>
    </div>
    <form className="user">
<div className="form-group mb-4">
<input   type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
 value={this.state.email} onChange={e=>this.setState({email:e.target.value})}/>
 

</div>
 <div className="form-group mb-4">
  <input    type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={e=>this.setState({password:e.target.value})}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4" onClick={e => this.handleFormSubmit(e)}>Login</button>
           
                {/* <Link to="/main">
                
            <button type="submit" className="btn btn-primary btn-block mb-4" onClick={e => this.handleFormSubmit(e)}>Login</button>
                
            </Link> */}
    </form>
</div>

</div>



</div>
</div>


</div>
</div>
</div>

</div>


               </div>
               </div>    
            
        );
    }
}