import React, {Component } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';


class Invoice extends Component
{  
  state = 
  {
     Items : [],
     itemdata:{},
  }
constructor() {
   super();
  // super(props);

   

    this.getItems();

 
}
 componentDidMount()
  {
  console.log(this.props);

     console.log('Value here, ',this.props.location.itemdata)

  }
getItems = async () =>
    {
    
   
      try{

    //  alert('data is loading')

        if (localStorage.getItem('order_type') === 'str')
        {

  let data =   await axios({
      method: 'get' ,
    url: 'https://livrito.herokuapp.com/orderproduct/' + localStorage.getItem('orid') 
    }).then(({data}) => {
       console.log(data.menu);
       
this.setState({Items: data.menu});
    })

  }
  else
  {
          let data = await axios({
            method: 'get',
            url: 'https://livrito.herokuapp.com/ordermenu/' + localStorage.getItem('orid') 
          }).then(({ data }) => {
            console.log(data.menu);

            this.setState({ Items: data.menu });
          })
  }
}
catch(err)
    {
      console.log(err)
    }
   
 }
 
render()
{

  if (localStorage.getItem("loginstatus") !== "true") {
    return <Redirect to='/' />
  }

//localStorage.getItem('pid')
     
     
                    
  return(
 <div className="wrapper">
 <Header/>
 <Sidebar/>
  <div className="content-wrapper">
   
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Details</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Details</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            
            <div className="invoice p-3 mb-3">
              
              <div className="row">
                <div className="col-12">
                  <h4>
                    <i className="fas fa-globe"></i>
                  {/* //  <small className="float-right">Date: {localStorage.getItem('orcreatedAt')}</small> */}
                  </h4>
                </div>
              
              </div>
            
              <div className="row invoice-info">
               
               
                <div className="col-sm-4 invoice-col">
                 User Information
                  <address>
                    Name: 
                     <strong> {this.props.location.itemdata.name}</strong>

                    <br/>
                   
                    
                  
                  National Card Number:
                        <strong>  {this.props.location.itemdata.national_card_number}</strong>
                    <br/>
                   Contact:
                      <strong>  {this.props.location.itemdata.telephone}</strong>
<br/>

                     Whatsapp:
                      <strong>  {this.props.location.itemdata.whatsapp}</strong>
                     <br/>
                      
                     Facebook: 
                      <strong>  {this.props.location.itemdata.facebook}</strong>
                     <br/>

                     Pickup Price:
                      <strong>  {this.props.location.itemdata.package_pickup_price}</strong>
                     <br/>

                   Storage Price: 
                      <strong>  {this.props.location.itemdata.storage_price}</strong>
                     <br/>

                    Email:
                      <strong>  {this.props.location.itemdata.email}</strong>
                     <br/>

                  </address>
                  
                 
                </div>
              
                
              </div>
            
            

              <div className="row">
               
               
               
                <div className="col-6">
               

                  {/* <div className="table-responsive">
                    <table className="table">
                    
                    
                  
                      <tr>
                        <th>Shipping charges:</th>
                        <td></td>
                       
                      </tr>
                        <tr>
                            <th>Total:     <strong> {localStorage.getItem('orbill')} DA</strong> </th>
                        <td></td>
                      </tr>
                  <tr>
                            <th>Order Promo    <br/> <strong> {localStorage.getItem('ororder_message')}</strong> </th>
                              <th>Order Discount <br/> <strong> {localStorage.getItem('ordiscount')}</strong> </th>
                             <th>Delivery Charges    <br/> <strong> {localStorage.getItem('orride_total')}</strong> </th>
                            
                        <td></td>
                      </tr>
                    </table>
                  </div> */}

                </div>
             
              </div>
              <div className="row no-print">
                <div className="col-12">
                  {/* <Link to ="invoiceprint" target="_blank" className="btn btn-default"><i className="fas fa-print"></i> Print</Link>
                  
                          <button onClick={() => window.print()}>PRINT</button> */}

                  <button type="button" onClick={() => window.print()} className="btn btn-primary float-right" style= {{ "margin-right": "5px" , background: ' #28a745'}}>
                    <i className="fas fa-download" ></i> Generate PDF
                  </button>
                </div>
              </div>
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
export default Invoice

