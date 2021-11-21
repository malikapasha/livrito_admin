import React , {Component} from 'react';
const Lockscreen = () =>
{

    return(
        <div class="lockscreen-wrapper">
  <div class="lockscreen-logo">
    <a href="index.html"><b>Admin</b></a>
  </div>
 
  <div class="lockscreen-name">User1</div>


  <div class="lockscreen-item">
  
    <div class="lockscreen-image">
      <img src="assets/dist/img/user1-128x128.jpg" alt="User Image"/>
    </div>
    
    <form class="lockscreen-credentials">
      <div class="input-group">
        <input type="password" class="form-control" placeholder="password"/>

        <div class="input-group-append">
          <button type="button" class="btn"><i class="fas fa-arrow-right text-muted"></i></button>
        </div>
      </div>
    </form>
  

  </div>
  
  <div class="help-block text-center">
    Enter your password to retrieve your session
  </div>
  <div class="text-center">
    <a href="login.html">Or sign in as a different user</a>
  </div>
  <div class="lockscreen-footer text-center">
    Copyright &copy; 2014-2019 <b><a href="http://adminlte.io" class="text-black">CircularByte</a></b><br/>
    All rights reserved
  </div>
</div>
    );
}
export default Lockscreen