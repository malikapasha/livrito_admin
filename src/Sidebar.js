import React, {Component } from 'react';
import {Link , Redirect} from 'react-router-dom';
import Switch from 'react-switch';
import { Offline, Online , Detector} from "react-detect-offline";
class  Sidebar extends React.Component
{
  constructor(props) {
    super(props)
  
    this.state = {
        admin:localStorage.getItem('admin'),
      // //  name:localStorage.getItem('name'),
        checked:false,
        log: false,
        logout:false,
        str: false,
    }
    this.logout = this.logout.bind(this);
     this.handleChange = this.handleChange.bind(this);

     this.checkadmin(this);
  }
  handleChange(checked) 
  {
   
 this.setState({ checked   });
    
  }
  
      checkadmin  = async () =>
  {

   this.setState({admin: localStorage.getItem('admin')})

   
  if(this.state.admin){
// console.log('call')

    this.setState({admin: true})
 console.log('heret '+this.state.admin+' '+localStorage.getItem('admin'));
    }
   else 
    {
      // this.setState({str: true})
       this.setState({admin: false})
        console.log('heref '+this.state.admin+' '+localStorage.getItem('admin'));
    }
   }

 async componentWillMount()
  {

   

//   if(localStorage.getItem('admin')){
// // console.log('call')

//     this.setState({admin: true})
//  console.log('here '+this.state.admin);
//     }
//    else 
//     {
//       // this.setState({str: true})
//        this.setState({admin: false})
//         console.log('here '+this.state.admin);
//     }
   }

  
   
  logout()
  {
    // localStorage.setItem('str' , '');
    localStorage.clear();
    this.setState({ logout: true})
localStorage.setItem('loginstatus' , 'false');
  }
  
    websitezenfood(keyword)
 {
        console.log(keyword);
  // window.location.href = `mailto:${this.props.email}`;
        // window.location.href = 'http://zenfoodapp.com/'; 

        if(keyword==='about')
        {
        window.open('http://livritomanager.livrito.com/');
        }
        else if(keyword==='services')
        {
        window.open('http://livritomanager.livrito.com/');
        }
         else if(keyword==='terms')
        {
        window.open('http://livritomanager.livrito.com/');
        }
         else if(keyword==='contact')
        {
        window.open('http://livritomanager.livrito.com/');
        }


 }

  togglevehicles() {

  
     localStorage.setItem('searchid','empty');

  }

  render()
  {

     const isadmin = localStorage.getItem('admin');

  if( this.state.logout)
  {
    return(<Redirect to = "/" />)
  }






  return (
    <aside className="main-sidebar sidebar-green-primary elevation-4">
      <Link >
       
        <span
          className="brand-text "
          style={{ color: "#60a727", marginRight: 10 }}
        >
        
        </span>

        {/* {localStorage.getItem("admin") !== "true" ? (
          <Switch
            onChange={this.handleChange}
            checked={this.state.checked}
            height={20}
            width={40}
          />
        ) : null} */}
      </Link>

 {/* <img
              src="assets/icon32.png"
              className="brand-image img-circle"
              alt="User Image"
            /> */}

      <div className="sidebar" style={{ background: "#fff" }}>
        
        <div className="brand-link mt-3 pb-3 mb-3 d-flex" style={{ background: "#fff" }}>
          
          <div className="image" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <img
              src="assets/icon32.png"
              className="img-circle"
              alt="User Image"
            />
          </div>
          <br/>
          <div className="info" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Link
              to="/profile"
              className="d-block"
              style={{ color: "#60a727" }}
            >
               {"      "}Welcome
             <br/>
              <strong>
              {localStorage.getItem('name')}
              </strong>
              {/* <span style={{ marginBottom: "10%" }}>
                {this.state.checked ? (
                  <Online>
                    <i class="fas fa-circle fa-xs" style={{ color: "green" }} />
                  </Online>
                ) : (
                  <Offline>offline</Offline>
                )}
              </span> */}
            </Link>
          </div>

              
        
        </div>
       {/* <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        Powered By:
      <strong>
       
          <a href="http://zenfoodapp.com/" style={{ color: "green" }}>
            ZENFOOD
        </a>
        
      </strong>
       </div> */}

        <hr /><hr />


        <nav className="mt-2" style={{ color: "#60a727" }}>
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
            style={{ color: "#60a727" }}
          >
            <li className="nav-item">
              <Link to="dashboard" className="nav-link">
                <i
                  className="fas fa-chart-line nav-icon"
                  style={{ color: "#60a727" }}
                ></i>
                <p style={{ color: "#60a727" }}>Dashboard</p>
              </Link>

              <li className="nav-item">
                <Link to="ordertable" className="nav-link">
                  <i
                    className="fab fa-first-order nav-icon"
                    style={{ color: "#60a727" }}
                  ></i>
                  <p style={{ color: "#60a727" }}>Orders</p>
                </Link>
              </li>

               <li className="nav-item">
                <Link to="jobtable" className="nav-link">
                  <i
                    className="fab fa-first-order nav-icon"
                    style={{ color: "#60a727" }}
                  ></i>
                  <p style={{ color: "#60a727" }}>Jobs</p>
                </Link>
              </li>

              
              {/* <li className="nav-item">
                <Link to="/viewpromo" className="nav-link">
                  <i
                    className="nav-icon fas fa-gifts"
                    style={{ color: "#60a727" }}
                  ></i>
                  <p style={{ color: "#60a727" }}>Promo code</p>
                </Link>
              </li> */}

              {/* {localStorage.getItem("admin") === "true" ? (
                <li className="nav-item">
                  <Link to="resturanttable" className="nav-link" onClick= {this.togglevehicles.bind(this)} >
                    <i
                      className="fas fa-building nav-icon"
                      style={{ color: "#60a727" }}
                    ></i>
                    <p style={{ color: "#60a727" }}>Resturants</p>
                  </Link>
                </li>
              ) : null} */}
            </li>

            {localStorage.getItem("admin") === "true" ? (
              <li className="nav-item">
                <Link to="viewriders" className="nav-link">
                  <i
                    className="fas fa-biking nav-icon"
                    style={{ color: "#60a727" }}
                  ></i>
                  <p style={{ color: "#60a727" }}>Couriers</p>
                </Link>
              </li>
            ) : null}

              {localStorage.getItem("admin") === "true" ? (
              <li className="nav-item">
                <Link to="viewsales" className="nav-link">
                  <i
                    className="fas fa-biking nav-icon"
                    style={{ color: "#60a727" }}
                  ></i>
                  <p style={{ color: "#60a727" }}>Sales Confirmers</p>
                </Link>
              </li>
            ) : null}

            {localStorage.getItem("admin") === "true" ? (
              <li className="nav-item has-treeview">
                <Link to="/" className="nav-link">
                  <i
                    className=" nav-icon fas fa-store"
                    style={{ color: "#60a727" }}
                  ></i>
                  <p style={{ color: "#60a727" }}>
                    Stores
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="storelist" className="nav-link" onClick= {this.togglevehicles.bind(this)}>
                      <i
                        className="fas fa-list-alt nav-icon"
                        style={{ color: "#60a727" }}
                      ></i>
                      <p style={{ color: "#60a727" }}>Stores List</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="maincat" className="nav-link">
                      <i
                        className="fas fa-list-alt nav-icon"
                        style={{ color: "#60a727" }}
                      ></i>
                      <p style={{ color: "#60a727" }}>Main category</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="subcat" className="nav-link">
                      <i
                        className="fas fa-list-alt nav-icon"
                        style={{ color: "#60a727" }}
                      ></i>
                      <p style={{ color: "#60a727" }}>Sub category</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="nextsub" className="nav-link">
                      <i
                        className="fas fa-list-alt nav-icon"
                        style={{ color: "#60a727" }}
                      ></i>
                      <p style={{ color: "#60a727" }}>Second Sub category</p>
                    </Link>
                  </li>
                </ul>
              </li>
            ) : null}

            <li className="nav-item" hidden="true">
              <Link to="cuisine" className="nav-link">
                <i
                  className="nav-icon fas fa-utensils"
                  style={{ color: "#60a727" }}
                ></i>
                <p style={{ color: "#60a727" }}>Cuisine Categories</p>
              </Link>
            </li>

            {(localStorage.getItem("str") != "true" && localStorage.getItem("admin") != "true") ? (
              <li className="nav-item">
                <Link to="menutable" className="nav-link">
                  <i
                    className="nav-icon fas fa-file-signature"
                    style={{ color: "#60a727" }}
                  ></i>
                  <p style={{ color: "#60a727" }}>Menus</p>
                </Link>
              </li>
            ) : null}

            {localStorage.getItem("str") === "true" ? (
              <li className="nav-item">
                <Link to="productview" className="nav-link">
                  <i
                    className="nav-icon fas fa-file-signature"
                    style={{ color: "#60a727" }}
                  ></i>
                  <p style={{ color: "#60a727" }}>Products</p>
                </Link>
              </li>
            ) : null}

   {/* {localStorage.getItem("admin") === "true" ? (
            <li className="nav-item">
                <Link to="ratingtable" className="nav-link" onClick= {this.togglevehicles.bind(this)}>
                <i
                  className="fas fa-star nav-icon"
                  style={{ color: "#60a727" }}
                ></i>
                <p style={{ color: "#60a727" }}> Ratings</p>
              </Link>
            </li>
   ) : null} */}

            {localStorage.getItem("admin") === "true" ? (
              <li className="nav-item">
                <Link to="complains" className="nav-link">
                  <i
                    className="nav-icon fas fa-angry"
                    style={{ color: "#60a727" }}
                  ></i>
                  <p style={{ color: "#60a727" }}>Complains</p>
                </Link>
              </li>
            ) : null}

            {/* {localStorage.getItem("admin") === "true" ? (
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i
                    className="nav-icon fas fa-file-invoice"
                    style={{ color: "#60a727" }}
                  ></i>
                  <p style={{ color: "#60a727" }}>
                    Required Documents
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="documents" className="nav-link">
                      <i
                        className="fas fa-file-invoice nav-icon"
                        style={{ color: "#60a727" }}
                      ></i>
                      <p style={{ color: "#60a727" }}>
                        Documents For Resturants
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="docrider" className="nav-link">
                      <i
                        className="fas fa-file-invoice nav-icon"
                        style={{ color: "#60a727" }}
                      ></i>
                      <p style={{ color: "#60a727" }}>
                        {" "}
                        Documents For Couriers
                      </p>
                    </Link>
                  </li>
                </ul>
              </li>
            ) : null} */}

            {/* {localStorage.getItem("admin") === "true" ? (
              <li className="nav-item">
                <Link to="earn" className="nav-link">
                  <i
                    className="nav-icon fas fa-hand-holding-usd"
                    style={{ color: "#60a727" }}
                  ></i>
                  <p style={{ color: "#60a727" }}>Earning Reports</p>
                </Link>
              </li>
            ) : null} */}

            {localStorage.getItem("admin") === "true" ? (
              <li className="nav-item">
                <Link to="viewuser" className="nav-link">
                  <i
                    className="nav-icon fas fa-user-friends"
                    style={{ color: "#60a727" }}
                  ></i>
                  <p style={{ color: "#60a727" }}>Users</p>
                </Link>
              </li>
            ) : null}

            {localStorage.getItem("admin") === "true" ? (
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i
                    className="nav-icon fas fa-cog"
                    style={{ color: "#60a727" }}
                  ></i>
                  <p style={{ color: "#60a727" }}>
                    Settings
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  {/* <li className="nav-item">
                    <Link to="generalsetting" className="nav-link">
                      <i
                        className="fas fa-globe-asia nav-icon"
                        style={{ color: "#60a727" }}
                      ></i>
                      <p style={{ color: "#60a727" }}>Generel Settings</p>
                    </Link>
                  </li> */}
                  {/* <li className="nav-item">
                    <Link to="com" className="nav-link">
                      <i
                        className="fas fa-dollar-sign nav-icon"
                        style={{ color: "#60a727" }}
                      ></i>
                      <p style={{ color: "#60a727" }}>Commissions Management</p>
                    </Link>
                  </li> */}
                  
                  <li className="nav-item">
                    <Link to="deliverycharges" className="nav-link">
                      <i
                        className="fas fa-globe-asia nav-icon"
                        style={{ color: "#60a727" }}
                      ></i>
                      <p style={{ color: "#60a727" }}>General / Push Notifications</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="vehicle" className="nav-link">
                      <i
                        className="fas fa-cogs nav-icon"
                        style={{ color: "#60a727" }}
                      ></i>
                      <p style={{ color: "#60a727" }}>
                        Vehicle Type Management
                      </p>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link to="push" className="nav-link">
                      <i
                        className="fas fa-bell nav-icon"
                        style={{ color: "#60a727" }}
                      ></i>
                      <p style={{ color: "#60a727" }}>Push Notification</p>
                    </Link>
                  </li> */}
                  {/* <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i
                        className="fas fa-ad nav-icon"
                        style={{ color: "#60a727" }}
                      ></i>
                      <p style={{ color: "#60a727" }}>Ads Banner</p>
                    </a>
                  </li> */}
                </ul>
              </li>
            ) : null}

            <li className="nav-item">
              <Link
                onClick={this.websitezenfood.bind(this, "about")}
                className="nav-link"
              >
                <i
                  className="fas fa-info nav-icon"
                  style={{ color: "#60a727" }}
                ></i>
                <p style={{ color: "#60a727" }}>About Us</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link  onClick={this.websitezenfood.bind(this, "services")} className="nav-link">
                <i
                  className="fab fa-servicestack nav-icon"
                  style={{ color: "#60a727" }}
                ></i>
                <p style={{ color: "#60a727" }}>Our Services</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link  onClick={this.websitezenfood.bind(this, "contact")} className="nav-link">
                <i
                  className="far fa-address-card nav-icon"
                  style={{ color: "#60a727" }}
                ></i>
                <p style={{ color: "#60a727" }}>Contact Us</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link  onClick={this.websitezenfood.bind(this, "terms")} className="nav-link">
                <i
                  className="far fa-question-circle nav-icon"
                  style={{ color: "#60a727" }}
                ></i>
                <p style={{ color: "#60a727" }}>Terms and Conditions</p>
              </Link>
            </li>

            <li>
              <ul className="nav nav-treeview"></ul>
            </li>

            <li className="nav-item">
              <a onClick={this.logout} className="nav-link">
                <i
                  className="nav-icon fas fa-sign-out-alt"
                  style={{ color: "#60a727" }}
                ></i>
                <p style={{ color: "#60a727" }}>Logout</p>
              </a>
            </li>

            <li className="nav-item">
              
                {/* <i
                  className="nav-icon far fa-copyright"
                  style={{ color: "#60a727" }}
                ></i>
                <b style={{ color: "#60a727" }}>@2020</b> */}
            
            </li>

              <li className="nav-item">
             
            </li>
             <li className="nav-item">
             
            </li>
            <li className="nav-item">

            </li>


          </ul>
        </nav>
      </div>
    </aside>
  );

 /*else {
  return(
    <aside className="main-sidebar sidebar-green-primary elevation-4" >
   
    <Link to ="/dashboard" className="brand-link">
      <img src= "assets/dist/img/f.png" className="brand-image img-circle elevation-3"
           />
      <span className="brand-text " style= {{ color : '#60a727' }} >ZENFOOD</span>
    </Link>

    
    <div className="sidebar" style= {{ background : '#fff' }}>
     
      <div className="user-panel mt-3 pb-3 mb-3 d-flex"  >
        <div className="image">
          <img src="assets/dist/img/uu.png" className="img-circle elevation-2" alt="User Image"/>
        </div>
        <div className="info">
          <Link to ="/profile" className="d-block" style= {{ color : '#60a727' }} > Profile</Link>
        </div>
          <Switch
            onChange={this.handleChange}
            checked={this.state.checked}
            height = {20}
            width = {40}
           
          
          /> <span>{this.state.checked   ?  <Online ><i class="fas fa-circle fa-xs" style = {{color:'green'}}/></Online>  : <Offline>offline</Offline> }</span>
  
      </div>
    
                  
       
         
     
      <nav className="mt-2" style= {{ color : '#60a727' }}>
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" style= {{ color : '#60a727' }}>
          
         
              <li className="nav-item" >
            <Link to ="dashboard" className="nav-link">
              <i className="fas fa-chart-line nav-icon" style= {{ color : '#60a727' }}></i>
              <p style= {{ color : '#60a727' }}>
                Dashboard
               
              </p>
            </Link>
            
              <li className="nav-item" >
            <Link to ="table1" className="nav-link">
              <i className="fab fa-first-order nav-icon" style= {{ color : '#60a727' }}></i>
              <p style= {{ color : '#60a727' }}>
                
               Orders
              </p>
            </Link>
          
           </li>
            <li className="nav-item" >
            <Link to ="/viewpromo" className="nav-link">
              <i className="nav-icon fas fa-gifts" style= {{ color : '#60a727' }}></i>
              <p style= {{ color : '#60a727' }}>
                
               Promo code
              </p>
            </Link>
          
           </li>
          
              
           
                  <li className="nav-item has-treeview">
            <Link to ="/" className="nav-link">
              <i className="fas fa-building nav-icon" style= {{ color : '#60a727' }}></i>
              <p style= {{ color : '#60a727' }}>
                Resturants
                <i className="fas fa-angle-left right"></i>
              </p>
            </Link>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to ="resturanttable" className="nav-link">
                  <i className="fas fa-list nav-icon" style= {{ color : '#60a727' }}></i>
                  <p style= {{ color : '#60a727' }}>Resturants List</p>
                </Link>
              </li>
             
            
            </ul>
          </li>
           
          </li>
          
                  <li className="nav-item has-treeview">
            <Link to = "/" className="nav-link">
              <i class="fas fa-biking nav-icon" style= {{ color : '#60a727' }}></i>
              <p style= {{ color : '#60a727' }}>
                Couriers
                <i className="fas fa-angle-left right"></i>
              </p>
            </Link>
            <ul className="nav nav-treeview">
              
              <li className="nav-item">
                <Link to ="viewriders" className="nav-link">
                  <i className="fas fa-list-alt nav-icon"   style= {{ color : '#60a727' }}></i>
                  <p style= {{ color : '#60a727' }}>Couriers List</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to = "pendingcourier" className="nav-link"  >
                  <i className="fas fa-circle-notch nav-icon" style= {{ color : '#60a727' }}></i>
                  <p style= {{ color : '#60a727' }}>Pending Couriers</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to = "blockedcourier" className="nav-link" >
                  <i className="fas fa-ban nav-icon" style= {{ color : '#60a727' }}></i>
                  <p style= {{ color : '#60a727' }}>Blocked Couriers</p>
                </Link>
              </li>
               <li className="nav-item">
                <Link to = "rejectedcourier" className="nav-link" >
                   <i className="fab fa-creative-commons-pd nav-icon" style= {{ color : '#60a727' }}></i>
                  <p style= {{ color : '#60a727' }}>Rejected Couriers</p>
                </Link>
              </li>
            </ul>
          </li>
           <li className="nav-item has-treeview">
            <Link to = "/" className="nav-link">
            <i className=" nav-icon fas fa-store" style= {{ color : '#60a727' }}></i>
              <p style= {{ color : '#60a727' }}>
                Stores
                <i className="fas fa-angle-left right"></i>
              </p>
            </Link>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to ="storelist" className="nav-link">
                  <i className="fas fa-list-alt nav-icon" style= {{ color : '#60a727' }}></i>
                  <p style= {{ color : '#60a727' }}>Stores List</p>
                </Link>
              </li>
              
               
            </ul>
          </li>
           
          
           <li className="nav-item">
            <Link to ="cuisine" className="nav-link">
              <i className="nav-icon fas fa-utensils" style= {{ color : '#60a727' }}></i>
              <p style= {{ color : '#60a727' }}>
                Cuisine Categories
               
              </p>
            </Link>
          </li>

           
          
      
            <li className="nav-item">
            <Link to ="menutable" className="nav-link">
              <i className="nav-icon fas fa-file-signature" style= {{ color : '#60a727' }}></i>
              <p style= {{ color : '#60a727' }}>
                Menus
               
              </p>
            </Link>
          </li>

            
          
         <li className="nav-item has-treeview">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-star-half-alt" style= {{ color : '#60a727' }}></i>
              <p style= {{ color : '#60a727' }}>
                Rating
                <i className="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to ="resturantrating" className="nav-link">
                  <i className="fas fa-star nav-icon" style= {{ color : '#60a727' }}></i>
                  <p style= {{ color : '#60a727' }}>Resturant Rating</p>
                </Link>
              </li>
              <li className="nav-item">
                 <Link to ="courierrating" className="nav-link" >
                  <i className="fas fa-star nav-icon" style= {{ color : '#60a727' }}></i>
                  <p style= {{ color : '#60a727' }}>Couriers Rating</p>
                </Link>
              </li>
              
              
            </ul>
          
          </li>
          <li className="nav-item">
            <Link to ="complains" className="nav-link">
              <i className= "nav-icon fas fa-angry" style= {{ color : '#60a727' }}></i>
              <p style= {{ color : '#60a727' }}>
                Complains
               
              </p>
            </Link>
          </li>

           <li className="nav-item has-treeview">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-file-invoice" style= {{ color : '#60a727' }}></i>
              <p style= {{ color : '#60a727' }}>
                Required Documents
                <i className="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to ="documents" className="nav-link">
                  <i className="fas fa-file-invoice nav-icon" style= {{ color : '#60a727' }}></i>
                  <p style= {{ color : '#60a727' }}>Documents For Resturants</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to  = "docrider"className="nav-link"  >
                  <i className="fas fa-file-invoice nav-icon" style= {{ color : '#60a727' }}></i>
                  <p style= {{ color : '#60a727' }}> Documents For Couriers</p>
                </Link>
              </li>
             
              
            </ul>
          </li>
         
          <li className="nav-item">
            <Link to ="earn" className="nav-link">
              <i className="nav-icon fas fa-hand-holding-usd" style= {{ color : '#60a727' }}></i>
              <p style= {{ color : '#60a727' }}>
                Earning Reports
               
              </p>
            </Link>
          </li>
         
        
          <li className="nav-item has-treeview">
            <a href="#" className="nav-link"  >
              <i className="nav-icon fas fa-tasks" style= {{ color : '#60a727' }}></i>
              <p style= {{ color : '#60a727' }}>
               CMS
                <i className="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to ="#" className="nav-link">
                  <i className="fas fa-info nav-icon" style= {{ color : '#60a727' }}></i>
                  <p style= {{ color : '#60a727' }}>About Us</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to ="#" className="nav-link">
                  <i className="fab fa-servicestack nav-icon" style= {{ color : '#60a727' }}></i>
                  <p style= {{ color : '#60a727' }}>Our Services</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to ="" className="nav-link">
                  <i className="far fa-address-card nav-icon" style= {{ color : '#60a727' }}></i>
                  <p style= {{ color : '#60a727' }}>Contact Us</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to ="#" className="nav-link">
                  <i className="far fa-question-circle nav-icon" style= {{ color : '#60a727' }}></i>
                  <p style= {{ color : '#60a727' }}>Terms and Conditions</p>
                </Link>
              </li>
              
            </ul>
          </li>
            <li className="nav-item">
            <a onClick = {this.logout} className="nav-link">
              <i className="nav-icon fas fa-sign-out-alt" style= {{ color : '#60a727' }}></i>
              <p style= {{ color : '#60a727' }}>
                Logout
              </p>
            </a>
          </li>
          
          
            <li className="nav-item">
            <Link to="" className="nav-link">
              <i className="nav-icon far fa-copyright" style= {{ color : '#60a727' }}></i>
              <b style= {{ color : '#60a727' }}>
               @2020 
              </b>
            </Link>
          </li>
          
          
          
        </ul>
      </nav>
    </div>
  </aside>

  );
} */

}
}
export default Sidebar;
