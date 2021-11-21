import React, { Component } from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { Button, Form, Row, Col, Label, Dropdown, CustomInput, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, FormGroup, ModalBody, ModalFooter, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Header from './Header';
import Switch from "react-switch";
import StarRatings from 'react-star-ratings';
import Content from './Content';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import axios from 'axios';
class ProductView extends React.Component {
  state = {
    Items: [],
    checked: false,
    rows: '',
    cols: '',
    file_path:'',
    newOrderModal:false,
  }

  constructor() {
    super();
    this.getItems();
    this.handleDeleteRow = this.handleDeleteRow.bind(this);

    this.handleChange = this.handleChange.bind(this);


  }

  handleChangee = event =>{

this.setState({file_path: event.target.value});

  // let fileObj = event.target.value;

  let fileObj = event.target.files[0];

    this.setState({
          filepath:fileObj
        });

 ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else {
          console.log(resp.rows[1]);

        this.setState({
          cols: resp.cols,
          rows: resp.rows
        
        });
      }
    });

};

 toggleNewOrders()
{

  this.setState({
    newOrderModal: true
  }) 
}

importdata()
 {
 
   this.setState ({
    newOrderModal: !this.state.newOrderModal
   })
 }

 
  addproductdata = event =>
 {
 
  //  this.setState ({
  //   newOrderModal: !this.state.newOrderModal
  //  })
 console.log('Adding Data');

  console.log(this.state.filepath);

    let data = [];

  for(let i =1; i<this.state.rows.length;i++)
  {
     console.log(this.state.rows[i]);
      console.log(this.state.rows[i][0]);

    let row = {
      name: this.state.rows[i][0],
      description: this.state.rows[i][4],
      price: this.state.rows[i][6],
      pr_brand: this.state.rows[i][5],
      pr_qrcode: this.state.rows[i][8],
      pr_size: this.state.rows[i][3],
      pr_volume: this.state.rows[i][7],
      pr_image: this.state.rows[i][1],

      sub_id: this.state.rows[i][2],
      str_id: this.state.rows[i][9],

    }
      
    data.push(row);

  }

   console.log("Data" + data);

    const url = "https://livrito.herokuapp.com/bulkproduct";

fetch(url, { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response =>  { 
  console.log('Successfully Added Data');
  if(response.status)
  {
    window.location.reload();
  }
}
  ); 


  
 }

   handleClose = () => {
    this.setState({ newOrderModal: false })
  
}

  handleDeleteRow(i) {
    let Items = [...this.state.Items]
    Items.splice(i, 1)
    this.setState({
      Items: Items
    })
  }
  getItems = async () => {
    // try {

      let st_id = '? ';

       console.log('consoel' + st_id);
       
      if(localStorage.getItem('str') === 'true')
      {
        st_id = localStorage.getItem('_id');
        localStorage.setItem('storeid',st_id);
      }
      else
      {
         st_id = localStorage.getItem('storeid');
      }
    
  console.log('consoel' + st_id);

      let data = await axios({
        method: 'get',
        url: 'https://livrito.herokuapp.com/productstr/'+st_id
      }).then(({ data }) =>
        data);
      console.log(data)
      this.setState({ Items: data.data })
    // } catch (err) {
    //   console.log(err)
    // }
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  fileHandler = (event) => {
    let fileObj = event.target.files[0];
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else {
          console.log(resp.rows);

        this.setState({
          cols: resp.cols,
          rows: resp.rows,
        });
      }
    });
  }
  render() {

    // if (localStorage.getItem("admin") !== "true") {
    //   return <Redirect to='/' />
    // }
    if (localStorage.getItem("loginstatus") !== "true") {
      return <Redirect to='/' />
    }

    return (
      <div class="wrapper">
        <Header />
        <Sidebar />
        <div class="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-10">
                  
                  {localStorage.getItem("admin") === "true" ? (
                  <h1><b>Products( {localStorage.getItem('storen')} )</b>
                  </h1>
) :   <h1><b>Store ID: ( {localStorage.getItem('_id')} )</b>
                  </h1>}

                </div>
              
              </div>
            </div>
          </section>
          <section class="content">
            <div class="row">
              <div class="col-12">

                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">Product Table

              </h3>
                    <Link to="productadd" style={{ float: 'right', marginLeft: 2 }} >
                    
                      <Button class="btn  btn-success" style={{ float: 'right', marginLeft: 2 }} >Add a New Product<i class="fas fa-check-circle"></i></Button> 

                  </Link>

       <Button class="btn  btn-success" style={{ float: 'right', marginLeft: 2 }}  onClick ={this.importdata.bind(this)} >Import New Products<i class="fas fa-check-circle"></i></Button> 





                  </div>

   <Modal isOpen={this.state.newOrderModal} toggle={this.toggleNewOrders.bind(this)} >
        <ModalHeader toggle={this.toggleNewOrders.bind(this)}>Import Data Sheet </ModalHeader>
        <ModalBody>
        
        <FormGroup>
         <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" label="Yo, pick a file!" onChange = {this.fileHandler} />
        </FormGroup>
      
          
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick = {this.addproductdata}>Import</Button>
          <Button color="secondary" onClick = {this.handleClose} >Cancel</Button>
        </ModalFooter>
      </Modal>

                  <div class="card-body">

                    <table class="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Name</th>

                          <th>Description</th>
                          <th>Image</th>
                          <th>Price</th>
                          <th>Product Size</th>
                          <th>Product Brand</th>
                          <th>Volume</th>
                          <th>Qr Code</th>

                          <th>Action</th>



                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.Items.map((item, i) =>
                            <tr className="trow" key={i}   >
                              <td hidden="true">{item._id}</td>
                              <td>{i+1}  </td>

                              <td>{item.name} </td>
                            
                              <td>{item.description}</td>

                              <td><img src={item.pr_image} style={{ width: 50, height: 50 }} /></td>
                              <td>{item.price}</td>
                              <td>{item.pr_size}</td>
                              <td>{item.pr_brand}</td>
                              <td>{item.pr_volume}</td>
                              <td>{item.pr_qrcode}</td>




                              <td>

                                <a style={{ color: '#fff' }} class="btn btn-info btn-success" >
                                  <i class="far fa-edit">
                                  </i>

                                </a>


                              </td>

                            </tr>
                          )}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th ></th>

                        </tr>
                      </tfoot>
                    </table>



                  </div>

                </div>
              </div>
            </div>
          </section>

        </div>
        <Footer />
      </div>


    );
  }

}
export default ProductView