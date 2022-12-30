import React, { Component, Alert } from 'react';
import { BrowserRouter, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
export const myContext = React.createContext();
const validEmailRegex =
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export default class Login extends Component {

  constructor() {
    super();

    this.state = {
      email: null,

      password: null,
      admin: false,
      log: false,
    }
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);


  }

  login(e) {
    e.preventDefault();

    if (!this.state.email || !this.state.password) {
      alert("fill all fields")
    }

    else if (this.state.email === "admin@admin.com" && this.state.password === 'admin@2021') {
      // localStorage.setItem('admin' ,'123' )
      // this.setState({admin:true})

      localStorage.setItem('_id', 'admin');
      localStorage.setItem('loginstatus', true);
      localStorage.setItem('email', 'admin@gmail.com');
      localStorage.setItem('name', 'Super Admin');

      localStorage.setItem('contact', '+213 771 92 43 15');
      localStorage.setItem('city', 'Algeria');
      localStorage.setItem('address', 'Algeria');
      localStorage.setItem('password', 'admin@2021');

      localStorage.setItem('admin', true);

       localStorage.setItem("str", false);

      this.setState({ log: true })

      alert('Welcome to Super Admin Panel');

      return <Redirect to='dashboard' />

      // alert('Welcome to Super Admin Panel');
    }



    else
    {
      alert('Authentication Failed');
    }



    // else {

    //   fetch('http://www.cinemahd-apk.com:3005/reslogin', {
    //     method: 'post',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(this.state)
    //   }).then(response => response.json())
    //     .then((data) => {

    //       console.log(data.restaurant);

    //       localStorage.setItem('_id', data.restaurant._id);
    //       localStorage.setItem('loginstatus', data.status);
    //       localStorage.setItem('email', data.restaurant.email);

    //       localStorage.setItem('name', data.restaurant.name);

    //       localStorage.setItem('contact', data.restaurant.contact);
    //       localStorage.setItem('city', data.restaurant.city);
    //       localStorage.setItem('address', data.restaurant.address);

    //       localStorage.setItem('admin', false);

    //        localStorage.setItem("str", false);

    //       // localStorage.setItem('log', JSON.stringify({
    //       //  // log:true,
    //       //   token: data.restaurant._id ,
    //       //   email: data.restaurant.email,


    //       //   }))


    //       alert('Welcome ' + data.restaurant.name + ' to Admin Panel' + localStorage.getItem('str'))

    //       this.setState({ log: true })

    //       return <Redirect to='dashboard' />
    //       // alert('Welcome '+data.restaurant.name+' to Zenfood Panel')



    //     }).catch(error =>

    //       //console.error('Error:', error)
    //       alert('Error Occurred, please try again'))

    // }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);

  }



  render() {

    /*if(this.state.log === true || this.state.admin === true )
     {
      return <Redirect to = 'dashboard' />
     } .*/

    if (localStorage.getItem('loginstatus') === 'true') {
      return <Redirect to='dashboard' />
    }

    return (

      <div className="hold-transition login-page" style={{
        "background-image": "url('assets/dist/img/groc.jpg')", "width":
          "100%", "Height": "100%"
      }} >

        <div className="login-box" >
          <div className="card">
            <div class="login-logo">
              <p className="login-box-msg" style={{ color: 'orange' }}>< h1><br /> </h1></p>
              <img src="assets/dist/img/empcart.png " style={{ width: '120px', height: '80px' }} />
            </div>
            <div className="card-body login-card-body">



              <div className="input-group mb-3">
                <input type="email" className="form-control" required placeholder="Email" name="email" onChange={this.onChange} />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Password" required name="password" onChange={this.onChange} />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>


              <div class="social-auth-links text-center mb-">
                <button type="submit" className="btn btn-block btn-primary" onClick={this.login} > Sign In</button>

              </div>





              <div class="social-auth-links text-center mb-1">
                <p>- OR -</p>
                {/* <Link to="/resturantsignup" class="btn btn-block btn-primary" >
                  Sign Up For Resturant
        </Link> */}
                <Link to="/storelogin" class="btn btn-block btn-primary" >
                  Login For Store
        </Link>

              </div>

            </div>

          </div>
        </div>
      </div>

    );
  }


}

