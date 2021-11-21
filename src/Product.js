import React , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

import { Link, BrowserRouter, Redirect} from 'react-router-dom';

const Product = () =>
{
   if (localStorage.getItem('str') !== 'true') {
        return <Redirect to='/' />
      }

  		if (localStorage.getItem("loginstatus") !== "true") {
		  return <Redirect to='/' />
    }
    
    return(
 <div class="wrapper">
 <Header/>
 <Sidebar/>
    <div class="content-wrapper" style = {{"background-color" : " "}}>
    <section class="content-header" style = {{"background-color" : " "}}>
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Menu</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Menu </li>
            </ol>
            </div>
            </div>
            </div>
    </section>
          <section class="content">
        <div class="card">
        <div class="card-header">
          <h3 class="card-title">Menu</h3>

          <div class="card-tools">
            <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
              <i class="fas fa-minus"></i></button>
            <button type="button" class="btn btn-tool" data-card-widget="remove" data-toggle="tooltip" title="Remove">
              <i class="fas fa-times"></i></button>
          </div>
        </div>
        <div class="card-body p-0">
          <table class="table table-striped projects">
              <thead>
                  <tr>
                      <th style={{"width": "1%"}}>
                          Menu Id
                      </th>
                      
                       <th style= {{"width": "10%"}}>
                         Menu Name
                      </th>
                      <th style= {{"width": "10%"}}>
                        Menu Image
                      </th>
                      <th style= {{"width": "10%"}}>
                          Date
                      </th>
                       <th style= {{"width": "2%"}}>
                          Popular
                      </th>
                      <th style= {{"width": "20%"}}>
                         Status
                      </th>
                      <th style= {{"width": "30%"}} class="text-center">
                          Action
                      </th>
                    
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>
                          #
                      </td>
                      <td>
                          
                              xyz
                          
                      </td>
                      <td>
                      
                         img 
                      </td>
                       <td>
                      
                         xcc
                      </td>
                       <td>
                      
                         img 
                      </td>
                       <td>
                      
                         img 
                      </td>

                      <td class="project-actions text-right">
                          <a class="btn btn-primary btn-sm" href="/productview">
                              <i class="fas fa-folder">
                              </i>
                              View
                          </a>
                          <a class="btn btn-info btn-sm" href="#">
                              <i class="fas fa-pencil-alt">
                              </i>
                              Edit
                          </a>
                          <a class="btn btn-danger btn-sm" href="/productedit">
                              <i class="fas fa-trash">
                              </i>
                              Delete
                          </a>
                      </td>
                  </tr>
                 
              </tbody>
          </table>
        </div>
       </div>
      </section>
    </div>
    </div>
    );
}
export default Product