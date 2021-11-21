import React, { Component } from 'react';
class Form extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = 
        {
 email: "aroojsyed888@gmail.com" ,
 password: "123"
        }
    }
  //  handleemail = (event) =>
  //  {
     //   this.setState({email: event.target.value})
        
  //  }
   //  handlepassword = (event) =>
    //{
     //   this.setState({password: event.target.value})
        
   // }
   handleall = (event) =>
   {
this.setState({
    [event.target.name] : event.target.value
})
   }
    handlesubmit = (event) =>
    {
      
        alert(JSON.stringify(this.state));
        event.preventDefault();
    }
    render() {
        return (
            <div>
            <form onSubmit = {this.handlesubmit}>
            <label>Email </label>
            <input type = "email" name = "email" value = {this.state.email} onChange = {this.handleall}  />
             <label>Password </label>
            <input type = "password" name = "password" value = {this.state.password} onChange = {this.handleall}  />
         <input type = "submit" value = "send"  />
            </form>
                
            </div>
        )
    }
}

export default Form;