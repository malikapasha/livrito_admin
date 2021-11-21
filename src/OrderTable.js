import React, {Component } from 'react';
import Sidebar from './Sidebar';
import { Button, Label,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import axios from 'axios';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';

class OrderTable  extends Component
{
  state = {
    
       Items : [],
       ryderItems:[],
       ryderdetail:[],
    dvalue: '?',
     order_id: '?',
      
       newOrderModal: false,
       resOrderModal:false,
     
       editData:
       {
         id: '',
         status:'',

       } ,
        
      
    };
    apiUsers = [];
    
  constructor() {
    super()
    this.getItems();
   this.handleDeleteRow = this.handleDeleteRow.bind(this);
    
  }

   handleChange = (event) => {
    this.setState({ dvalue: event.target.value });

      console.log(event.target.value)
   }

   assignow = (order_id) => {
    // this.setState({ dvalue: event.target.value });

      console.log(this.state.dvalue);

        this.setState({ order_id: order_id });

      var answer = window.confirm("Sure to Assign Order?")
if (answer) {
  

 let turl = 'https://livrito.herokuapp.com/assignorder';
     fetch(turl, {
       method: 'POST',
       body: JSON.stringify({
         _id: this.state.order_id,
         assigned_to: this.state.dvalue,
       }),
       headers: { 'Content-Type': 'application/json' }
     })
       .then(res => res.json())
       .then((data) => {

         console.log(data)
     
          //  window.location.reload(true)

       })
       .catch(error => console.error('Error:', error))

       
}
else {
    //some code
}

  };

  
  
   handleorderid = (order_id) => {
    this.setState({ order_id: order_id });

          console.log(order_id)

      

  };
  handleDeleteRow(i) {
    let Items = [...this.state.Items]
    Items.splice(i, 1)
    this.setState({ 
      Items: Items
    })
  }
  
 getItems = async () =>
    {

    
      try{
  let turl = 'https://livrito.herokuapp.com/allorders';
  if(localStorage.getItem('admin')!='true')
  {
    turl =
      "https://livrito.herokuapp.com/resorder/"+localStorage.getItem('_id');

       let data = await axios({
    method: "get",
    url: turl,
  }).then(({ data }) => {
    console.log(data.order);
    this.apiUsers = data.order;
    this.setState({ Items: data.order });
  });

  }
  else
  {
    
     turl = 'https://livrito.herokuapp.com/allorders';

     let data = await axios({
    method: "get",
    url: turl,
  }).then(({ data }) => {
    console.log(data.allorders);
    this.apiUsers = data.allorders;
    this.setState({ Items: data.allorders });
  });

  }
    //  alert('data is loading')

        try {



          let datarid = await axios({
            method: 'get',
            url: 'https://livrito.herokuapp.com/approvedryders'
          }).then(({ data }) => {
          
         
            this.setState({ ryderItems: data.ryders, dvalue: data.ryders[0]._id })
            console.log(this.state.dvalue);
          })
        } catch (err) {
          console.log(err)
        }

 
}
catch(err)
    {
      console.log(err)
    }
   
 }
 
 


toggleNewOrders()
{

  this.setState({
    newOrderModal: true
  }) 
}

 
 editOrder(_id, status)
 {
   console.log(status)
   this.setState ({
     editData: {_id , status} , newOrderModal: !this.state.newOrderModal
   })
 }

  rydershow = async (assigned_to) => {
    console.log(assigned_to)

     try{
    let data = await axios({
      method: 'get' ,
      url:'https://livrito.herokuapp.com/ryder/'+assigned_to 
    }).then(({ data}) =>
    data);
    console.log(data)
    this.setState({ ryderdetail: data.ryder[0]})
    }catch(err)
    {
      console.log(err)
    }

    this.setState({
      rydermodel: !this.state.rydermodel
    })
  }

   deletenow(_id)
 {
console.log(_id);

if (window.confirm('Sure to Delete?')) {
  // Save it!
 

const url = "https://livrito.herokuapp.com/deleteorder/"+_id;
const data = { _id: this.state.editData._id, 
status:this.state.editData.status, 

  }
fetch(url, { method: 'GET', 
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
     window.location.reload()
    
      
})
.catch(error => console.error('Error:', error))

 console.log('Thing was saved to the database.');
} else {
  // Do nothing!
  console.log('Thing was not saved to the database.');
}

 }


  invoice(order_type,_id, name,cell , total_bill , discount,address , order_message,createdAt,ride_total)
 {
    console.log(name);

    var date = new Date('6/29/2011 4:52:48 PM UTC');

     localStorage.setItem('order_type', order_type);
    localStorage.setItem('orname', name);
    localStorage.setItem('orid', _id);
     localStorage.setItem('orbill', total_bill);
      localStorage.setItem('ordiscount', discount);

       localStorage.setItem('oraddress', address);
        localStorage.setItem('ororder_message', order_message);

         localStorage.setItem('orcell', cell);
 

         localStorage.setItem('orcreatedAt', new Date(createdAt));

           localStorage.setItem('orride_total', ride_total);
         
    
    this.props.history.push('/invoice');
   
    
 }

 updateOrder()
 {
  

   let {status} = this.state.editData;

    console.log('id is'+this.state.editData._id)

   console.log(" _id : " +  this.state.editData._id)
console.log(" status: " + this.state.editData.status)





const url = "https://livrito.herokuapp.com/updateorderstatus";
const data = { _id: this.state.editData._id, 
status:this.state.editData.status, 

  }
fetch(url, { method: 'POST', 
body: JSON.stringify({
   _id:  this.state.editData._id, 
status:this.state.editData.status, 
}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
     window.location.reload()
    
      
})
.catch(error => console.error('Error:', error))

 }
 handleClose = () => {
    this.setState({ newOrderModal: false })
     this.setState({resOrderModal : false })

   this.setState({ rydermodel: false })
}


  pendingHandler(e)
{
  console.log(e.target.value);

        let newArray = this.apiUsers.filter((d)=>{
        
            let clickValue = d._id.toLowerCase();
            return clickValue.indexOf(e.target.value) !== -1;
        });
        console.log(newArray)
        this.setState({
            Items:newArray
})
}
 statusHandler = (e) =>
{
  console.log(e.target.value);

        let newArray = this.apiUsers.filter((d)=>{
        
            let clickValue = d.order_type.toLowerCase();
            return clickValue.indexOf(e.target.value) !== -1;
        });
        console.log(newArray)
        this.setState({Items:newArray});
}

  orderHandler = (e) => {
    console.log(e.target.value);

    let newArray = this.apiUsers.filter((d) => {

      let clickValue = d.status.toLowerCase();
      return clickValue.indexOf(e.target.value) !== -1;
    });
    console.log(newArray)
    this.setState({ Items: newArray });
  }
 togglevehicles(res_id,rtype) {

  console.log('ID is: '+res_id);
  if(rtype === 'res')
  {
     localStorage.setItem('searchid',res_id);
     this.props.history.push('/resturanttable');
 }
 else
 {
    localStorage.setItem('searchid', res_id);
    this.props.history.push('/storelist');
 }
  }

  render()
  {

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
            <h1></h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Order Table</li>
             
            
                  <Modal isOpen={this.state.rydermodel}  >
                    <ModalHeader style={{ background: 'green', color: '#fff' }}><p style={{ color: '#fff' }}>View Rider Details</p> </ModalHeader>
                    <ModalBody>

                      <FormGroup>
                        <img src={this.state.ryderdetail.image_path} style={{ width: 100, height: 100 }} />
                      </FormGroup>

                    <Label>Name </Label>
                      <FormGroup>
                        <Input type="text" value={this.state.ryderdetail.name} placeholder="Name" />
                      </FormGroup>
                      <Label>Contact </Label>
                      <FormGroup>
                        <Input type="text" value={this.state.ryderdetail.contact} placeholder="Contact" />
                      </FormGroup>
                      <Label>Vehicle Type</Label>
                      <FormGroup>
                        <Input type="text" value={this.state.ryderdetail.vehicle_type} placeholder="Vehicle Type" />
                      </FormGroup>
                      <Label>Vehicle Number </Label>
                      <FormGroup>
                        <Input type="text" value={this.state.ryderdetail.vehicle_number}  placeholder="Vehicle Number" />
                      </FormGroup>

                     
                      <Label>Online Status</Label>
                      <FormGroup>
                        <Input type="text" value={this.state.ryderdetail.is_online} placeholder="Status" />
                      </FormGroup>


                    </ModalBody>
                    <ModalFooter>

                      <Button color="secondary" onClick={this.handleClose} >Cancel</Button>
                    </ModalFooter>
                  </Modal>
            

      <Modal isOpen={this.state.newOrderModal} toggle={this.toggleNewOrders.bind(this)}>
        <ModalHeader  style = {{background:'green' , color:'#fff'}} ><p style = {{color:'#fff'}}> Update Promo</p> </ModalHeader>
        <ModalBody>
        
        <FormGroup>
          <Label>Status </Label>
         <div>
      <select style = {{width:'70%' , padding:8, height:'80%' , borderRadius:'15' ,}}  value ={ this.state.editData.status} onChange = {(e) =>{
          let {editData} = this.state;
          editData.status = e.target.value;
          this.setState({editData})
        }}>
          <option  onChange = {(e) =>{
          let {editData} = this.state;
          editData.status = e.target.value;
          this.setState({editData})
        }}>Pending</option>
          <option >Accepted</option>
          <option >Packed</option>
            <option >On Way</option>
          <option  >Delivered</option>
          <option  >Rejected</option>
      </select>
      
      </div>
     
      </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.updateOrder.bind(this)}>Update</Button>
          <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    
   
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

             {localStorage.getItem("admin") === "true" ? (
              <h3 class="card-title"> 

              

               <button type = "submit"  value={this.state.value}  onClick={this.statusHandler.bind(this)}  class = "btn btn-info"  style= {{float:'right', marginLeft:2}} ><i class="fas fa-list"></i>All</button>
                  
               {/* <button type = "submit"   value= "res"  onClick={this.statusHandler.bind(this)}    class = "btn btn-success"  style= {{float:'right', marginLeft:2}} ><i class="fas fa-building"></i>Resturant</button> */}
                <button type = "submit"    value= "str"  onClick={this.statusHandler.bind(this)}   class = "btn btn-success" style= {{float:'right', marginLeft:2}} ><i class="fas fa-store"></i>Store</button>  </h3>
            
            ) : null}

             <Input type="text"  value={this.state.value}   onChange ={this.pendingHandler.bind(this)}  placeholder="Search for..."   style = {{float:'right' , width:'20%' , marginRight:5}} />
                
            </div>
                <div class="card-header">
                  <h3 class="card-title"> 
                    <button type="submit" onClick={this.orderHandler.bind(this)} class="btn btn-info" style={{ float: 'right', marginLeft: 2 }} ><i class="fas fa-list"></i>All</button>

                    <button type="submit" value="pending" onClick={this.orderHandler.bind(this)} class="btn btn-danger" style={{ float: 'right', marginLeft: 2 }} ><i ></i>Pending</button>
                <button type="submit" value="accepted" onClick={this.orderHandler.bind(this)} class="btn btn-danger" style={{ float: 'right', marginLeft: 2 }} ><i ></i>Accepted</button>
                    <button type="submit" value="packed" onClick={this.orderHandler.bind(this)} class="btn btn-danger" style={{ float: 'right', marginLeft: 2 }} ><i ></i>Packed</button>
                  <button type="submit" value="on way" onClick={this.orderHandler.bind(this)} class="btn btn-danger" style={{ float: 'right', marginLeft: 2 }} ><i ></i>On Way</button>
                   <button type="submit" value="delivered" onClick={this.orderHandler.bind(this)} class="btn btn-danger" style={{ float: 'right', marginLeft: 2 }} ><i ></i>Delivered</button>
                    <button type="submit" value="rejected" onClick={this.orderHandler.bind(this)} class="btn btn-danger" style={{ float: 'right', marginLeft: 2 }} ><i ></i>Rejected</button>
                  </h3>
              </div>
           
            <div className="row">
            <div className="col-12 table-responsive table-bordered">
              <table  class="table table-bordered ">
                <thead style ={{width:'100%'}}>
                <tr>
                  <th>Order Id</th>
                  <th>Name</th>
                          {localStorage.getItem("admin") === "true" ? (
                   <th >Store Details</th>
                    ) : null}

                 <th >Address</th>
                  <th > Total Bill </th>
                  
                  
               
                   
              
                    {/* <th>Assigned To</th> */}
                     <th>Current Status </th>
                
                  
                   <th> Action </th>
                   
                </tr> </thead> <tbody>                 

                    {
                this.state.Items.map((item , i) =>
               
                  
            <tr className="trow" key = {item._id} orderidv = {item._id}> <td  >{item._id }</td>
            
          <td>  {item.name} 
        </td> 
                    {localStorage.getItem("admin") === "true" ? (
         <td> 
         
                    

                          
                      <button type="submit" class="btn btn-block btn-outline-success btn-sm" onClick={this.togglevehicles.bind(this, item.res_id,item.order_type)}  >
                        {item.order_type === "res" ? (
                        <i class="fas fa-shopping-basket" style={{ color: 'green' }}>

                          
                          Vendor Details
                      </i>
                        ) : 
                          <i class="fas fa-shopping-basket" style={{ color: 'green' }}>


                            Vendor Details
                      </i>
                        }
                        
                        </button>

                     

         </td> 
          ) : null}
          
         <td> {item.address} </td>  
         <td> {item.total_bill} </td>
      
         
    
       {/* {item.assigned_to_delivery !== "0" ? (
        
         <td > {item.assigned_to_delivery} 
         
          <button  style= {{float:'right', marginLeft:2}}  class="btn btn-info btn-sm" onClick ={this.rydershow.bind(this , item.assigned_to_delivery)} >
                              <i class="far fa-address-book">
                              </i>
                            
                          </button>

         </td>
         
          ) : 
          <div>
          
           <td > Not Assigned Yet </td> */}
           {/* {localStorage.getItem("admin") === "true" ? (
 <td >

    <button  style= {{float:'right', marginLeft:2}}  class="btn btn-info btn-sm" onClick ={this.assignow.bind(this,item._id)} >
                              <i class="fa fa-check-square-o">
                              Assign Now
                              </i>
                            
                          </button>
        
             <Input type="select" id="exampleSelect" placeholder='Select a Ryder'  onChange={this.handleChange} 
             onClick={this.handleorderid.bind(this,item._id)}>
                        {this.state.ryderItems.map(item => (
            <option key={item.value} value={item._id}>
            { item.name} -- { item.is_online}
            </option>

          ))}
        </Input>
        
        </td>
  ) : 
    <td > Not Assigned Yet </td>
  } */}
          
      {/* </div>

          } */}

          <td> <button class="btn btn-block btn-outline-success btn-sm"> {item.status} </button></td>
        
        <td style ={{display:'flex'}} >
                        
                          <button  class="btn btn-info btn-sm" onClick ={this.invoice.bind(this , item.order_type,item._id ,item.name,item.cell , item.total_bill , item.discount, item.address, item.order_promo,item.createdAt,item.ride_total)} >
                              <i class="far fa-folder">
                              </i>
                            
                          </button>

                          
                        
                          
                      <button type="submit" style= {{float:'right', marginLeft:2}} class="btn btn-block btn-outline-success btn-sm" onClick={this.editOrder.bind(this, item._id, item.status)} >Update Status</button>

  <button  class="btn btn-info btn-sm"
  style={{marginLeft:5}}
   onClick ={this.deletenow.bind(this ,item._id )} >
                              <i class="fa fa-trash">
                              </i>
                            
                          </button>

                      </td>

                                </tr>
                               ) }
                     
                   
                 
              
         
               
             
                </tbody>
                
              </table>
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
export default OrderTable