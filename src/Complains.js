import React, {Component } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import Content from './Content';
import {Link , BrowserRouter,Redirect} from 'react-router-dom';

class Complains extends Component
{  
  state = {
  Items:[],
 };

 constructor() {
   super();
   this.getItems();
     this.handleDeleteRow = this.handleDeleteRow.bind(this);
      //  this.onClick = this.onClick.bind(this);
 
    
 }
 onClick(){
   console.log(this.props.email);

        window.location.href = `mailto:${this.props.email}`;
    }

      emailuser(useremail)
 {
        console.log(useremail);
  // window.location.href = `mailto:${this.props.email}`;
        window.location.href = "mailto:"+useremail;
 }

handleDeleteRow(i) {
    let Items = [...this.state.Items]
    Items.splice(i, 1)
    this.setState({ 
      Items: Items
    })
  }
  getItems = async () =>
    {
      try{

      

    let data = await axios({
      method: 'get' ,
      url:'http://www.cinemahd-apk.com:3005/complains' 
    }).then(({ data}) =>
    data);
    console.log(data.complains)
    this.setState({Items: data.complains})
    }catch(err)
    {
      console.log(err)
    }
 }

    render()
    {

       if (localStorage.getItem('admin') !== 'true') {
         return <Redirect to='/' />
    }
     if (localStorage.getItem("loginstatus") !== "true") {
       return <Redirect to="/" />;
     }

  return (
    <div class="wrapper">
      <Header />
      <Sidebar />
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1> </h1>
              </div>
              <div class="col-sm-12">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li class="breadcrumb-item active">Complain Table</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section class="content">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Complain Table </h3>
                </div>

                <div class="card-body">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Order Id</th>
                        <th>Comment</th>

                        <th>Photo </th>

                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.Items.map((item, i) => (
                        <tr className="trow" key={i}>
                          <td>{item.orderid}</td>

                          <td>{item.comment}</td>
                          <td>
                            <img
                              src={item.photo_url}
                              style={{ width: 50, height: 50 }}
                            />
                          </td>

                          <td>
                            <button
                              onClick={this.emailuser.bind(this, item.useremail)}
                            >
                              <i class="fas fa-envelope"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
    }

}
export default Complains