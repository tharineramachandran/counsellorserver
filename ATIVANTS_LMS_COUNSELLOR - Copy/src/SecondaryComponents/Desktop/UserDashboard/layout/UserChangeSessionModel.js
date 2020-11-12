
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
import {baseURLAPI ,baseURL }from "../../../../Global"; 
const axios = require('axios');

var daysNotAvailableList = [];
class UserChangeSession extends React.Component {
  constructor(props) {
    super(props)

  }

  state = {
    request: [],
    slots: [],
    slotValue: '',
    formWarning: '',
    slotOptions: []
  }

  componentDidMount() {

    const slotOptions = [];
    var element = this.props.Request;
    for (let x = 0; x < element.changeRequests.length; x++) {
      slotOptions.push({ key: element.changeRequests[x].id, value: element.changeRequests[x].id, text: element.changeRequests[x].ct_session_start_time + " to " + element.changeRequests[x].ct_session_end_time + " on " + element.changeRequests[x].ct_session_date });
    }
    this.setState({ slots: slotOptions, slotOptions: slotOptions, formWarning: '', slotValue: '' });
  };
  slotChange = (e, data) => {
    this.setState({ slotValue: data.value, formWarning: '' });

    console.log(data);
  };
  submitRequest = () => {

    if (this.state.slotValue) {
      const data = {
        session: this.state.slotValue
      };
      console.log(data)
      const headers = {
        jwtToken: localStorage.jwtToken
      }

      axios.post( baseURLAPI+'/session/user/acceptChange', data, {
        headers: headers
      })
        .then(res => {
          console.log(res);
          console.log(res.data);
          toast.success('Request is sent to counsellor!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: '',
          });
          var els = document.getElementsByClassName('appBanner');
          for (var i = 0; i < els.length; i++) {
            els[i].style.display = els[i].style.display == "none" ? "block" : "none";
          }

        }).catch((error) => {
          if (error.response) {

            toast.error('Unsuccessful request counsellor', {
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

  render() {
    return (

      <Container>
        <h3>Pick one of the following sessions for counselling change</h3>
        {this.state.slots.length > 0 ? (<div>
          < br />
          <Dropdown placeholder='Add slot timing'
            fluid
            selection value={this.state.slotValue} onChange={this.slotChange} options={this.state.slotOptions} />
        </div>) :
          (<strong>
            no slot timing available
          </strong>)
        }
        < br />
        <p style={{ color: 'red' }}>{this.state.formWarning}</p>
        < br />
        <button className="appBanner" class="ui button" onClick={this.submitRequest}>Submit</button>
      </Container>
    )
  }
}

export default UserChangeSession;

