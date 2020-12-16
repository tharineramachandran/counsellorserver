
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

import { baseURLAPI, baseURL } from "../../../../Global";
import { ToastContainer, toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
const axios = require('axios');

var daysNotAvailableList = [];
class CreateSession extends React.Component {
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
    slotOptions: [], programmeslotValue: '', programmeslotValue: []

  }

  componentDidMount() {

    console.log("---------------------------------");
    console.log(this.state); 
    console.log(this.props); 

    var slotOptions = [ 
    ]
    


    console.log(this.props);
    console.log(this.state);
    if (this.props.person.counselling_monday.length < 1) {

      daysNotAvailableList.push(1);
    }
    if (this.props.person.counselling_tuesday.length < 1) {

      daysNotAvailableList.push(2);
    } if (this.props.person.counselling_wednesday.length < 1) {

      daysNotAvailableList.push(3);
    } if (this.props.person.counselling_thursday.length < 1) {

      daysNotAvailableList.push(4);

    } if (this.props.person.counselling_friday.length < 1) {

      daysNotAvailableList.push(5);
    }
    if (this.props.person.counselling_saturday.length < 1) {

      daysNotAvailableList.push(6);
    }
    console.log(this.props.CounsellorID);
    axios.get(baseURLAPI + '/Counsellor/GetSingleCounsellorDetails/' + this.state.CounsellorID
    )
      .then(res => {
        console.log(res);
        const person = res.data.counsellor;
        this.setState({ person: person, slotOptions: slotOptions, formWarning: '' });
      })
  }
  isWeekday = date => {
    const day = date.getDay();
    var today = new Date(); 
    if (date < today) { return false; } 

    return day !== 0 && !(daysNotAvailableList.includes(day));
  };
  slotChange = (e, data) => {
     
    this.setState({ slotValue: data.value, formWarning: '' });

    console.log(data);
  };
  programmeslotChange = (e, data) => {
     
    this.setState({ programmeslotValue: data.value, formWarning: '' });

    console.log(data);
  };



  submitRequest = () => {
    var sessionDetails = undefined;
    if (this.state.slotValue && this.state.startDate) {
      if (Number.isInteger(parseInt(this.props.UserID)) && Number.isInteger(parseInt(this.props.CounsellorID))) {
        console.log(this.state.slots);
        for (var session in this.state.slots) {

          if (this.state.slots[session].id == this.state.slotValue) {

            console.log(session);
            sessionDetails = this.state.slots[session];
            break;
          }
        }
        const data = {
          session: this.state.slotValue,
          date: this.state.startDate,
          userId: this.props.UserID,
          counsellorId: this.props.CounsellorID,
          sessionDetails: sessionDetails,
          requestID: this.state.programmeslotValue
        };

        console.log(data)



        axios.post(baseURLAPI + '/addevent', data)
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

          }).catch((error) => {
            if (error.response) {

              toast.error('Unsuccessful resquest counsellor', {
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


      // axios.post("http://localhost:5000/addevent", data)      
      // .then(res => console.log(res)

      // if (res){}

      // )      
      // .catch(err => console.log(err));
      //   console.log([this.state.slotValue, this.state.startDate]);
    } else {

      this.setState({ formWarning: "Invalid form" });
    }
  };

  onDateChange = (date) => {
    console.log(["ddddddddddddddddd", date]);
    var counselling_details = this.props.person.counselling_details;
    var programmeslotoptions = [];
    
console.log(["-------------------",counselling_details]); 
    for (var details in counselling_details) {

      programmeslotoptions.push({ key: counselling_details[details].id, value: counselling_details[details].id, text: counselling_details[details].ct_counselling_level_name +"-"+  counselling_details[details].ct_counselling_subject_name+',$'+counselling_details[details].ct_counsellor_hourly_rate }    );

      
    } 

    this.setState({ startDate: date, slotValue: date , programmeslotOptions: programmeslotoptions});
    var slot = [];
    var slotOptions = [];

    if (date.getDay() == 1) {

      slot = this.props.person.counselling_monday;
    }
    if (date.getDay() == 2) {

      slot = this.props.person.counselling_tuesday;
    }
    if (date.getDay() == 3) {

      slot = this.props.person.counselling_wednesday;
    }
    if (date.getDay() == 4) {

      slot = this.props.person.counselling_thursday;
    }

    if (date.getDay() == 5) {

      slot = this.props.person.counselling_friday;
    } if (date.getDay() == 6) {

      slot = this.props.person.counselling_saturday;
    }

     
    for (var details in slot) {

      slotOptions.push({ key: slot[details].id, value: slot[details].id, text: slot[details].ct_from + " to " + slot[details].ct_to });

    }
 
    this.setState({ slots: slot, slotOptions: slotOptions, formWarning: '', slotValue: ''      });
  };

  render() {
    return (

      <Container> <Segment>



        <Form  >
          <label>Choose a day</label> <br />< Form.Group widths='equal'>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.onDateChange}
              filterDate={this.isWeekday}
              onCalendarClose={this.handleCalendarClose}
              placeholderText="Select a day for meeting " />

          </Form.Group>

          {this.state.slots.length > 0 ? (<div>

            < br />
            <label>Choose a slot on the day</label> <br />
            < Form.Group widths='equal'>

              <Form.Select placeholder='Add slot timing'

                selection value={this.state.slotValue} onChange={this.slotChange} options={this.state.slotOptions} />
            </Form.Group>


            < br />
            <label>Choose a programme</label> <br />
            < Form.Group widths='equal'>

              <Form.Select placeholder='Add programme'

                selection value={this.state.programmeslotValue} onChange={this.programmeslotChange} options={this.state.programmeslotOptions} />
            </Form.Group>



          </div>) :
            (<strong>

            </strong>)
          }



        </Form>
      </Segment>
        <p style={{ color: 'red' }}>{this.state.formWarning}</p>
        < br />
        <button class="ui button" onClick={this.submitRequest}>Submit</button>

      </Container>


    )
  }
}

export default CreateSession;

