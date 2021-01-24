
import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  Form,
  Header,
  Image,
  Input, Dropdown, Grid,
  Message,
  Segment, Card, Img, Icon,
  Table, Label, Container, List, Popup
} from "semantic-ui-react";

import { baseURLAPI, baseURL } from "../../../../../Global";
import { ToastContainer, toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
const axios = require('axios');

var daysNotAvailableList = [];
class ChangePassword extends React.Component {
  constructor(props) {
    super(props)

  }

  state = {
    body: false,
    subject: '',
    catagory: '',
    formWarning: '',
    slotOptions: [],
    message: '',
    password: '',
    color: 'blue',
    code: ''
  }



  submitRequest = () => {
    var sessionDetails = undefined;

    
    if (this.state.subject) {

      const data = {

        email: this.state.subject
      };

     



      axios.post(baseURLAPI + `/password/confirmEmail`, data)
        .then(res => {
          console.log(res);
          console.log(res.data);
          sessionDetails = res.data;
          this.results(res.data.code, res.data.message, "", "blue");

        }).catch((error) => {
          if (error.response) {



            this.results(false, "Unsuccessful to resent password,try google-sign", this.state.subject, "red");
          }

        });

    } else {

      this.setState({ catagory: "Invalid form", color: 'red' });
    }
  };


  submitCode = () => {
  
    if (this.state.code) {

      const data = {
        password: this.state.password,
        code: this.state.code
      };

     

      axios.post(baseURLAPI + '/password/reset', data)
        .then(res => {

          var parseResponse = res.data
          if (parseResponse.jwtToken) {
            localStorage.setItem("jwtToken", parseResponse.jwtToken);
            ;
            localStorage.setItem("email", parseResponse.user.TX_USER_EMAIL);
            localStorage.setItem("isCounsellor", parseResponse.user.IS_COUNSELLOR);
            localStorage.setItem("image", parseResponse.user.TX_PICTURE);
            localStorage.setItem("userID", parseResponse.user.ID_USER_UUID);
            localStorage.setItem("name", parseResponse.user.TX_USER_NAME);
            localStorage.setItem("isCompleted", parseResponse.user.TX_IS_COMPLETED);

            localStorage.setItem("verificationStatus", parseResponse.user.TX_VERIFICATION_STATUS);

            toast.success('Password Change Successful', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: '',
            });

            //   window.location=baseURLAPI+ "/dashboard";
          }
          else {

            this.results(true, "Invalid password change code ", "", "red");
          }


        }).catch((error) => {
          this.results(true, "Invalid password change code ", "", "red");


        });

    } else {

      this.setState({ catagory: "Invalid form", color: 'red' });
    }
  };


  results = (body, catagory, subject, color) => {
   
    this.setState({ body: body, catagory: catagory, subject: subject, color: color })
  };


  _onKeyUpSubject = e => {
    var value = e.target.value;
    
    this.setState({ subject: value });
  };
  _onKeyUpCode = e => {
    var value = e.target.value;
    
    this.setState({ code: value });
  };
  _onKeyUpMessage = e => {
    var value = e.target.value;
  
    this.setState({ message: value });
  };

  _onKeyUpPassword = e => {

    var value = e.target.value;
    
    this.setState({ password: value });
  };


  render() {
    return (

      <Container>  
        {this.state.body ? (
          <Form  >
            < Form.Group widths='equal' >
              <Form.Field className="CustomForm">
                <Icon name="envelope open outline" className="customIconsAlign" />
                <input
                  type='text'
                  onChange={this._onKeyUpCode}
                  placeholder='Enter your code'
                  control='input'
                />
              </Form.Field>
            </Form.Group>
            < Form.Group widths='equal' >
              <Form.Field className="CustomForm">
                <Icon name="key" className="customIconsAlign" />
                <input placeholder='Enter your reset password'
                  type='password' control='input'
                  onChange={this._onKeyUpPassword}
                />
              </Form.Field>
            </Form.Group>
            {this.state.catagory && (<Form.Group widths='equal'>
              <Form.Field className="CustomForm">
                <Message style={{ padding: '0.5rem' }}>
                  {this.state.catagory}
                </Message>
              </Form.Field>
            </Form.Group>
            )
            }
            < br /> 
            <Button className="appBanner" color='blue' onClick={this.submitCode}>
                                                            <Icon name='send' className="appBanner" /> Update password &nbsp;&nbsp;
                                    </Button> &nbsp;&nbsp;&nbsp;
          </Form>

        ) :

          (
            <Form >
              <Segment  >
                <Form.Group widths='equal'>

                  <Form.Field className="CustomForm">
                    <Icon name="mail" className="customIconsAlign" />
                          &nbsp;&nbsp;&nbsp;
                          <input
                      placeholder='Enter your Email'
                      type='text'
                      name="TX_USER_NAME"

                      onChange={this._onKeyUpSubject}
                      name="s"
                      id="s"
                    />
                  </Form.Field>
                </Form.Group>
                {this.state.catagory && (<Form.Group widths='equal'>
                  <Form.Field className="CustomForm">
                    <Message negative style={{ padding: '0.5rem' }}>
                      {this.state.catagory}
                    </Message>
                  </Form.Field>
                </Form.Group>
                )
                }



                < br />
                <Button className="appBanner" color='blue' onClick={this.submitRequest}>
                                                            <Icon name='send' className="appBanner" /> Send Code   &nbsp;&nbsp;
                                    </Button> &nbsp;&nbsp;&nbsp;
                
              </Segment  >
            </Form>
          )
        }


 


      </Container>


    )
  }
}

export default ChangePassword;

