import React , {Component} from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';

const ViewResturants = () =>
{

  if (localStorage.getItem("admin") !== "true") {
       return <Redirect to="/" />;
     }

  if (localStorage.getItem("loginstatus") !== "true") {
		  return <Redirect to='/' />
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
            <h1>Resturants</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Resturants</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

   
    <section className="content">

   
      <div className="card card-solid">
        <div className="card-body pb-0">
          <div className="row d-flex align-items-stretch">
            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
              <div className="card bg-light">
                <div className="card-header text-muted border-bottom-0">
                  Resturant1
                </div>
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="col-7">
                      <h2 className="lead"><b>KFC</b></h2>
                      <p className="text-muted text-sm"><b>About: </b> Resturant detail </p>
                      <p className="text-muted text-sm"><b>Email: </b> abc@gmail.com</p>
                      <p className="text-muted text-sm"><b>Phone: </b> 123 </p>
                       
                     <Link to = "/addresturant"  class="btn btn-info btn-sm" >
                              <i class="fas fa-folder">
                              </i>
                            
                          </Link>
                          <a class="btn btn-danger btn-sm" href="#">
                              <i class="fas fa-trash">
                              </i>
                             
                          </a>
                    </div>
                    <div className="col-5 text-center">
                      <img src="assets/dist/img/res.jpg"  className="img img-fluid" />
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
           
           
            
           
            
            
           
            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
              <div className="card bg-light">
                <div className="card-header text-muted border-bottom-0">
                  Resturant 2
                </div>
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="col-7">
                      <h2 className="lead"><b>McDonald</b></h2>
                      <p className="text-muted text-sm"><b>About: </b>Resturant detail </p>
                    
                      <p className="text-muted text-sm"><b>Email: </b> abc@gmail.com</p>
                      <p className="text-muted text-sm"><b>Phone: </b> 123 </p>
                   
                     <Link to = "/addresturant"  class="btn btn-info btn-sm" >
                              <i class="fas fa-folder">
                              </i>
                            
                          </Link>
                          <a class="btn btn-danger btn-sm" href="#">
                              <i class="fas fa-trash">
                              </i>
                             
                          </a>
                    </div>
                    <div className="col-5 text-center">
                      <img src="assets/dist/img/res1.jpg" alt="" className="img img-fluid"/>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
     
        <div className="card-footer">
          <nav aria-label="Contacts Page Navigation">
            <ul className="pagination justify-content-center m-0">
             
            </ul>
          </nav>
        </div>
       
      </div>
      

    </section>
 
  </div>
  
  <Footer/>
  </div>
  );
}
export default ViewResturants