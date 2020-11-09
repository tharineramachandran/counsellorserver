
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
class ChangeSession extends React.Component {
  constructor(props) {
    super(props)

  }

  state = {
    person: [],
    sessionDate: '',
    sessionStart: '',
    sessionEnd: '',
    startDate: "",
    slots: [],
    slotValue: '',
    formWarning: '',
    slotOptions: [],
    addedSessions: []
  }

  componentDidMount() {
    const slotOptions = [
      { key: 'af', value: 'af', text: 'Afghanistan' },
      { key: 'ax', value: 'ax', text: 'Aland Islands' },
      { key: 'al', value: 'al', text: 'Albania' },
      { key: 'dz', value: 'dz', text: 'Algeria' },
    ]
    axios.get(`http://localhost:5000/Counsellor/GetSingleCounsellorDetails/` + this.props.CounsellorID
    )
      .then(res => {
        console.log(res);
        const person = res.data.counsellor;
        this.setState({ person: person, slotOptions: slotOptions, formWarning: '' });

        if (this.state.person ) {

        if (this.state.person.counselling_monday.length < 1) {

          daysNotAvailableList.push(1);
        }
        if (this.state.person.counselling_tuesday.length < 1) {

          daysNotAvailableList.push(2);
        } if (this.state.person.counselling_wednesday.length < 1) {

          daysNotAvailableList.push(3);
        } if (this.state.person.counselling_thursday.length < 1) {

          daysNotAvailableList.push(4);

        } if (this.state.person.counselling_friday.length < 1) {

          daysNotAvailableList.push(5);
        }
        if (this.state.person.counselling_saturday.length < 1) {

          daysNotAvailableList.push(6);
        }}

      })
  }
  isWeekday = date => {
    const day = date.getDay();
    return day !== 0 && !(daysNotAvailableList.includes(day));
  };
  slotChange = (e, data) => {
    console.log("---------------------------------");
    this.setState({ slotValue: data.value, formWarning: '' });

    console.log(data);
  };
 
  onDateChange = (date) => {
    console.log(["ddddddddddddddddd", date]);
    this.setState({ startDate: date, slotValue: date });
    var slot = [];
    var slotOptions = [];

    if (date.getDay() == 1) {

      slot = this.state.person.counselling_monday;
    }
    if (date.getDay() == 2) {

      slot = this.state.person.counselling_tuesday;
    }
    if (date.getDay() == 3) {

      slot = this.state.person.counselling_wednesday;
    }
    if (date.getDay() == 4) {

      slot = this.state.person.counselling_thursday;
    }

    if (date.getDay() == 5) {

      slot = this.state.person.counselling_friday;
    } if (date.getDay() == 6) {

      slot = this.state.person.counselling_saturday;
    }
    for (var details in slot) {

      slotOptions.push({ key: slot[details].id, value: slot[details].id, text: slot[details].ct_from + " to " + slot[details].ct_to });

    }

    this.setState({ slots: slot, slotOptions: slotOptions, formWarning: '', slotValue: '' });
  };

  addDate = () => {
    var sessionDetails = undefined;
    if (this.state.slotValue && this.state.startDate) {
      console.log(this.state.slots);
      for (var session in this.state.slots) {

        if (this.state.slots[session].id == this.state.slotValue) {

          sessionDetails = this.state.slots[session];
          break;
        }
      }
      const data = {
        strdate: this.state.startDate.toString(),
        session: this.state.slotValue,
        date: this.state.startDate,
        userId: this.props.UserID,
        counsellorId: this.props.CounsellorID,
        sessionDetails: sessionDetails
      };

      let stateAdded = this.state.addedSessions; 
      var sameValue= true;
      if (stateAdded.length > 0) {

        stateAdded.forEach(checkForDuplicate);

        function checkForDuplicate(item, index) {

          
          if ((item.strdate == data.strdate && item.sessionDetails.ct_to == data.sessionDetails.ct_to && item.sessionDetails.ct_from == data.sessionDetails.ct_from)) {
            sameValue= false;
          } 
           
        }
      }
      if(sameValue) {  
        stateAdded.push(data); 
       
      }else{ this.setState({ formWarning: "Same session timing selected" });}
      this.setState({ addedSessions: stateAdded }); 
    } else {

      this.setState({ formWarning: "Invalid form" });
    }
  };

  submitRequest= () => { 
    const headers =  {
      jwtToken: localStorage.jwtToken
    }
    const data =  {
      requestID: this.props.RequestID,
      session: this.state.addedSessions
    }
    axios.post('http://localhost:5000/session/sessionchange',  data, {
      headers: headers
    })
      .then((res) => {
          console.log(res); 
          toast.success('Change request sent to counselee', {
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

      })
      .catch(function (error) {
          console.log(error);
          toast.error('an error occured', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: '',
          });
      }); 
  }

  render() {
    return (

      <Container>
         <div  className="appBanner"  >
        <h3>Pick a date for the counselling session  </h3>

        <DatePicker
          selected={this.state.startDate}
          onChange={this.onDateChange}
          filterDate={this.isWeekday}
          onCalendarClose={this.handleCalendarClose}
          placeholderText="Select a day for meeting " />



        {this.state.slots.length > 0 ? (<div>
          < br />
          <h3>Choose a slot on the day</h3>
          <Dropdown placeholder='Add slot timing'
            fluid
            selection value={this.state.slotValue} onChange={this.slotChange} options={this.state.slotOptions} />
        </div>) :
          (<strong>

          </strong>)
        }
        < br />
        <p style={{ color: 'red' }}>{this.state.formWarning}</p>
        < br />
        <button  class="ui button" onClick={this.addDate}>Add Date</button>


        </div>
        <h3>requested counselling session  change dates</h3>

        {this.state.addedSessions.length > 0 ? (<div>
          {this.state.addedSessions.map((details, index) => (
            <p>
              <span> {details.strdate} ------- {details.sessionDetails.ct_from}  ------- {details.sessionDetails.ct_to}</span>
            </p>
          ))}
        </div>
        ) :
          (<strong>

          </strong>)
        }
<div className="appBanner"    >
<button   class="ui button" onClick={this.submitRequest}>Submit Change Request</button>
</div>
</Container>

    )
  }
}

export default ChangeSession;

