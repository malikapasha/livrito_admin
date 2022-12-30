import React, { Component } from 'react';
import Sidebar from './Sidebar';
import { Button, Label,Dropdown,Form, Col,CustomInput,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Header from './Header';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';
import Footer from './Footer';
import {default as UUID} from "node-uuid";
import axios from 'axios';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

class SubCat extends Component
{
  state = {
  Items:[],
  Itemm:[],
  _id:'',
    title:'',
    
    sub_image:'',
    sub_type:'' ,

    rows: '',
    cols: '',
    file_path: '',
    newOrderModal: false,
    maincat_id:'0',
  
    image_path: '',
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
    image_base64: '',
 };
  constructor(props) {
   super(props);
   this.getItems();
   this.getSub();
     this.handleDeleteRow = this.handleDeleteRow.bind(this);
 
    
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

  componentWillMount() {
    this.id = UUID.v4();
  }
  
   handleChange = event =>{
this.setState({ title: event.target.value } ) ;


};
handleChangee = event =>{

this.setState({sub_image: event.target.value});

};
/*handleChanged = event =>{

this.setState({sub_type: event.target.value});

}; */
getSub  = async () =>
    {
try{

      

    let data = await axios({
      method: 'get' ,
      url:'http://www.cinemahd-apk.com:3005/categories' 
    }).then(({ data}) =>
    data);
  console.log(data.data[0]._id)
  this.setState({ Itemm: data.data, maincat_id:data.data[0]._id})
    }catch(err)
    {
      console.log(err)
    }

    } 


handleDeleteRow(i) {
    let Items = [...this.state.Items]
    Items.splice(i, 1)
    this.setState({ 
      Items: Items
    })
  }
   handleClose = () => {
    this.setState({ newOrderModal: false })
}
  getItems = async () =>
    {
      try{

      

    let data = await axios({
      method: 'get' ,
      url:'http://www.cinemahd-apk.com:3005/subcategoriestype/Sub' 
    }).then(({ data}) =>
    data);
    console.log(data)
    this.setState({Items: data.data})
    }catch(err)
    {
      console.log(err)
    }
 }
 
 
 
 handleSubmit = event =>{
event.preventDefault();
console.log(" title : " + this.state.title)
console.log(" image: " + this.state.sub_image)
   console.log(" sub_type: " + 'Sub')

console.log("Cat_id: " + this.state.maincat_id)

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
 
 sub_type:'Sub', 
 
  cat_id: this.state.maincat_id,
  }
fetch(url, { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
  if (data.status === true) {
    window.location.reload();
    alert('Data Added successfully');
  }
    
      
})
.catch(error => alert('Error:', error))

 }

    })
    .catch(error => {
      console.error(error);
    }); // end of if
    

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

   addproductdata = event =>
 {
 
  //  this.setState ({
  //   newOrderModal: !this.state.newOrderModal
  //  })
 console.log('Adding Data');

  console.log(this.state.filepath);

  for(let i =1; i<this.state.rows.length;i++)
  {
     console.log(this.state.rows[i]);
      console.log(this.state.rows[i][0]);

    if (this.state.rows[i][0]!==null)
{

const url = "http://www.cinemahd-apk.com:3005/subcategories";
const data = { 
  title:this.state.rows[i][1], 
  cat_id:this.state.rows[i][0] , 
  sub_image: this.state.rows[i][2], 
  sub_type:'Sub',
  is_deleted:'available',
  }
fetch(url, { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response =>  { 
  console.log('Successfully Added: '+this.state.rows[i][0]);}
  ); 

    }

  }
     this.setState({ newOrderModal: false })
    // window.location.reload();
    alert('Data Added successfully! Please Refresh Page');

    
 }

  changemaincat = event => {
    console.log(event.target.value);
    this.setState({ maincat_id: event.target.value });

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

    if (localStorage.getItem("admin") !== "true") {
      return <Redirect to="/" />;
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
            <h1>Sub Category</h1>
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
      
       
                            <Input type="select" className="form-control" id="exampleSelect" onChange={this.changemaincat}> 
                   {
                  this.state.Itemm.map((item , i) =>
                    <option key = {item._id} value={item._id}>{ item.cat_name}</option> 
          
         )}
        </Input>               
      </FormGroup> 
      <Label> </Label>
         <FormGroup className="mb-2 mr-sm-2 mb-sm-0">       
         
  <Input type="text"  placeholder = "Enter sub category"  name = "title" onChange = {this.handleChange}  />
      </FormGroup>
       <Label> </Label>
      <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
    
           
                            <CustomInput type="file" name="sub_image" onChange={this.handleImageChange}   />
      </FormGroup>
       <Label  className="mr-sm-2" hidden = "true" > </Label>
       <FormGroup className="mb-2 mr-sm-2 mb-sm-0" style = {{marginTop:10}} hidden = "true">      
       
         <Input type = "text" name = "sub_type" value = "Sub" placeholder = "Sub" />
        
      </FormGroup> 
      <Label className="mr-sm-2" > </Label>
      <Button type = "submit"  style = {{float:'right'}} onClick = {this.handleSubmit} color="success" >Add</Button>
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
                              <th> Image </th>
                      <th>Category ID</th>
                     
                       <th >Category Title</th>
      
                      
                    </tr>
                    </thead>
                    <tbody>
                   
                    
                   
                    {
                  this.state.Items.map((item , i) =>
            <tr className="trow" key = {item._id} > 
              <td><img src = {item.sub_image} style = {{width:70, height:70}}/>   </td>
                      <td>{item._id}</td>
          <td>  {item.title}  </td>      
        
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
export default SubCat;