import React   , {Component} from 'react';

import { Link, BrowserRouter, Redirect} from 'react-router-dom';

class  AddResturant extends Component
{
   constructor(props){
    super(props)
    this.state = {
      file: "assets/dist/img/respic.jpg"
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }
  render()
  {

     if (localStorage.getItem('admin') !== 'true') {
       return <Redirect to='/' />
    }

    if (localStorage.getItem("loginstatus") !== "true") {
      return <Redirect to="/" />;
    }
    
    return(
       <div class = "wrapper" style = {{ "background-image" : "url('assets/dist/img/ff.jpg')" , "width":
"100%" , "Height": "100%"}}>
      
         <div class="content-wrapper"   >
   
   

  
    <section class="content"   >
      <div class="row" >
        <div class="col-md-30" style = {{ "background-image" : "url('assets/dist/img/ff.jpg')" , "width":
"100%" , "Height": "100%"}}>
          <div class="card card-primary">
            <div class="card-header" style = {{background: ' #28a745'}}  >
              <h3 class="card-title" >Add New Resturant</h3>
           

              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                 </button>
              </div>
            </div>
               <label for="inputStatus" ><h2><br/>Resturant Information<b/></h2></label>
            <div class="card-body">
            <div class="form-group">
            <label for="inputName">Resturant Image</label>
                
                
                </div>
                  <div class="form-group">
                  <img src={this.state.file}  name = "image_path" onChange = {() => {} } style = {{height: '200px', width: '300px' }}/>
                  </div>
                  <input type="file"  style = {{color: 'red'}}  />
                  
                   
                 
              <div class="form-group">
               <label for="inputName">Resturant Name</label>
                <input type="text"  class="form-control" value = "" name = "name" onChange = {() => {} }/>
                </div>
              <label for="inputName">Document 1:  </label>
                <input type="file" style = {{color: 'red'}} onChange = {() => {} } name = "document_one" />
                <label for="inputName" >Document 2:</label>
                 <input type="file"   style = {{color: 'red'}} name = "document_two" onChange = {() => {} }/>

              <div class="form-group">
               <label for="inputName" >Address</label>
                <textarea type="address" id="inputName" class="form-control" name = "address" onChange = {() => {} }/>
                  <label for="inputName">City</label>
                <input type="address"  class="form-control"  name = "city" onChange = {() => {} }/>
               
              </div>
              <div class="form-group">
                <label for="inputDescription">Phone Number</label>
                <input type = "phone"  class="form-control" onChange = {() => {} } name = "contact"/>
                
                <label for="email">Email</label>
                  <input type = "email" onChange = {() => {} } class="form-control" name = "email" />
              </div>
            
               <label for="">Opening Time</label>
                  <input type = "time"  class="form-control" name = "open_at" onChange = {() => {} } />
                  <label for="">Closing Time</label>
                  <input type = "time"  class="form-control" onChange = {() => {} } name = "close_at" />
              
             
              <div class="col-12">
          <Link to ="/login" class="btn btn-secondary">Cancel</Link>
         <button type="submit"  onClick= {()=> {}} class="btn btn-success float-right"> Add </button>
        
        </div>
            </div>
         
          </div>
        
        </div>
        
      </div>
    
    </section>
   
  </div>
  </div>
  
  

  

 
        
  
    );
  }
}
export default AddResturant
 