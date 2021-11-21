import React   , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import {Link , BrowserRouter,Redirect} from 'react-router-dom';
import Switch from "react-switch";
import axios from 'axios';

 class FreeDelivery extends Component
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
      
      if (localStorage.getItem('admin') !== 'true') {
         return <Redirect to='/' />
    }

      if (localStorage.getItem("loginstatus") !== "true") {
        return <Redirect to='/' />
      }
    return(
 
 <div class="wrapper">

        <Header/>
        <Sidebar/>
         <div class="content-wrapper">
   
     <section class="content">
      <div class="row">
        <div class="col-8">
          <div class="card">
          <div class="card-header" style = {{background: ' #28a745'}}   >
              <h3 class="card-title" >Free Delivery</h3>

              <div class="card-tools" >
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i  class="fas fa-minus"></i></button>
              </div>
            </div>
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Resturants Name</th>
                      <th>Status</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                   
                    <tr>
                      <td>657</td>
                      <td><Switch height = {20}
                     width = {30}
                     onChange={this.handleChange} checked={this.state.checked} /></td>
                      
                    </tr>
                    <tr>
                      <td>175</td>
                      <td><Switch height = {20}
                     width = {30}
                     onChange={this.handleChange} checked={this.state.checked} /></td>
                      
                    </tr>
                   
                    <tr>
                      <td>494</td>
                      <td><Switch height = {20}
                     width = {30}
                     onChange={this.handleChange} checked={this.state.checked} /></td>
                     
                    </tr>
                  
                    
                  </tbody>
                </table>
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
export default FreeDelivery