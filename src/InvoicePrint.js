import React, {Component } from 'react';

const InvoicePrint = () =>
{

    return(
        
  <div className="wrapper">

    <section className="invoice">
   
  
    <div className="row">
      <div className="col-12">
        <h2 className="page-header">
          <i className="fas fa-globe"></i> Resturant.
          
        </h2>
      </div>
      
    </div>
   
    <div className="row invoice-info">
      
     
                  
                <div className="col-sm-4 invoice-col">
                  From
                  <address>
                    <strong>Abc Resturant.</strong><br/>
                    
                    Phone: (804) 123-5432<br/>
                    Email: info@almasaeedstudio.com
                  </address>
                </div>
               
                <div className="col-sm-4 invoice-col">
                  To
                  <address>
                    <strong>Food Buyer</strong><br/>
                   
                    
                  </address>
                </div>
              
                
              
     
      
    </div>
   
    <div className="row">
      <div className="col-12 table-responsive">
        <table className="table table-striped">
          <thead>
          <tr>
            <th>Product</th>
            
            <th>Quantity </th>
            <th>Price</th>
            <th>Discount(%)</th>
            <th>Total</th>

          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
           
            <td>455-981-221</td>
            <td></td>
            <td>2%</td>
            <td>$30</td>
          </tr>
         
          
        
          </tbody>
        </table>
      </div>
   
    </div>
 

    <div className="row">
     

      <div className="col-6">
        <p className="lead">Amount Due 2/22/2014</p>

        <div className="table-responsive">
          <table className="table">
            <tr>
              <th style= {{ "width":"50%"}}>Subtotal:</th>
              <td>$25</td>
            </tr>
           
            <tr>
              <th>Shipping:</th>
              <td>$5</td>
            </tr>
            <tr>
              <th>Total:</th>
              <td>$30</td>
            </tr>
          </table>
        </div>
      </div>
    
    </div>
   
  </section>
 
 
</div>


    );
    

}
export default InvoicePrint