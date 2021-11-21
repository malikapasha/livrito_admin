import React, {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import {FaStar} from 'react-icons/fa'
import Footer from './Footer';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
class ResturantRating extends Component
{  state = {
  Items:[],
};
apiUsers = [];
  constructor() {
    super()
    this.getItems();
  
    this.filterbyid = this.filterbyid.bind(this);
  }

   filterbyid(searchid) {
    console.log(searchid);
        let newArray = this.apiUsers.filter((d)=>{
          console.log(d)
          let searchValue = d.fr_id.toLowerCase();
          return searchValue.indexOf(searchid) !== -1;
        });
        console.log(newArray)
        this.setState({
            Items:newArray
        })
    }

  pendingHandler(e)
{
  console.log(e.target.value);

        let newArray = this.apiUsers.filter((d)=>{
        
            let clickValue = d.ztype.toLowerCase();
            return clickValue.indexOf(e.target.value) !== -1;
        });
        console.log(newArray)
        this.setState({
            Items:newArray
})
}
 
  getItems = async () =>
    {
       try{

      

    let data = await axios({
      method: 'get' ,
      url:'https://livrito.herokuapp.com/ratings' 
    }).then(({ data}) =>
    {
console.log(data)
  this.apiUsers =  data;
    this.setState({Items: data})
    })
     
         if (localStorage.getItem('searchid') !== 'empty') {
           this.filterbyid(localStorage.getItem('searchid'));
         }
  
  }catch(err)
    {
      console.log(err)
    }
 }
  
  render()
  {

     if (localStorage.getItem("admin") !== "true") {
       return <Redirect to="/" />;
     }
     
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
          <div class="col-sm-6">
            <h1>Rating Table</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active"> Rating Table</li>
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
              <h3 class="card-title"> 
              <button type = "submit"  value= "res" class = "btn  btn-success" onClick = {this.pendingHandler.bind(this)}  style= {{float:'right', marginLeft:2}} >Resturant<i class="fas fa-star" style = {{color:'yellow'}}></i></button> 
              <button type = "submit" value= "str"   class = "btn btn-info" onClick = {this.pendingHandler.bind(this)} style= {{float:'right', marginLeft:2}} >Store <i style = {{color:'yellow'}} class="fas fa-star"></i></button> 
              <button type = "submit"  value= "drv" class = "btn btn-info btn-danger" onClick = {this.pendingHandler.bind(this)}  style= {{float:'right', marginLeft:2 } } >Rider<i style = {{color:'yellow'}} class="fas fa-star"></i></button> 
              <button type = "submit"  value= {this.state.value}  class = "btn btn-info " onClick = {this.pendingHandler.bind(this)}  style= {{float:'right', marginLeft:2 } } >All<i style = {{color:'yellow'}} class="fas fa-star"></i></button></h3>
              
               <Link to = "/resturanttable" > <input type = "submit"  style = {{ float: 'right' ,color: '#fff', }} class="btn btn-info" value = "Back"/></Link> 
            </div>
           
            <div class="card-body">
              <table  class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th hidden = "true">No</th>
                  <th> Rating To </th>
                  <th>Rating By</th>
                  <th>Rating</th>
                     <th hidden = "true" >Type</th>
                  
                   
                   
                </tr>
                </thead>
                <tbody>
                {
                  this.state.Items.map((item , i) =>
                <tr>

                  <td hidden = "true">{item._id}</td>
                 
                  
                   <td>{item.fr_name}</td>
                  <td>{item.user_name}</td>
                  <td>{item.rating}</td>
                  <td hidden = "true" >{item.ztype}</td>
                  
                   
                </tr>
                  )}
         
               
             
                </tbody>
                
              </table>
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
export default ResturantRating;