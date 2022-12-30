import React, { Component } from 'react';
import Sidebar from './Sidebar';
import { Button, Label,Dropdown, Form, CustomInput,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Header from './Header';
import {Link , BrowserRouter, Redirect} from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';


class NextSub extends Component
{
 state = {
  Items:[],
  Itemm:[],
   title:'',
    
      rows: '',
    cols: '',
    file_path:'',
   newOrderModal: false,

     image_path:'',
  image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
  image_base64: '',

    sub_image:'',
    sub_type:'' ,
  newOrderModal: false,
   maincat_id:'0',
       editData:
       {
         id: '',
         name:'',
        price:'',
        

       }
 };
  constructor() {
   super();
   this.getItems();
     this.handleDeleteRow = this.handleDeleteRow.bind(this);
     this.getSub();
 
     
 }
handleDeleteRow(i) {
    let Items = [...this.state.Items]
    Items.splice(i, 1)
    this.setState({ 
      Items: Items
    })
  }
   handleChange = event =>{
this.setState({ title: event.target.value } ) ;


};
handleChangee = event =>{

this.setState({sub_image: event.target.value});

};

   
handleSubmit = event =>{
event.preventDefault();
console.log(" title : " + this.state.title)
console.log(" image: " + this.state.sub_image)
console.log(" sub_type: " + 'Next')

 const dbData = new FormData();
  dbData.append('image', this.state.image_base64);
  fetch('http://livritomanager.livrito.com/apis/uploadbaseimage.php', {
    method: 'POST',
    body: dbData,
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log('RESULTS HERE:', responseJson.msg);
      this.setState(

        {
          image_base64: responseJson.imagepath,
       
        },

      );

      if (responseJson.success === 1) {

const url = "http://www.cinemahd-apk.com:3005/subcategories";
const data = { title:this.state.title,
  sub_image: 'http://livritomanager.livrito.com/apis/' + this.state.image_base64, 
 
 sub_type: 'Next', 
  cat_id: this.state.maincat_id,
  }
fetch(url, { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())

.catch(error => console.error('Error:', error))
.then(response => {
  if (response.status === true) {
  window.location.reload();
  alert('Data Added successfully');
}
}
//window.location.href = '/resturanttable'

); 

      }

    })
    .catch(error => {
      console.error(error);
    }); // end of if

}
getSub  = async () =>
    {
try{

      

    let data = await axios({
      method: 'get' ,
      url:'http://www.cinemahd-apk.com:3005/subcategoriestype/Sub' 
    }).then(({ data}) =>
    data);
    console.log(data)
  this.setState({ Itemm: data.data, maincat_id: data.data[0]._id})
    }catch(err)
    {
      console.log(err)
    }

    } 
  getItems = async () =>
    {
      try{

      

    let data = await axios({
      method: 'get' ,
      url:'http://www.cinemahd-apk.com:3005/subcategoriestype/Next' 
    }).then(({ data}) =>
    data);
    console.log(data)
    this.setState({Items: data.data})
    }catch(err)
    {
      console.log(err)
    }
 }
 
  changemaincat = event => {
    console.log(event.target.value);
    this.setState({ maincat_id: event.target.value });

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

   handleClose = () => {
    this.setState({ newOrderModal: false })
}

  addproductdata = event => {

    //  this.setState ({
    //   newOrderModal: !this.state.newOrderModal
    //  })
    console.log('Adding Data');

    console.log(this.state.filepath);

    for (let i = 1; i < this.state.rows.length; i++) {
      console.log(this.state.rows[i]);
      console.log(this.state.rows[i][0]);




      const url = "http://www.cinemahd-apk.com:3005/subcategories";
      const data = {
        title: this.state.rows[i][1],
        cat_id: this.state.rows[i][0],
        sub_image: this.state.rows[i][2],
        sub_type: 'Next',
       

      }
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log('Successfully Added: ' + this.state.rows[i][0]);
        }
        );


    }

    this.setState({ newOrderModal: false })
    // window.location.reload();
    alert('Data Added successfully! Please Refresh Page');
  }

  handleImageChange = event => {
   let image_path = event.target.files;
   console.log('datafiles' , image_path)
   let reader = new FileReader();
   reader.readAsDataURL(image_path[0])
   reader.onload =(e) =>
   {
     console.log('data' , e.target.result);
     let bs64 = e.target.result.split('base64,');
     console.log('data', bs64[0]);
     console.log('base64 data', bs64[1]);

     this.setState({ image: e.target.result, image_base64: bs64[1]});
   }
  };

  render(){
     if (localStorage.getItem('admin') !== 'true') {
       return <Redirect to='/' />
    }

    if (localStorage.getItem("loginstatus") !== "true") {
      return <Redirect to='/' />
    }

    return(
          <div className="wrapper">
 <Header/>
 <Sidebar/>
  <div className="content-wrapper">
   
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Second sub category</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Sub  Category</li>
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
                  {/* <h4>
                    <i className="fas fa-globe"></i> Sub Category
                     <Link to = "/productview" > <input type = "submit"  style = {{ float: 'right' ,color: '#fff', marginLeft:10}} class="btn btn-info" value = "Back"/></Link>
                  </h4> */}
                    <Form inline>
               
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
      
         <Label className="mr-sm-2" > Sub Category </Label>
           
                
              
                            <Input type="select" className="form-control" id="exampleSelect" onChange={this.changemaincat}>
           { this.state.Itemm.map((item , i) =>
             <option key={item.value} value={item._id}> {item.title}  </option>
          
         )}
        </Input>   </FormGroup>  
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    
           
        <Input type="text" placeholder = "Enter next sub category" name = "title" onChange = {this.handleChange} />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    
           
                            <CustomInput type="file" name="sub_image" onChange={this.handleImageChange}  />
      </FormGroup>
      <FormGroup hidden = "true" className="mb-2 mr-sm-2 mb-sm-0">
    
           
        <Input type="text" placeholder = "Next" name = "sub_type" value = "Next" />
      </FormGroup>
      <Button type = "submit" onClick = {this.handleSubmit}  color="success">Add</Button>
    </Form>
                
                        <Button class="btn  btn-success" style={{ float: 'right', marginLeft: 2, marginBottom: 5 }} onClick={this.importdata.bind(this)} >Import Sheet Data<i class="fas fa-check-circle"></i></Button>   

      
                </div>
              
             

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
	  
	  
              <div className="row invoice-info">
               
               
                
                
              </div>
              <div className="row">
                <div className="col-12 table-responsive">
                  <table className="table table-striped">
      <thead>
                    <tr>
                   
                      <th>ID</th>
                     
                      <th >Sub Category</th>
                     <th> Image </th>
                      
                     
                       

                    
                      
                    </tr>
                    </thead>
                    <tbody>
                   
                    
                   
                    {
                  this.state.Items.map((item , i) =>
            <tr className="trow" key = {i} > 
                <td>{item._id}</td>
            <td hidden = "true">{item._id} </td>
            <td >  {item.title} 
        </td> 
     
        <td><img src = {item.sub_image} style = {{width:70, height:70}}/>   </td>
        
        
                                </tr>
                               ) }
                     
                    </tbody>
                  </table>
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
export default NextSub;