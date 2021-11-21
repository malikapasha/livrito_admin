import React from 'react';
import {Switch , Route, Router, Redirect} from 'react-router-dom';

import Dashboard from './Dashboard';
import GeneralSetting from './GeneralSetting';
import ProductView from './ProductView';
import Com from './Com';
import ProductAdd from './ProductAdd';
import Complains from './Complains';
import AddSupplements from './AddSupplements';
import ViewProducts from './ViewProducts';
import PushNotif from './PushNotif';
import AddStore from './AddStore';
import StoreList from './StoreList';
import Vehicle from './Vehicle';
import AddVehicle from './AddVehicle';
import Table from './Table';
import Login from './Login';
import RejectedRes from './RejectedRes';
import BlockedRes from './BlockedRes';
import PendingRes from './PendingRes';
import ordertable from './OrderTable';

import jobtable from './JobTable';


import Cuisine from './Cuisine';
import Documents from './Documents';
import BlockedCourier from './BlockedCourier';
import PendingCourier from './PendingCourier';
import RejectedCourier from './RejectedCourier';
import StoreRating from './StoreRating';
import MenuTable from './MenuTable';
import ResturantRating from './ResturantRating';
import CourierRating from './CourierRating';
import DocRider from './DocRider';
import ResturantTable from './ResturantTable';
import ViewResturants from './ViewResturants';
import AddCuisine from './AddCuisine';
import Invoice from './Invoice';
import NextSub from './NextSub';
import SubCat from './SubCat';
import MainCat from './MainCat';
import InvoicePrint from './InvoicePrint';
import Profile from './Profile';
import Contact from './Contact';
import Orders from './Orders';
import Reset from './Reset';

import RiderOrders from './RiderOrders';
import FreeDelivery from './FreeDelivery';
import SharingGift from './SharingGift';

import DeliveryCharges from './DeliveryCharges';

import Menu from './Menu';
import AddResturant from './AddResturant';

import AddMenu from './AddMenu';
import ViewRiders from './ViewRiders';
import AddRider from './AddRider';
import OrderMenu from './OrderMenu';
import UpdateOrders from './UpdateOrders';
import Riders from './Riders';
import AddUser from './AddUser';
import AddPromos from './AddPromos';
import ViewPromo from './ViewPromo';
import ViewUser from './ViewUser';
import Footer from './Footer';
import Form from './Form';
import Earning from './Earning';
import ResOrders from './ResOrders';
import ResturantSignUp from './ResturantSignUp';

import StoreLogin from './StoreLogin';

import history from "./history";

import error404 from "./Errors";

import ViewSales from './ViewSales';

import userdetails from './userdetails';

export const myContext = React.createContext();
class  Content extends React.Component
{
   constructor(props) {
      super(props)
   
    
    
     this.state={
      token:'',
      email:"",
    };

  
   }

    
   
   render()
   {

  
 return (
  //  <Router basename={"/secure/cwp_4b91"} history={history}>
    // <Router basename={"/secure/cwp_4b91"} history={history}>
       <Router basename={"/"} history={history}>
     <Switch>
       <Route
         path="/aboutus"
         component={() => {
           window.location.href = "http://livritomanager.livrito.com/";
           return null;
         }}
       />

       {/* <Route path="" component={error404} /> */}
       {/* <Route path="*" component={error404} />  */}
       {/* <Route component={error404} />  */}

       <Route exact path="/" component={Login} />
       <Route exact path="/404error" component={error404} />
      
       <Route exact path="/storelogin" component={StoreLogin} />

       <Route exact path="/deliverycharges" component={DeliveryCharges} />

       <Route path="/dashboard" component={Dashboard} />
       {/* <Route path="/cuisine" component={Cuisine} /> */}
       <Route path="/vehicle" component={Vehicle} />
       <Route path="/productadd" component={ProductAdd} />
       <Route path="/addstore" component={AddStore} />
       <Route path="/menu" component={Menu} />

       <Route path="/resorders" component={ResOrders} />
       <Route path="/addmenu" component={AddMenu} />
       <Route path="/docrider" component={DocRider} />
       <Route path="/resturantsignup" component={ResturantSignUp} />
       <Route path="/ordermenu" component={OrderMenu} />
       <Route path="/updateorders" component={UpdateOrders} />

       <Route path="/addpromos" component={AddPromos} />
       <Route path="/viewpromo" component={ViewPromo} />
       <Route path="/invoiceprint" component={InvoicePrint} />
       <Route path="/footer" component={Footer} />
       <Route path="/generalsetting" component={GeneralSetting} />
       <Route path="/com" component={Com} />
       <Route path="/push" component={PushNotif} />
       <Route path="/earn" component={Earning} />
       <Route path="/documents" component={Documents} />
       <Route path="/resturanttable" component={ResturantTable} />

       <Route path="/storelist" component={StoreList} />
       <Route path="/addsupplements" component={AddSupplements} />
       <Route path="/complains" component={Complains} />
       {/* <Route path="/addcuisine" component={AddCuisine} /> */}
       {/* <Route path="/addvehicle" component={AddVehicle} /> */}

       <Route path="/viewproducts" component={ViewProducts} />
       <Route path="/productview" component={ProductView} />

       {/* <Route path="/free" component={FreeDelivery} /> */}
       <Route path="/share" component={SharingGift} />
       {/* <Route path="/riderorders" component={RiderOrders} /> */}
       <Route path="/menutable" component={MenuTable} />

       {/* <Route path="/table" component={Table} /> */}
       { <Route path="/storerating" component={StoreRating} /> }
       <Route path="/ratingtable" component={ResturantRating} />
       { <Route path="/courierrating" component={CourierRating} /> }
       <Route path="/ordertable" component={ordertable} />
  <Route path="/jobtable" component={jobtable} />
       
       {/* <Route path="/rejectedres" component={RejectedRes} />
       <Route path="/pendingres" component={PendingRes} /> */}
       {/* <Route path="/blockedres" component={BlockedRes} /> */}
       <Route path="/reset" component={Reset} />

       {/* <Route path="/blockedcourier" component={BlockedCourier} />
       <Route path="/pendingcourier" component={PendingCourier} />
       <Route path="/rejectedcourier" component={RejectedCourier} /> */}

       <Route path="/nextsub" component={NextSub} />
       <Route path="/subcat" component={SubCat} />
       <Route path="/maincat" component={MainCat} />

       <Route path="/viewresturants" component={ViewResturants} />
       <Route path="/addrider" component={AddRider} />
       <Route path="/riders" component={Riders} />
       <Route path="/addresturant" component={AddResturant} />

       <Route path="/profile" component={Profile} />
       <Route path="/orders" component={Orders} />

       <Route path="/invoice" component={Invoice} />

       <Route path="/viewriders" component={ViewRiders} />

 <Route path="/viewsales" component={ViewSales} />

       
       <Route path="/adduser" component={AddUser} />
    
         <Route path="/viewuser" component={ViewUser} />
      
       <Route path="/userdetails" component={userdetails} />

      

     </Switch>
   </Router>
 );
}
}
export default Content