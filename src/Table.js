
import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: `http://www.cinemahd-apk.com:3005/allorders`
})

 class Table extends Component {
 state = {
  Items:[],
  status: '',
  id:'',
 };
    constructor() {
      super();
      this.getItems();
    }
    getItems = async () =>
    {
      try{

      

    let data = await api.get('/').
    then(({ data}) =>
    data);
    console.log(data.allorders)
    this.setState({Items: data.allorders})
    }catch(err)
    {
      console.log(err)
    }
 }
 updateCourse = async () =>
 {
    const obj = {
      status: this.state.status
    };
       axios.post(`http://www.cinemahd-apk.com:3005/ryderupdatestatus/${this.state.status}` )
       .then(res => console.log(res.data));
    this.getItems(); 


   

 }
 
 
  render() {

    return ( 
      <div>
     {
       this.state.Items.map(ryder =>
       <h2 key = {ryder._id}   >  {ryder.name } <input type = "text" id = "status" name = "status" onChange = {this.handleChange} /><button type = "
       submit" onClick = {this.updateCourse} /></h2>

       
       )
     }
      </div>

   
    );   
      
  }
}
export default Table