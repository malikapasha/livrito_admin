import React, {Component } from 'react';
import {BrowserRouter , Link , Redirect} from 'react-router-dom';
import Header from'./Header';
import Sidebar from './Sidebar';
import Content from './Content';
import Footer from './Footer';
import axios from 'axios';

class Dashboard  extends React.Component
{  
  state = {
     Items:[],
     Itemm:[],
      
    str:false,

    torder:0,
    rorder:0,
    corder:0,
    cnorder:0,

      tres:0,
    rres:0,
    cores:0,
    cnres:0,

      tstr:0,
    rstr:0,
    cstr:0,
    cnstr:0,
    
     
  }
  constructor(props) {
    super(props);
    this.getSub();
    this.getSubRes();
  
     
     
   this.logout = this.logout.bind(this);
  }
  getSub  = async () =>
    {
try{
  
  let orderdata;

  if(localStorage.getItem('admin')!=='true')
    {
      let data = await axios({
      method: "get",
      url:
        "http://www.cinemahd-apk.com:3005/resorder/"+localStorage.getItem("_id"),
    }).then(({ data }) => data);

    orderdata = data.order;
     console.log(data.order) 
  }
  else
  {
    let data = await axios({
      method: "get",
      url:
        "http://www.cinemahd-apk.com:3005/allorders",
    }).then(({ data }) => data);

    orderdata = data.allorders;
    console.log(data.allorders) 
  }
   
  const count = orderdata.length

    let ruord = 0;
    let cmord = 0;
    let caord = 0;

  for (let i = 0; i < orderdata.length ; i++)
   {
    if (orderdata[i].status === 'Delivered')
     {
       cmord = cmord + 1;
     }

    else if (orderdata[i].status === 'Rejected') {
         caord = caord + 1;
       }
       else
       {
         ruord = ruord + 1;
       }
    console.log(orderdata[i].status)
   }

  console.log('Rorder'+ ruord)
  console.log('Compled' + cmord)
       console.log('Cancel'+ caord)

    

  this.setState({ torder : count });
  this.setState({ rorder: ruord, corder: cmord, cnorder:caord });
   

}catch(err)
    {
      console.log(err)
    }

    }
     getSubRes  = async () =>
    {
try{
    let data = await axios({
      method: "get",
      url:
        "http://www.cinemahd-apk.com:3005/restaurants",
    }).then(({ data }) => data);
    console.log(data)
   var i;
    
    const  countres = data.restaurants.length;
      let ruord = 0;
    let cmord = 0;
    let caord = 0;

   this.setState({Items: data.restaurants , countres ,  })
   for ( i = 0 ; i < data.restaurants.length ; i++)
   {
          console.log(data.restaurants[i].status)

     if (data.restaurants[i].status === 'approved')
     {
       cmord = cmord + 1;
     }
     else if (data.restaurants[i].status === 'rejected') {
       caord = caord + 1;
     }
     else {
       ruord = ruord + 1;
     }


   }

  this.setState({ tres: countres });
  this.setState({ rres: ruord, cores: cmord, cnres:caord });

    }catch(err)
    {
      console.log(err)
    }
  
       try {
         let data = await axios({
           method: "get",
           url:
             "http://www.cinemahd-apk.com:3005/findAllstoresadmin",
         }).then(({ data }) => data);
         console.log(data)
         var i;

         const countres = data.stores.length;
         let ruord = 0;
         let cmord = 0;
         let caord = 0;

         this.setState({ Items: data.stores, countres, })
         for (i = 0; i < data.stores.length; i++) {
           console.log(data.stores[i].status)

           if (data.stores[i].status === 'approved') {
             cmord = cmord + 1;
           }
           else if (data.stores[i].status === 'rejected') {
             caord = caord + 1;
           }
           else {
             ruord = ruord + 1;
           }


         }

         this.setState({ tstr: countres });
         this.setState({ rstr: ruord, cstr: cmord, cnstr: caord });

       } catch (err) {
         console.log(err)
       }
  
  }



  componentWillMount()
  { 
     
 
   
// let email =   localStorage.getItem('email');
  
//  let _id =   localStorage.getItem('_id');
//  let loginstatus =  localStorage.getItem('loginstatus');
 
//  let name =    localStorage.getItem('name');
//  let  contact =      localStorage.getItem('contact');
//    let city =      localStorage.getItem('city');
//    let address =     localStorage.getItem('address');
//      let admin =   localStorage.getItem('admin');
//       let str = localStorage.setItem('str', true);


   }
 

  logout()
  {
    localStorage.setItem('admin' , '');
    localStorage.clear();
  }
  render(){
 if( localStorage.getItem('admin') == true )
 {
   return <Redirect to = "/" />
 }

  if (localStorage.getItem("loginstatus") !== "true") {
    return <Redirect to="/" />;
  }
    
 return(
    
  
<div class="wrapper">
 
  <Header/>
    <Sidebar/>
  <div class="content-wrapper">
   
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="" style = {{  fontSize:35 , fontWeight:'bold'}}>Orders Statistics</h1>
          
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Analytics</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    
    <section class="content">
      <div class="container-fluid">
    
        <div class="row">
          <div class="col-lg-3 col-6">
            <div class="small-box bg-info">
              <div class="inner">
                <h3> 0{this.state.torder}</h3>

                <p>Total Orders  </p>
              </div>
              <div class="icon">
                <i class="fas fa-lock"></i>
              </div>
              {/* <Link to = "table1" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link> */}
            </div>
          </div>
         
          <div class="col-lg-3 col-6">
          
            <div class="small-box bg-success">
              <div class="inner">
                   <h3>0{this.state.rorder}</h3>

                <p>Running Orders</p>
              </div>
              <div class="icon">  <i class="fas fa-spinner"></i>
              </div>
              {/* <Link to = "" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link> */}
            </div>
          </div>
     
          <div class="col-lg-3 col-6">
        
            <div class="small-box bg-warning">
              <div class="inner">
                   <h3> 0{this.state.corder }</h3>
                   
                <p>Completed Orders</p>
              </div>
              <div class="icon">
             <i  class="fas fa-check-circle"></i>
              </div>
              {/* <Link to = "" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link> */}
            </div>
          </div>
         
          <div class="col-lg-3 col-6">
          
            <div class="small-box bg-danger">
              <div class="inner">
                   <h3>0{this.state.cnorder }</h3>

                <p>Cancelled Orders</p>
              </div>
              <div class="icon">
               <i class="fas fa-times-circle"></i>
              </div>
              {/* <Link to = " " class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link> */}
            </div>
          </div>
          
  { localStorage.getItem("admin") === 'true' ? (
         <div >
            <h1 class="" style = {{fontWeight:'bold'}}>Statistics</h1>
          </div>

 ) : null}

  { localStorage.getItem("admin") === 'true' ? (

           <div class="container-fluid">
                  <div class="row">
          <div class="col-lg-3 col-6">
            <div class="small-box bg-info">
              <div class="inner">
                         <h3> 0{this.state.tres}</h3>

                <p>All Couriers</p>
              </div>
              <div class="icon">
                <i class="fas fa-store"></i>
              </div>
              {/* <Link to = "" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link> */}
            </div>
          </div>
         
          <div class="col-lg-3 col-6">
          
            <div class="small-box bg-success">
              <div class="inner">
                {/* <h3> {this.state._id}  0 <sup style= {{fontSize : "20px" }}></sup></h3> */}
                         <h3>0{this.state.cores}</h3>

                <p>Blocked Couriers</p>
              </div>
              <div class="icon">
             <i class="fas fa-truck-moving"></i>
             
              </div>
              {/* <Link to = "" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link> */}
            </div>
          </div>
     
          <div class="col-lg-3 col-6">
        
            <div class="small-box bg-warning">
              <div class="inner">
              

                         <h3>0{this.state.rres}</h3>
               
                
                 <p>All Sales Confirmers</p> 
              </div>
              <div class="icon">
               <i class="fas fa-user-plus"></i>
              </div>
              {/* <Link to = "" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link> */}
            </div>
          </div>
         
          <div class="col-lg-3 col-6">
          
            <div class="small-box bg-danger">
              <div class="inner">
                         <h3>0{this.state.cnres}</h3>

                <p>Blocked Sales Confirmers</p>
              </div>
              <div class="icon">
              <i class="fas fa-dolly-flatbed"></i>
              </div>
              {/* <Link to = "" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link> */}
            </div>
          </div>
          </div>
        </div>
         ) : null}



           { localStorage.getItem("admin") === 'true' ? (
         <div >
            <h1 class="" style = {{fontWeight:'bold'}}>Stores Statistics</h1>
          </div>

 ) : null}

  { localStorage.getItem("admin") === 'true' ? (

           <div class="container-fluid">
                  <div class="row">
          <div class="col-lg-3 col-6">
            <div class="small-box bg-info">
              <div class="inner">
                         <h3>0{this.state.tstr}</h3>

                         <p>All Stores</p>
              </div>
              <div class="icon">
                <i class="fas fa-store"></i>
              </div>
              {/* <Link to = "" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link> */}
            </div>
          </div>
         
          <div class="col-lg-3 col-6">
          
            <div class="small-box bg-success">
              <div class="inner">
                {/* <h3> {this.state._id}  0 <sup style= {{fontSize : "20px" }}></sup></h3> */}
                         <h3>0{this.state.cstr}</h3>
                         <p>Live Stores</p>
              </div>
              <div class="icon">
             <i class="fas fa-truck-moving"></i>
             
              </div>
              {/* <Link to = "" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link> */}
            </div>
          </div>
     
          <div class="col-lg-3 col-6">
        
            <div class="small-box bg-warning">
              <div class="inner">
              

                         <h3>0{this.state.rstr}</h3>
               
                
                         <p>Pending Stores</p> 
              </div>
              <div class="icon">
               <i class="fas fa-user-plus"></i>
              </div>
              {/* <Link to = "" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link> */}
            </div>
          </div>
         
          <div class="col-lg-3 col-6">
          
            <div class="small-box bg-danger">
              <div class="inner">
                         <h3>0{this.state.cnstr}</h3>

                <p>Rejected Stores</p>
              </div>
              <div class="icon">
              <i class="fas fa-dolly-flatbed"></i>
              </div>
              {/* <Link to = "" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link> */}
            </div>
          </div>
          </div>
        </div>
         ) : null}

       </div>

       


       </div>
      
      
       </section>
        </div>
       
     
  
     
  
  <Footer/>
  </div>
);
 
 
/*  else   {
     return(
    
  
<div class="wrapper">
 
  <Header/>
    <Sidebar/>
  <div class="content-wrapper">
   
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="" style = {{  fontSize:35 , fontWeight:'bold'}}>Orders Statistics</h1>
          
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Analytics</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    
    <section class="content">
      <div class="container-fluid">
    
        <div class="row">
          <div class="col-lg-3 col-6">
            <div class="small-box bg-info">
              <div class="inner">
                <h3>150</h3>

                <p>Total Orders</p>
              </div>
              <div class="icon">
                <i class="fas fa-lock"></i>
              </div>
              <Link to = "table1" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link>
            </div>
          </div>
         
          <div class="col-lg-3 col-6">
          
            <div class="small-box bg-success">
              <div class="inner">
                <h3>53<sup style= {{fontSize : "20px" }}></sup></h3>

                <p>Running Orders</p>
              </div>
              <div class="icon">  <i class="fas fa-spinner"></i>
              </div>
              <Link to = "" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link>
            </div>
          </div>
     
          <div class="col-lg-3 col-6">
        
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>44</h3>

                <p>Completed Orders</p>
              </div>
              <div class="icon">
             <i class="fas fa-check-circle"></i>
              </div>
              <Link to = "" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link>
            </div>
          </div>
         
          <div class="col-lg-3 col-6">
          
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>65</h3>

                <p>Cancelled Orders</p>
              </div>
              <div class="icon">
               <i class="fas fa-times-circle"></i>
              </div>
              <Link to = " " class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link>
            </div>
          </div>
         
       </div>
       </div>
      
      
       </section>
        </div>
       
     
  
     
  
  <Footer/>
  </div>
     ); 
  }*/
   
  }
}
export default Dashboard;