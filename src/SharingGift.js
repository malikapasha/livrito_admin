import React   , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';
import Switch from "react-switch";
import axios from 'axios';

 class SharingGift extends Component
{ 
   constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(checked) {
    this.setState({ checked });
  }
    render()
    {
      if (localStorage.getItem("loginstatus") !== "true") {
        return <Redirect to='/' />
      }

    return(
 
 <div class="wrapper">

        <Header/>
        <Sidebar/>
      <div class="content-wrapper">
   
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          
          <div class="col-sm-12">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Sharing Gifts</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content" >
      <div class="row">
        <div class="col-md-8" >
          <div class="card card-primary" >
            <div class="card-header" style = {{background: ' #28a745'}}   >
              <h3 class="card-title" >Sharing Gifts</h3>

              <div class="card-tools" >
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i  class="fas fa-minus"></i></button>
              </div>
            </div>
  <div class="card-body" >
         
         <div class="row mb-6">
                       <div class="form-group" style = {{marginTop:10,}} >
                <label for="inputEstimatedBudget">From Sharing the Link</label>
                <input type="text" id="inputEstimatedBudget" class="form-control" value = "DA/1Sharing" />
                <label for="inputEstimatedBudget" style = {{marginTop:10,}}>Free delivery</label>
                 <label>
            <input type="radio" value="option1" checked={true} style = {{marginLeft:10}} />

            ON
          </label>
          <label>
            <input type="radio" value="option1" checked={false} style = {{marginLeft:10 , alignText:'center'}}  />

         OFF
          </label>
                <div class="form-group" style = {{marginTop:10,}}>
                <label for="inputEstimatedBudget">First Order From the Referred Friend</label>
                <input type="text" id="inputEstimatedBudget" class="form-control" value = "DA/1Sharing" />
                <label for="inputEstimatedBudget" style = {{marginTop:10,}}>Free delivery</label>
                 <label>
            <input type="radio" value="option1" checked={true} style = {{marginLeft:10}} />

            ON
          </label>
          <label>
            <input type="radio" value="option1" checked={false} style = {{marginLeft:10 , alignText:'center'}}  />

         OFF
          </label>
              </div>
              </div>
              

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
export default SharingGift