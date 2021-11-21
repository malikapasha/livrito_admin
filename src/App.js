import React, {Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import Dashboard from './Dashboard';
import firebase from './firebase';
import Login from './Login';
import {BrowserRouter ,   } from 'react-router-dom';


class App extends React.Component
{
  constructor(props) {
    super(props)
  
    this.state = {
       loggedInStatus:'NOT_LOGGED_IN',
       user: {

       }
    }
  }
  
render()
{



  return(
    
    <div>
<BrowserRouter>

    
     <Content />
    </BrowserRouter>
      </div>
  );
}
}
export default App;
