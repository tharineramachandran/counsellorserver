
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

import { ToastContainer, toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
const axios = require('axios');

var daysNotAvailableList = [];
class CreateMessage extends React.Component {
  constructor(props) {
    super(props)

  }

  state = {
    body: '',
    subject: '',
    catagory: '',
    formWarning: '',
    slotOptions: []
  }

  componentDidMount() {
    console.log(this.props);
    console.log(this.state);
    var slotOptions = [
      { key: 'enquiry on counselling specialty', value: 'enquiry on counselling specialty', text: 'enquiry on counselling specialty' },
      { key: 'enquiry on counselling timing', value: 'enquiry on counselling timing', text: 'enquiry on counselling timing' },
      { key: 'suggest different timing', value: 'suggest different timing', text: 'suggest different timing' },
      { key: 'enquiry on conselling fee', value: 'enquiry on conselling fee', text: 'enquiry on conselling fee' },


    ];
    this.setState({ slotOptions: slotOptions, formWarning: '' });

  };

  submitRequest = () => {
    var sessionDetails = undefined;

    console.log([this.state.catagory, this.state.body, this.state.subject]);
    if (this.state.catagory && this.state.body && this.state.subject) {
     
      console.log([
        this.props.UserID ,this.props.CounsellorID ,
        
        
        this.state.catagory, this.state.body, this.state.subject ]);
        if (Number.isInteger(parseInt(this.props.UserID)   )  &&   Number.isInteger(parseInt(this.props.CounsellorID)   ) ) {
            const data = {
              user1:   this.props.UserID,
              user2:  this.props.CounsellorID  ,
              catagory:this.state.catagory   ,
              message:this.state.body ,
              subject :this.state.subject
            };

            console.log(data)


            const headers = {
              jwtToken: localStorage.jwtToken
            }
      
            axios.post(`http://localhost:5000/messages/createChats`, data, {
              headers: headers
            }) 
      .then(res => {
          console.log(res);
          console.log(res.data);


              toast.success('Message is sent to counsellor!', {
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

              toast.error('Unsuccessful to send message to counsellor', {
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
      
    }else {
      toast.error('Session Expired. Please relogin', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: '',
    });
       
    }
 
    } else {

      this.setState({ formWarning: "Invalid form" });
    }
  };
  slotChange = (e, data) => {
    console.log("---------------------------------");
    this.setState({ catagory: data.value, formWarning: '' });

    console.log(data);
  };
  _onKeyUpSubject = e => {
    var value = e.target.value.toLowerCase();
    this.setState({ subject: value });
  };
  _onKeyUpMessage = e => {
    var value = e.target.value.toLowerCase();
    this.setState({ body: value });
  };

  render() {
    return (

      <Container> <Segment>

 
        <Form  > < Form.Group widths='equal'>

          <Form.Select   placeholder='Add catagory'
            label="Catagory"
            fluid 
            selection value={this.state.catagory}
            onChange={this.slotChange} options={this.state.slotOptions} />
        </Form.Group >
          < Form.Group  widths='equal' >
            <Form.Input label="Subject"
              
              type="subject"
              onChange={this._onKeyUpSubject}
              name="s"
              id="s"
              placeholder="subject"
            />
            <br />
          </Form.Group> < Form.Group  widths='equal'>
            <Form.TextArea
              label="Message"
              
              type="message"
              onChange={this._onKeyUpMessage}
              name="s"
              id="s"
              placeholder="message"
            />
          </Form.Group>
        </Form>
      </Segment>  
        <p style={{ color: 'red' }}>{this.state.formWarning}</p>
        < br />
        <button class="ui button" onClick={this.submitRequest}>Submit</button>

      </Container>


    )
  }
}

export default CreateMessage;

