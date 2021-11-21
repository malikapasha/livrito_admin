import React, {Component  ,} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import {Link , BrowserRouter} from 'react-router-dom';
import BeautyStars from 'beauty-stars';
class StoreRating extends Component
{  

constructor() {
    super();
 
   this.state = { value: 0 };
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }
render(){

const { rating } = this.state;

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
              <li class="breadcrumb-item active">Store Rating Table</li>
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
              <h3 class="card-title">Store Rating Table</h3>
            </div>
           
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>No</th>
                  <th> User Name</th>
                  <th>Store Name</th>
                  <th>Rating</th>
                  
                   
                   
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>abc</td>
                 
                  <td>abc</td>
                   <td>123 </td>
                  <td> <BeautyStars
        value={this.state.value}
        onChange={value => this.setState({ value })}
      /></td>
                  
                  
                   
                </tr>
         
               
             
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
export default StoreRating;