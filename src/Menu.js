import React   , {Component} from 'react';

import {Link , BrowserRouter, Redirect} from 'react-router-dom';
const initialState =
{


      cat_name :'' ,
      cat_image:'',
      is_deleted:'',

}
class  Menu extends Component
{
  state = {file: "assets/dist/img/respic.jpg",}
   constructor(props){
    super(props)
    this.state = initialState;
   }
  handleChange = event =>{
this.setState({ cat_name:event.target.value } )


this.setState({cat_image: event.target.value})


}

     

handleSubmit = event =>{
event.preventDefault();
console.log(" name : " + this.state.cat_name)
console.log(" image: " + this.state.cat_image)
const url = "https://livrito.herokuapp.com/categories";
const data = { cat_name:this.state.cat_name,
cat_image:this.state.cat_image, 


  }
fetch(url, { method: 'POST', 
body: JSON.stringify(data),
headers:{ 'Content-Type': 'application/json' } })
.then(res => res.json())

.catch(error => console.error('Error:', error))
.then(response => 
alert(response)
//window.location.href = '/resturanttable'

); 

}

  render()
  {
    //  if (localStorage.getItem('admin') === 'false') {
    //   return <Redirect to='dashboard' />
    // }

    if (localStorage.getItem('res') !== 'true') {
      return <Redirect to='/' />
    }

    if (localStorage.getItem("loginstatus") !== "true") {
      return <Redirect to='/' />
    }

    return(
       <div className = "wrapper" >
      
         <div className="content-wrapper"   >
   
   

  
    <section className="content" >
      <div className="row" >
        <div className="col-md-30" style = {{ backgroundImage : "url('assets/dist/img/ff.jpg')" , "width":"100%" , "Height": "100%"}}>
          <div className="card card-primary">
            <div className="card-header" style = {{background: ' #28a745'}}  >
              <h3 className="card-title" >Add New Resturant</h3>
           

              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                 </button>
              </div>
            </div>
               
            <div className="card-body">
           
               <label id = "cat_name" >Name</label>
                <input type="text"   name = "cat_name"  className ="form-control" required  onChange = {this.handleChange}/>
         <label >image</label>
           <div class="form-group">
               
               
                
                 <input type="file" name = "cat_image"   className ="form-control" required onChange = {this.handleChange}/>
      
                 </div>

              
                 
              
             
               
                    
                
                
             
              <div className="col-12">
          <Link to ="/" className="btn btn-secondary">Cancel</Link>
         <button type="submit"  onClick ={this.handleSubmit} className="btn btn-success float-right">Add </button>
        
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
export default Menu
 