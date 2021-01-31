import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Form,
  Header,
  Checkbox,
  Image,
  Input,
  Dropdown,
  Grid,
  Message,
  Segment,
  Card,
  Img,
  Icon,
  Table,
  Label,
  Container,
  List,
  Popup,
} from "semantic-ui-react";

import FileBase64 from "react-file-base64";
import { ToastContainer, toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { baseURLAPI, baseURL } from "../../../../../../Global";
const axios = require("axios");

class ViewSendNewsletter extends React.Component {
  state = {
    body: "",
    subject: "",
    sendTo: "",
    formWarning: "",
    file: "",
    name: "",

    options: [ ],
    currentValues: [],
    src: "",
    checked: false,
  };

  componentDidMount() {
    console.log("asd");


    axios
    .get(baseURLAPI + "/newsletter/getAdminEmail/"  , {
      headers: {
        jwtToken: localStorage.jwtToken,
      },
    })
    .then((res) => {
      const url = res.data;
      console.log("url");
var  options= [ ];
      for (var i = 0;  i < url.length; i++) {
       options.push({   
      
        key:url[i].TX_USER_EMAIL  ,
        text: url[i].TX_USER_EMAIL  ,
        value: url[i].TX_USER_EMAIL  , 
      });
        

      }
      this.setState({options})

      
      console.log(url);
     
    });
 

  }

  





  getFiles = (files) => {
    console.log(files);
    this.setState({ file: files });
  };

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      name: e.target.files[0].name,
      src: URL.createObjectURL(e.target.files[0]),
    });
  };

  submitRequest = () => {
    console.log(this.state);

    var sessionDetails = undefined;

    console.log([this.state.checked]);
    if (  this.state.body && this.state.subject) {
  

        const headers = {
          jwtToken: localStorage.jwtToken
        }

        axios.post(baseURLAPI + '/newsletter/sendNewsletter', this.state, {
          headers: headers
        })
          .then(res => {
            console.log(res);
            console.log(res.data);

            toast.success('Message is sent!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: '',
            });

          }).catch((error) => {
            if (error.response) {

              toast.error('Unsuccessful to send message', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: '',
              });

            }

          });

     

    } else {

      this.setState({ formWarning: "Invalid form" });
    }
  };
  slotChange = (e, data) => {
    console.log("---------------------------------");
    this.setState({ catagory: data.value, formWarning: "" });

    console.log(data);
  };
  _onKeyUpSubject = (e) => {
    var value = e.target.value.toLowerCase();
    this.setState({ subject: value });
  };
  _onKeyUpMessage = (e) => {
    var value = e.target.value.toLowerCase();
    this.setState({ body: value });
  };

  handleCheckChange = (e) => {
    this.setState((prevState) => ({ checked: !prevState.checked }));
  };

  handleAddition = (e, { value }) => {
    this.setState((prevState) => ({
      options: [{ text: value, value }, ...prevState.options],
    }));
  };

  handleChange = (e, { value }) => this.setState({ currentValues: value });

  render() {
    return (
      <Container>
        {" "}
        <Segment>
          <h1> Send newsletter to users</h1>
          <Form style={{ width: "100%" }}>
            <Form.Group widths="equal">
              <Form.Input
                label="Subject"
                type="subject"
                onChange={this._onKeyUpSubject}
                name="s"
                id="s"
                placeholder="subject"
              />
              <br />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.TextArea
                label="Message"
                type="message"
                onChange={this._onKeyUpMessage}
                name="s"
                id="s"
                placeholder="message"
              />
     </Form.Group> 
            
            <Form.Field>
              <label>  Additional users </label>
              <Dropdown
                options={this.state.options}
                placeholder="add or select user email"
                search
                selection
                fluid
                multiple
                allowAdditions
                value={this.state.currentValues}
                onAddItem={this.handleAddition}
                onChange={this.handleChange}
              />   </Form.Field>
            
            <Form.Group>
              <Form.Checkbox
                type="checkbox"
                value={this.state.checked}
                label="Send to all suscribed users"
                onClick={this.handleCheckChange}
              />
            </Form.Group>
            <Form.Field>
              <label>  Upload your document </label>
              
              <input
                type="file"
                id="file"
                hidden
                onChange={this.handleFileChange}
              />

              <FileBase64 multiple={true} onDone={this.getFiles} />
              </Form.Field>
          </Form>
        </Segment>
        <p style={{ color: "red" }}>{this.state.formWarning}</p>
        <br />
        <button class="ui button" onClick={this.submitRequest}>
          Submit
        </button>
      </Container>
    );
  }
}

export default ViewSendNewsletter;
