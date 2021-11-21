import React , { Component } from 'react';
const Errors = () =>

{

    return(
    <div class="wrapper">
    <div class="content-wrapper">
    <section class="content">
      <div class="error-page">
        <h2 class="headline text-warning"> 404</h2>

        <div class="error-content">
          <h3><i class="fas fa-exclamation-triangle text-warning"></i> Oops! Page not found.</h3>

          <p>
            We could not find the page you were looking for...
          
          </p>

          {/* <form class="search-form">
            <div class="input-group">
              <input type="text" name="search" class="form-control" placeholder="Search"/>

              <div class="input-group-append">
                <button type="submit" name="submit" class="btn btn-warning"><i class="fas fa-search"></i>
                </button>
              </div>
            </div>
            
          </form> */}
        </div>
      
      </div>
    
    </section>
   
  </div>
  <footer class="main-footer">
    <div class="float-right d-none d-sm-block">
      <b>Version</b> 3.0.2
    </div>
          <strong>Copyright &copy; 2020 <a href="http://zenfoodapp.com/">Zenfood Application</a>.</strong> All rights
    reserved.
  </footer>
        </div>
    );

}
export default Errors