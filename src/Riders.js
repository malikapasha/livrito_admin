import React , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

class Riders  extends React.Component
{
  state = {
    rows:'' ,
    cols:'',
  }
  
 
  
  fileHandler = (event) => {
    let fileObj = event.target.files[0];
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
        this.setState({
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });               
  }
  render()
  {
    if (localStorage.getItem("admin") !== "true") {
      return <Redirect to='/' />
    }
    if (localStorage.getItem("loginstatus") !== "true") {
      return <Redirect to='/' />
    }

 return (
  <div className = "wrapper">
   <input type="file" onChange={this.fileHandler.bind(this)} style={{padding:"10px"}} />
  <div>
  {
 this.state.rows && <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" /> } 
   </div> 
  
 </div>
  );
  }
}
export default Riders