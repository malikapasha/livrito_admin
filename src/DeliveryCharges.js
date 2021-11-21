import React , {Component} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import axios from 'axios';
import { Button, Label, Form, Modal, ModalHeader, FormGroup ,ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input,Checkbox } from 'reactstrap';
import { Link, BrowserRouter, Redirect} from 'react-router-dom';

// import Checkbox from 'react-checkbox-component';

class DeliveryCharges extends Component {
  state = {
    Items: [],
    newOrderModal: false,

    isCheckeduser: true,
    isCheckedryder: false,
    isCheckedrest: false,
    isCheckedstr: false,
notificationtext:'',
    editData: {
      _id: "",
      del_charges: "",
      min_cost: "",
      min_dis: "",
      cost_unit: "",
    },
  };

  constructor() {
    super();
    this.getItems();
    this.handleDeleteRow = this.handleDeleteRow.bind(this);
  }
  handleDeleteRow(i) {
    let Items = [...this.state.Items];
    Items.splice(i, 1);
    this.setState({
      Items: Items,
    });
  }
  handlerusercheck = () => {
     this.setState({
       isCheckeduser: !this.state.isCheckeduser,
     });
  };

  handleClose = () => {
    this.setState({ newOrderModal: false });
  };
  getItems = async () => {
    try {
      let data = await axios({
        method: "get",
        url:
          "https://livrito.herokuapp.com/charges",
      }).then(({ data }) => data);
      console.log(data);
      console.log(data[0].del_charges);
      this.setState({
        Items: data,
        del_charges: data[0].del_charges,
        min_dis: data[0].min_dis,
        min_cost: data[0].min_cost,
        cost_unit: data[0].cost_unit,
        service_fee: data[0].service_fee,
        stamp_perc: data[0].stamp_perc,

        res_radius: data[0].res_radius,
        str_radius: data[0].str_radius,

        _id: data[0]._id,
      });

      console.log(this.state.del_charges);
    } catch (err) {
      console.log(err);
    }
  };
  toggleNewOrders() {
    this.setState({
      newOrderModal: true,
    });
  }

  editOrder(
    _id,
    del_charges,
    min_cost,
    min_dis,
    cost_unit,
    stamp_perc,
    service_fee,
    res_radius,
    str_radius
  ) {
    console.log(del_charges);
    this.setState({
      editData: {
        _id,
        del_charges,
        min_cost,
        min_dis,
        cost_unit,
        stamp_perc,
        service_fee,
        res_radius,
        str_radius,
      },
      newOrderModal: !this.state.newOrderModal,
    });
  }

  sendNotification()
  {
    console.log('Notification Text: ' + this.state.notificationtext);

    if(this.state.isCheckeduser)
    {
      this.sendnotificationnow('/topics/zenuser');
      console.log(" Sending to User ");
    } 

     if(this.state.isCheckedrest)
    {
       this.sendnotificationnow('/topics/zenrestaurant');
       console.log(" Sending to Restaurant ");
    } 

     if(this.state.isCheckedstr)
    {
       this.sendnotificationnow('/topics/zenstore');
      console.log(" Sending to Stores ");
    } 

     if(this.state.isCheckedryder)
    {
    this.sendnotificationnow('/topics/zenryder');

      console.log(" Sending to Ryders ");
    } 


    alert('Notifications send successfully');

  }

  sendnotificationnow(tokenalue)
  {
    console.log("Token: " + tokenalue + " and " + this.state.notificationtext);

     const dbData = new FormData();
    dbData.append('topic', tokenalue);
    dbData.append('body', this.state.notificationtext);
    dbData.append('title', 'Zenfood');

    fetch('http://zenfoodapp.com/secure/notifyapi.php', {
      method: "POST",
      body: dbData,
    })
      .then((data) => {
        console.log(data);
        // if (true) {
        //   alert("data updated successfully");
        //   window.location.reload(true);
        // }
      })
      .catch((error) => console.error("Error:", error));
  }

  updateOrder() {
    let { del_charges, min_cost, min_dis, cost_unit } = this.state.editData;

    console.log(" id : " + this.state.editData._id);
    console.log(" del_charges: " + this.state.editData.del_charges);
    console.log(" min_cost " + this.state.editData.min_cost);
    console.log(" min_dis " + this.state.editData.min_dis);
    console.log(" unit " + this.state.editData.cost_unit);

    const url =
      "https://livrito.herokuapp.com/updatecharges";
    const data = {
      _id: this.state.editData._id,
      del_charges: this.state.editData.del_charges,
      min_cost: this.state.editData.min_cost,
      min_dis: this.state.editData.min_dis,
      cost_unit: this.state.editData.cost_unit,
      stamp_perc: this.state.editData.stamp_perc,
      service_fee: this.state.editData.service_fee,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        id: this.state.editData._id,
        del: this.state.editData.del_charges,
        cost: this.state.editData.min_cost,
        dis: this.state.editData.min_dis,
        unitt: this.state.editData.cost_unit,

        service_fee: this.state.editData.service_fee,
        stamp_perc: this.state.editData.stamp_perc,

        res_radius: this.state.editData.res_radius,
        str_radius: this.state.editData.str_radius,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          alert("data updated successfully");
          window.location.reload(true);
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  render() {
    if (localStorage.getItem("admin") !== "true") {
      return <Redirect to="/" />;
    }

    if (localStorage.getItem("loginstatus") !== "true") {
      return <Redirect to="/" />;
    }
    return (
      <div class="wrapper">
        <Header />
        <Sidebar />
        <div class="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>
                    <b>Delivery Charges</b>
                  </h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item active">
                      Delivery Charges Table
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <section class="content">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">Delivery Charges</h3>

                    <Button
                      style={{ float: "right" }}
                      onClick={this.editOrder.bind(
                        this,
                        this.state._id,
                        this.state.del_charges,
                        this.state.min_cost,
                        this.state.min_dis,
                        this.state.cost_unit,
                        this.state.stamp_perc,
                        this.state.service_fee,
                        this.state.res_radius,
                        this.state.str_radius
                      )}
                      color="success"
                    >
                      Update
                    </Button>

                    <Button
                      color="#fff"
                      onClick={this.toggleNewOrders.bind(this)}
                    ></Button>
                    <Modal
                      isOpen={this.state.newOrderModal}
                      toggle={this.toggleNewOrders.bind(this)}
                    >
                      <ModalHeader
                        style={{ background: "green", color: "#fff" }}
                      >
                        <p style={{ color: "#fff" }}>
                          Update Delivery Charges{" "}
                        </p>{" "}
                      </ModalHeader>
                      <ModalBody>
                        <Label>Minimum Delivery Charges </Label>

                        <FormGroup>
                          <Input
                            type="number"
                            value={this.state.editData.del_charges}
                            onChange={(e) => {
                              let { editData } = this.state;
                              editData.del_charges = e.target.value;
                              this.setState({ editData });
                            }}
                            placeholder="Delivery"
                          />
                        </FormGroup>

                        <Label>Minimum Distance (In Km)</Label>
                        <FormGroup>
                          <Input
                            type="text"
                            value={this.state.editData.min_dis}
                            onChange={(e) => {
                              let { editData } = this.state;
                              editData.min_dis = e.target.value;
                              this.setState({ editData });
                            }}
                            placeholder="Distance"
                          />
                        </FormGroup>
                        <Label>Cost Unit (Per Km) </Label>
                        <FormGroup>
                          <Input
                            type="text"
                            value={this.state.editData.cost_unit}
                            onChange={(e) => {
                              let { editData } = this.state;
                              editData.cost_unit = e.target.value;
                              this.setState({ editData });
                            }}
                            placeholder="Unit"
                          />
                        </FormGroup>

                        <Label>Service fee </Label>
                        <FormGroup>
                          <Input
                            type="text"
                            value={this.state.editData.service_fee}
                            onChange={(e) => {
                              let { editData } = this.state;
                              editData.service_fee = e.target.value;
                              this.setState({ editData });
                            }}
                            placeholder="Service fee"
                          />
                        </FormGroup>

                        <Label>Stamp (In Percentage) </Label>
                        <FormGroup>
                          <Input
                            type="text"
                            value={this.state.editData.stamp_perc}
                            onChange={(e) => {
                              let { editData } = this.state;
                              editData.stamp_perc = e.target.value;
                              this.setState({ editData });
                            }}
                            placeholder="Stamp (In Percentage)"
                          />
                        </FormGroup>

                        <Label>Restaurant Minimum Distance</Label>
                        <FormGroup>
                          <Input
                            type="text"
                            value={this.state.editData.res_radius}
                            onChange={(e) => {
                              let { editData } = this.state;
                              editData.res_radius = e.target.value;
                              this.setState({ editData });
                            }}
                            placeholder="Stamp (In Percentage)"
                          />
                        </FormGroup>

                        <Label>Store Minimum Distance</Label>
                        <FormGroup>
                          <Input
                            type="text"
                            value={this.state.editData.str_radius}
                            onChange={(e) => {
                              let { editData } = this.state;
                              editData.str_radius = e.target.value;
                              this.setState({ editData });
                            }}
                            placeholder="Stamp (In Percentage)"
                          />
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="success"
                          onClick={this.updateOrder.bind(this)}
                        >
                          Update
                        </Button>
                        <Button color="secondary" onClick={this.handleClose}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>

                  <div class="card-body row">
                    <div class="col-md-6">
                      <div class="card card-secondary">
                        <div
                          class="card-header"
                          style={{ background: " #28a745" }}
                        >
                          <h3 class="card-title">Minimum Search Radius</h3>
                        </div>
                        <div class="card-body">
                          <div class="form-group">
                            <label for="inputDescription">
                              Restaruant Search Radius
                            </label>

                            <label class="form-control" for="inputDescription">
                              {" "}
                              {this.state.res_radius} Km
                            </label>
                          </div>

                          <div class="form-group">
                            <label for="inputDescription">
                              Store Search Radius
                            </label>

                            <label class="form-control" for="inputDescription">
                              {" "}
                              {this.state.str_radius} km
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="card card-secondary">
                        <div
                          class="card-header"
                          style={{ background: " #28a745" }}
                        >
                          <h3 class="card-title">Send Notifications</h3>
                        </div>
                        <div class="form-group">
                          <label for="inputClientCompany">
                            Select Notifications Topic
                          </label>

                     

                          <div class="card-body row">
                            <div class="col-md-3">
                              <Label for="inputClientCompany">
                                {/* <Checkbox
                                  size="small"
                                  isChecked={this.state.isCheckeduser}
                                  onChange={() => {
                                    this.setState({
                                      isCheckeduser: !this.state.isCheckeduser,
                                    });
                                  }}
                                  color="#28a745"
                                /> */}
                                User
                              </Label>
                            </div>
                            <div class="col-md-3">
                              <Label for="inputClientCompany">
                                {/* <Checkbox
                                  size="small"
                                  isChecked={this.state.isCheckedstr}
                                  onChange={() => {
                                    this.setState({
                                      isCheckedstr: !this.state.isCheckedstr,
                                    });
                                  }}
                                  color="#28a745"
                                ></Checkbox> */}
                                Stores
                              </Label>
                            </div>
                            <div class="col-md-3">
                              <Label for="inputClientCompany">
                                {/* <Checkbox
                                  size="small"
                                  isChecked={this.state.isCheckedrest}
                                  onChange={() => {
                                    this.setState({
                                      isCheckedrest: !this.state.isCheckedrest,
                                    });
                                  }}
                                  color="#28a745"
                                /> */}
                                Restaurants
                              </Label>
                            </div>
                            <div class="col-md-3">
                              <Label>
                                {/* <Checkbox
                                  size="small"
                                  isChecked={this.state.isCheckedryder}
                                  onChange={() => {
                                    this.setState({
                                      isCheckedryder: !this.state
                                        .isCheckedryder,
                                    });
                                  }}
                                  color="#28a745"
                                /> */}
                                Ryders
                              </Label>
                            </div>
                          </div>

                          {/* <Input
                           type="checkbox"
                           checked={this.state.isChecked}
                           onChange={this.toggleChange}
                           onClick={() => {
                             this.setState({
                               isChecked: !this.state.isChecked,
                             });
                           }}
                           inline
                         >
                           <span>User</span>
                         </Input> */}

                          
                        </div>

                        <form action="#" method="post">
                          <div class="input-group">
                            <textarea
                              type="text"
                              name="message"
                              placeholder="Type Message ..."
                              class="form-control"
                              onChange={(e) => {
                                this.setState({
                                  notificationtext: e.target.value,
                                });
                              }}
                            />
                            <span class="input-group-append">
                              <button onClick={this.sendNotification.bind(this)} type="button" class="btn btn-primary">
                                Send
                              </button>
                            </span>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="card-body row">
                    <div class="col-md-6">
                      <div class="card card-secondary">
                        <div
                          class="card-header"
                          style={{ background: " #28a745" }}
                        >
                          <h3 class="card-title">Minimum Delivery Charges</h3>
                        </div>
                        <div class="card-body">
                          <div class="form-group">
                            <label for="inputDescription">
                              Delivery Charges
                            </label>

                            <label class="form-control" for="inputDescription">
                              {" "}
                              {this.state.del_charges} DA
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="card card-secondary">
                        <div
                          class="card-header"
                          style={{ background: " #28a745" }}
                        >
                          <h3 class="card-title">Service fee and Stamp</h3>
                        </div>
                        <div class="card-body">
                          <div class="form-group">
                            <label for="inputDescription">Service Fee: </label>
                            <label class="form-control" for="inputDescription">
                              {" "}
                              {this.state.service_fee} DA
                            </label>
                          </div>
                          <div class="form-group">
                            <label for="inputDescription">
                              Stamp Percentage:{" "}
                            </label>
                            <label class="form-control" for="inputDescription">
                              {" "}
                              {this.state.stamp_perc} %
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div class="col-md-6" >
                   <div class="card card-secondary">
                     <div class="card-header">
                       <h3 class="card-title">Minimum Cost</h3>


                     </div>
                     <div class="card-body">

                       <div class="form-group">
                         <label for="inputDescription">Minimum Cost </label>

                         <label class="form-control" for="inputDescription"> {this.state.min_cost} DA</label>

                       </div>

                     </div>

                   </div>

                 </div> */}
                  </div>

                  <div class="card-body row">
                    <div class="col-md-6">
                      <div class="card card-secondary">
                        <div
                          class="card-header"
                          style={{ background: " #28a745" }}
                        >
                          <h3 class="card-title">Minimum Distance (In Km)</h3>
                        </div>
                        <div class="card-body">
                          <div class="form-group">
                            <label for="inputDescription">
                              Minimum Distance{" "}
                            </label>

                            <label class="form-control" for="inputDescription">
                              {" "}
                              {this.state.min_dis} KM
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="card card-secondary">
                        <div
                          class="card-header"
                          style={{ background: " #28a745" }}
                        >
                          <h3 class="card-title">Cost Unit (Per KM)</h3>
                        </div>
                        <div class="card-body">
                          <div class="form-group">
                            <label for="inputDescription">
                              Cost Unit (Per KM)
                            </label>

                            <label class="form-control" for="inputDescription">
                              {" "}
                              {this.state.cost_unit} DA
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}
export default DeliveryCharges