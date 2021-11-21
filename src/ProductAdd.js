import React   , {Component} from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input,CustomInput } from 'reactstrap';
import { Link, Redirect} from 'react-router-dom';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import {default as UUID} from "node-uuid";
import axios from 'axios';
const initialState =
 {
      str_id:'',
      sub_id:'',
      name: '',
      description: '',
      price: '',
      pr_size:'small',
      nameError:'',
      pr_image:'' ,
      pr_brand:'',
      pr_volume:'',
      pr_qrcode:'',

      passwordError:'',
      contactError:'',
      
      Itemm: [],
      Itemmsub: [],
      Itemmnext: [],

        image_path:'',
  image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
  image_base64: '',


  maincat_id:'0',
      mainsub_id:'0',

      real_sub_id: '0',
 }
class ProductAdd  extends React.Component

{
  constructor(props){
    super(props)
    
    this.getMain();
    this.getSub();
    this.getNext();
      

       this.state = initialState;
  }
  handleChange = event =>{
this.setState({ [event.target.name]:event.target.value } )
this.setState({ [event.target.description]:event.target.value } )
this.setState({ [event.target.pr_image]:event.target.value } )
this.setState({ [event.target.price]:event.target.value } )
this.setState({ [event.target.pr_brand]:event.target.value } )
this.setState({ [event.target.pr_size]:event.target.value } )
this.setState({ [event.target.pr_volume]:event.target.value } )
this.setState({ [event.target.pr_qrcode]:event.target.value } )
// this.setState({ [event.target.str_id]:event.target.value } )
// this.setState({ [event.target.sub_id]:event.target.value } )


  }

  changemaincat = event => {
    console.log(event.target.value);
    this.setState({ maincat_id: event.target.value, real_sub_id: event.target.value });
  
    this.getSub(event.target.value);
    // this.getNext(event.target.value);

  }
  changesubcat = event => {
     console.log(event.target.value);
    this.setState({ mainsub_id: event.target.value, real_sub_id: event.target.value });

    this.getNext(event.target.value);

  }
   changenextcat = event => {
      console.log(event.target.value);
     this.setState({ real_sub_id: event.target.value })

  }


validate = () =>
{
   let errorAll = '';
     
    
 
if(!this.state.name)
{
  errorAll = "fill all fields"
}


if( errorAll)
{
  this.setState({errorAll });
  return false;
}
return true;
}
handleSubmit = event =>{
event.preventDefault();

this.setState({errorAll: ""})

const isValid = this.validate();
if(isValid)
{
  console.log(" str_id : " + this.state.str_id)
  console.log(" sub_id : " + this.state.real_sub_id)
console.log(" name : " + this.state.name)
console.log(" description: " + this.state.description)
console.log(" price: " + this.state.price)
console.log(" pr_qrcode: " + this.state.pr_qrcode)
console.log(" pr_brand: " + this.state.pr_brand)
console.log(" pr_size: " + this.state.pr_qrcode)
console.log(" pr_volume: " + this.state.pr_volume)
console.log(" pr_image: " + this.state.pr_image)




const url = "https://livrito.herokuapp.com/product";


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

        const data = {
  sub_id: this.state.real_sub_id,
   str_id:localStorage.getItem('storeid'),
   name:this.state.name, 
description:this.state.description , 
price: this.state.price, 
pr_brand: this.state.pr_brand,
pr_qrcode: this.state.pr_qrcode,
pr_size: this.state.pr_size,  
pr_volume: this.state.pr_volume,  
  pr_image: 'http://livritomanager.livrito.com/apis/' + this.state.image_base64,


  }

fetch(url, { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => {
  // console.log('Success:', response);
  // if (response.status === true) {
  //   this.props.history.push('/productview');
  // }
     alert ('Successfully Uploaded'  , response)

     this.props.history.push('/productview');
}
  ); 



      }

    })
    .catch(error => {
      console.error(error);
    }); // end of if


// window.location.href = '/viewuser'
}}
 componentWillMount() {
    this.id = UUID.v4();
  }

  getMain = async () => {
    try {
      let data = await axios({
        method: 'get',
        url: 'https://livrito.herokuapp.com/categories'
      }).then(({ data }) =>
        data);
      console.log(data)
      this.setState({ Itemm: data.data })

      this.setState({ real_sub_id: data.data[0]._id})
         console.log('Real Sub Is: ' , data.data[0]._id);
      this.getSub(data.data[0]._id);

    } catch (err) {
      console.log(err)
    }
  } 
   

  getSub = async (searchid) => {
    try {
      let data = await axios({
        method: 'get',
        url: 'https://livrito.herokuapp.com/subcategories/' + searchid
      }).then(({ data }) =>
        data);
      console.log(data)
      this.setState({ Itemmsub: data.data });

      this.setState({ real_sub_id: data.data[0]._id })
        console.log('Real Sub Is: ' , data.data[0]._id);
      this.getNext(data.data[0]._id);

    } catch (err) {
      console.log(err)
    }
  } 

  getNext = async (searchid) => {
    try {
      let data = await axios({
        method: 'get',
        url: 'https://livrito.herokuapp.com/subcategories/'+ searchid
      }).then(({ data }) =>
        data);
      console.log(data)
      this.setState({ Itemmnext: data.data });

         this.setState({ real_sub_id: data.data[0]._id })
        console.log('Real Sub Is: ' , data.data[0]._id);

    } catch (err) {
      console.log(err)
    }
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

     if (localStorage.getItem('str') !== 'true' && localStorage.getItem('admin') !== 'true') {
        return <Redirect to='/' />
      }

     if (localStorage.getItem("loginstatus") !== "true") {
       return <Redirect to='/' />
     }
   return(
        <div class="wrapper">
        <Header/>
 <Sidebar/>
         <div class="content-wrapper">
    <div class="card">
    <section class="content-header">
      <div class="container-fluid">
     <div class="card card-primary">
       <div class="card-header" style = {{background: ' #28a745'}} >
              <h3 class="card-title" style = {{color: ' #fff'}} >Add Products</h3>

             
              </div>
            
          
         
        </div>
        
      </div>
    </section>
    <section class="content-header">
     <div class="card-body">

                 <Form>
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label >Main Category</Label>

                       <Input type="select" className="form-control" id="exampleSelect" onChange={this.changemaincat}>
                   {
                  this.state.Itemm.map((item , i) =>
                    <option key={item.value} value={item._id}>{ item.cat_name}</option>
          
         )}
        </Input>

          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label >Sub Category</Label>

                       <Input type="select" className="form-control" id="exampleSelect" onChange={this.changesubcat}>
                         {
                           this.state.Itemmsub.map((item, i) =>
                             <option key={item.value} value={item._id}>{item.title}</option>

                           )}
                       </Input>

          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label >Next Sub Category</Label>
                       <Input type="select" className="form-control" id="exampleSelect" onChange={this.changenextcat}>
                         {
                           this.state.Itemmnext.map((item, i) =>
                             <option key={item.value} value={item._id}>{item.title}</option>

                           )}
                       </Input>
          </FormGroup>
        </Col>
      </Row>
      
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleCity">Product Title</Label>
          <Input type="text"  className="form-control"   name = "name" onChange={this.handleChange} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label >Product Image</Label>
                       <CustomInput type="file" className="form-control" onChange={this.handleImageChange } name = "pr_image" />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label >Description</Label>
             <Input type = "text"     className="form-control"  onChange={this.handleChange } name = "description"/>
          </FormGroup>  
        </Col>
      </Row>
      
      <Row form>
        <Col md={2}>
          <FormGroup>
            <Label >QR Code</Label>
                       <Input type="text" className="form-control" name= "pr_qrcode" onChange={this.handleChange} />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label >Product Brand</Label>
            <Input type = "text" className="form-control" onChange={this.handleChange} name = "pr_brand"/>
          </FormGroup>
        </Col>
       
      
        <Col md={4}>
          <FormGroup>
            <Label >Product Voulme</Label>
          <Input type = "text" className="form-control"  onChange={this.handleChange} name = "pr_volume"/>
          </FormGroup>  
        </Col>
         <Col md={2}>
          <FormGroup>
            <Label >Product Size</Label>
         <Input type = "select"   onChange={this.handleChange} name = "pr_size"  >
          <option  > small</option>
          <option >medium</option>
          <option >large</option>
           <option>xl</option>
            <option >xxl</option>
         
      </Input>
          </FormGroup>  
        </Col>
         <Col md={2}>
          <FormGroup>
            <Label >Product Price</Label>
         <Input type = "text"  className="form-control"    onChange={this.handleChange } name = "price"/>
          </FormGroup>  
        </Col>
        </Row>
        
       <Link to = "/productview" className="btn btn-secondary">Cancel</Link>
         <button type="submit" onClick= {this.handleSubmit} className="btn btn-success float-right"> Add Product</button>
    </Form>
              
        
   
                 

      
             
            

</div>
      </section>
        </div>
        </div>
        </div>
    
  
    );
  
}
}
export default ProductAdd
 