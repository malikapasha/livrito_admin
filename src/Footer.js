import React, {Component } from 'react';
export default class Footer extends Component{
render()
{
return (
  <div>
    <footer className="main-footer">
      <div className="float-right d-none d-sm-block">
        <b>Version</b> 1.0.1{" "}
      </div>
      Powered By:
      <strong>
        {" "}
        <a className="nav-icon far fa-copyright" href="http://zenfoodapp.com/" style={{ color: "green" }}>
          LIVITRA
        </a>
        <b style={{ color: "#60a727" }}>{" "}@2021</b>
      </strong>{" -- "}
      All rights reserved
    </footer>{" "}
  </div>
);
}
}
