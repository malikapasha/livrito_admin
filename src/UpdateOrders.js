import React   , {Component} from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import {AsyncStorage} from 'AsyncStorage';
import {Link , BrowserRouter} from 'react-router-dom';


class UpdateOrders extends Component
{
  
  constructor(props){
    super(props)
    
     
    
       this.initialState = {

            _id:'',
            status:'',

          


        }

  }
 
  handleChange = event =>{
this.setState({ [event.target._id]:event.target.value } )
this.setState({ [event.target.status]:event.target.value } )

  }

handleSubmit = event =>{
event.preventDefault();
console.log(" _id : " + this.state._id)
console.log(" status: " + this.state.status)





const url = "https://livrito.herokuapp.com/updateorderstatus";
const data = { _id: this.state._id, 
status:this.state.status , 

  }
fetch(url, { method: 'POST', 
body: JSON.stringify({
    _id : "5e9ebde8e8a751001716ecda",
    status: 'check',
}),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
//window.location.href = '/ordertable' 

  this.props.history.push('/ordertable');
}
   
    
   
  
  render()
  {


 return(
        <div className="wrapper">
        <Header/>
        <Sidebar/>
         <div className="content-wrapper">
   
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          
          <div className="col-sm-8">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Update</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

  
    <section className="content">
      <div className="row">
        <div className="col-md-10">
          <div className="card card-primary">
            <div className="card-header" style = {{background: ' #28a745'}} >
              <h3 className="card-title" > Update Orders Status</h3>

              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i className="fas fa-minus"></i></button>
              </div>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label >Order Id</label>
                <input type="text" className="form-control" name = "_id" onChange={this.handleChange} />
              </div>
             
              <div classNameName="form-group">
                <label>Status</label>
                <input type="text" name = "status" onChange={this.handleChange}     className="form-control"/>
              </div>
              
               
              <div className="col-12">
          <a href="#" className="btn btn-secondary">Cancel</a>
        <Link to = "/ordertable"> <button type="submit" className="btn btn-success float-right" onClick= {this.handleSubmit} >Update Status</button></Link>
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
export default UpdateOrders
 