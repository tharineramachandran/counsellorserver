
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
 
import ReCAPTCHA from "react-google-recaptcha";
import keys from "../../../env"; 
import {baseURLAPI ,baseURL }from "../../../Global";
import { ToastContainer, toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
const axios = require('axios'); 

var daysNotAvailableList = [];
class UserRegisteration extends React.Component {
  constructor(props) {
    super(props)

  }

  state = {
    body: false,
    value: '',
    callback: '',
    formWarning: '',
    slotOptions: [],
    message :'',
    password :'',
    color :'blue',
 
  }
  

 

  _onKeyUpSubject = e => {
    var value = e.target.value.toLowerCase();
    console.log(value);
    this.setState({ subject: value });
  }; 
  _onKeyUpCode = e => {
    var value = e.target.value.toLowerCase();
    console.log(value);
    this.setState({ code: value });
  };        
    
     handleChange = async (value) =>    {
    console.log("Captcha value:", value);
    this.setState({ value });
    // if value is null recaptcha expired
    if (value === null) this.setState({ expired: "true" });
  };

   asyncScriptOnLoad = async () => {
    this.setState({ callback: "called!" });
    console.log("scriptLoad - reCaptcha Ref-" );
  };
 
  render() {
    return (

      <Container> <Segment> 
 
 <ReCAPTCHA
                            sitekey={keys.google.googleRecapcha }

                            style={{ display: "inline-block" }}
                            theme="light"
                          
                            onChange={this.handleChange}
                            asyncScriptOnLoad={this.asyncScriptOnLoad}
                        />
                   
                        
      </Segment>  
      

      </Container>


    )
  }
}

export default UserRegisteration;

