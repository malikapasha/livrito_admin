import React , {Component ,useState} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import {Link , BrowserRouter,Redirect} from 'react-router-dom';
import  {Switch} from 'antd';
const Contact = () =>
{
  const [toggle , setToggle] = useState(false);
  const toggler = () =>
  {

    toggle ? setToggle(false): setToggle(true)
  }
 return (
   
     <div className="wrapper">
     <Header/>
     <Sidebar/>
<div className="content-wrapper">
   
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Contacts</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Contacts</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

   
    <section className="content">

   <Switch  onClick = {toggler}  />
      

    </section>
 
  </div>
  
  <footer className="main-footer">
    <div className="float-right d-none d-sm-block">
      <b>Version</b> 3.0.2
    </div>
    <strong>Copyright &copy; 2014-2019 <a href="http://adminlte.io">AdminLTE.io</a>.</strong> All rights
    reserved.
  </footer>
     </div>
  );
}
export default Contact