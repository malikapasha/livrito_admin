import React, { Component } from 'react';
import Sidebar from './Sidebar';
import {default as UUID} from "node-uuid";
import { Button,Form, Row, Col, Label,Dropdown, CustomInput,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Header from './Header';
import {Link , BrowserRouter, Redirect} from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
 
// const percentage = 66;


class MainCat extends Component
{
  
  state = {
  Items:[],
  cat_name: '' ,
  cat_image:null,
   nameError:'',
  
     image_path:'',
  image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
  image_base64: '',

  newOrderModal: false,
   importsheetmodal: false,
    rows: '',
    cols: '',
    file_path: '',
       editData:
       {
         _id: '',
  
      is_deleted:'',

        

       }
 };
  constructor() {
   super();
  
   this.getItems();
     this.handleDeleteRow = this.handleDeleteRow.bind(this);
  
    
 }
 componentWillMount() {
    this.id = UUID.v4();
  }
  

 handleChange = event =>{
this.setState({ cat_name: event.target.value } ) ;


}
handleChangee = event =>{

this.setState({cat_image: event.target.value})
 console.log(event.target.files[0])

}



 
handleDeleteRow(i) {
    let Items = [...this.state.Items]
    Items.splice(i, 1)
    this.setState({ 
      Items: Items
    })
  }
   handleClose = () => {
     this.setState({ newOrderModal: false, importsheetmodal: false })
}

  getItems = async () =>
    {
      try{

      

    let data = await axios({
      method: 'get' ,
      url:'https://livrito.herokuapp.com/categories' 
    }).then(({ data}) =>
    data);
    console.log(data)
    this.setState({Items: data.data})
    }catch(err)
    {
      console.log(err)
    }
 }
 toggleNewOrders()
{

  this.setState({
    newOrderModal: true, importsheetmodal: true
  }) 
}

importdata()
 {
 
   this.setState ({
     importsheetmodal: !this.state.importsheetmodal
   })
 }
 
 editOrder(_id ,  is_deleted)
 {
   
   this.setState ({
     editData: {_id , is_deleted} , newOrderModal: !this.state.newOrderModal
   })
 }

 updateOrder()
 {
   let {_id ,  is_deleted} = this.state.editData;
 console.log(" _id : " +  this.state.editData._id)

console.log(" status: " + this.state.editData.is_deleted)
const url = "https://livrito.herokuapp.com/categorieupdate";
const data = { _id: this.state.editData._id, 

is_deleted:this.state.editData.is_deleted, 

  }
fetch(url, { method: 'POST', 
body: JSON.stringify({
   _id:  this.state.editData._id, 

is_deleted:this.state.editData.is_deleted, 

}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)
    
     if(data.success === true)
      {
    window.location.reload();
    alert('Data Added successfully');
      }
      
})
.catch(error => console.error('Error:', error))

  }
  
handleSubmit = event =>{
event.preventDefault();
const fd = new FormData();
//fd.append('image' , this.state.cat_image , this.state.cat_image.name);
console.log(" name : " + this.state.cat_name)
console.log(" image: " + this.state.cat_image)

 const dbData = new FormData();
  dbData.append('image', this.state.image_base64);
  fetch('https://earnx.biz/foodwala/uploadbaseimage.php', {
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

const url = "https://livrito.herokuapp.com/categories"  ;
const data = { cat_name:this.state.cat_name,
  cat_image: 'https://earnx.biz/foodwala/' + this.state.image_base64, 
  is_deleted:'available',


  }
fetch(url,   { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.then((data) => {
      
      console.log(data)

      if(data.status === true)
      {
        window.location.reload();
    //  window.location.reload(true)
     alert('Category Added Successfully')
    
        // this.props.history.push('/productview');
      }
    
      
})
.catch(error => alert('Error in adding new category:', error))

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

  addproductdata = event => {

    //  this.setState ({
    //   newOrderModal: !this.state.newOrderModal
    //  })
    console.log('Adding Data');

    console.log(this.state.filepath);

    for (let i = 1; i < this.state.rows.length; i++) {
      console.log(this.state.rows[i]);
      console.log(this.state.rows[i][0]);




      const url = "https://livrito.herokuapp.com/categories";
      const data = {
        cat_name: this.state.rows[i][0],
        cat_image: this.state.rows[i][1],
        is_deleted: 'available',
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
  alert('Data Added Successfully');
    window.location.reload();
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
  
    render()
    {
       if (localStorage.getItem('admin') === 'false') {
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
            <h1>Main Category</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Main Category</li>

            </ol>
          </div>
        </div>
      </div>
    </section>

      <Modal isOpen={this.state.importsheetmodal} toggle={this.toggleNewOrders.bind(this)} >
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

    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            
            <div className="invoice p-3 mb-3">
            
              
              <div className="row">
                <div className="col-12">
                  {/* <h4>
                    <i className="fas fa-globe"></i> Main Category <Link to = "/productview" > <input type = "submit"  style = {{ float: 'right' ,color: '#fff', marginLeft:10}} class="btn btn-info" value = "Back"/></Link></h4>  */}
                    <Form inline>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
      
         <Label className="mr-sm-2" > Main Category </Label>

               
                     <Input type="text"  name = "cat_name" placeholder = "Enter main category" onChange={this.handleChange} />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
    
          
                        <CustomInput type="file" id="cat_image " name="cat_image" onChange={this.handleImageChange}  />
      </FormGroup>
      
      <Button type = "submit" onClick = {this.handleSubmit}  color="success">Add</Button>
    </Form>


                    <Button class="btn  btn-success" style={{ float: 'right', marginLeft: 2, marginBottom:5 }}  onClick ={this.importdata.bind(this)} >Import Sheet Data<i class="fas fa-check-circle"></i></Button>   
                    
                    
                    
                     
                     
                  
                
              <Button color="#fff" onClick={this.toggleNewOrders.bind(this)}></Button>
          <Modal isOpen={this.state.newOrderModal} toggle={this.toggleNewOrders.bind(this)} >
        <ModalHeader style = {{background:'green' , color:'#fff'}}  ><p style = {{color:'#fff'}}>Update Status </p> </ModalHeader>
        <ModalBody>
        
        <FormGroup>
          
        
        
         <FormGroup>
         <Label >Status</Label>
        
           
  <div>
      <select style = {{width:'70%' , padding:8, height:'80%' , borderRadius:'15' ,}}  value ={ this.state.editData.is_deleted}  name="is_deleted"  onChange = {(e) =>{
          let {editData} = this.state;
          editData.is_deleted = e.target.value;
          this.setState({editData})
        }} >
          <option >Avaliable</option>
          <option  >Not Available</option>
          
      </select>
      
      </div>
     </FormGroup>
     
       

      </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.updateOrder.bind(this)}>Update</Button>
          <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
                </div>
              
              </div>
            
              <div className="row invoice-info">
               
               
                
                
              </div>
              <div className="row">
                <div className="col-12 table-responsive">
                  <table className="table table-striped">
      <thead>
                    <tr>
                      <th> Image </th>
                   
                     
                     <th>Category ID</th>
                      <th>Category Name</th>
                       <th> Status</th>
                     
                      <th>Action</th>
                       

                    
                      
                    </tr>
                    </thead>
                    <tbody>
                   
                    
                   
                    {
                  this.state.Items.map((item , i) =>
            <tr className="trow" key = {item._id} > 
                      <td> <img src={item.cat_image} style={{ width: 50, height: 50 }} /> </td>
                      <td>{item._id}</td>
          
        <td> {item.cat_name}  </td>
    
       <td>{item.is_deleted}</td>
           
        <td><button type = "submit"  class="btn  btn-success btn-sm"  onClick ={this.editOrder.bind(this , item._id ,  item.is_deleted )} >
         <i class="fas fa-edit">
                              </i></button>
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
      </div>
    </section>
 </div>
   <Footer/>
  </div>
)
    }

}
export default MainCat;