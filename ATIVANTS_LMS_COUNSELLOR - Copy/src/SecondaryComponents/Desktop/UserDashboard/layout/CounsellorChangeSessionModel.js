import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Form,
  Header,
  Dimmer,
  Loader,
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

import { baseURLAPI, baseURL } from "../../../../Global";
import { ToastContainer, toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
const axios = require("axios");

var daysNotAvailableList = [];
class ChangeSession extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    person: [],
    sessionDate: "",
    sessionStart: "",
    sessionEnd: "",
    startDate: "",
    slots: [],
    isLoading: true,
    slotValue: "",
    formWarning: "",
    slotOptions: [],
    addedSessions: [],
  };

  componentDidMount() {
    const slotOptions = [
      { key: "af", value: "af", text: "Afghanistan" },
      { key: "ax", value: "ax", text: "Aland Islands" },
      { key: "al", value: "al", text: "Albania" },
      { key: "dz", value: "dz", text: "Algeria" },
    ];
     console.log(this.props)
    axios
      .get(
        baseURLAPI +
          "/Counsellor/GetSingleCounsellorDetails/" +
          this.props.CounsellorID
      )
      .then((res) => {
        console.log(res);
        const person = res.data.counsellor;

        if (person) {
          if (person.counselling_monday.length < 1) {
            daysNotAvailableList.push(1);
          }
          if (person.counselling_tuesday.length < 1) {
            daysNotAvailableList.push(2);
          }
          if (person.counselling_wednesday.length < 1) {
            daysNotAvailableList.push(3);
          }
          if (person.counselling_thursday.length < 1) {
            daysNotAvailableList.push(4);
          }
          if (person.counselling_friday.length < 1) {
            daysNotAvailableList.push(5);
          }
          if (person.counselling_saturday.length < 1) {
            daysNotAvailableList.push(6);
          }
        }
        this.setState({
          person: person,
          slotOptions: slotOptions,
          formWarning: "",
          isLoading: false,
        });
      });
  }
  isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && !daysNotAvailableList.includes(day);
  };
  slotChange = (e, data) => {
    console.log("---------------------------------");
    this.setState({ slotValue: data.value, formWarning: "" });

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
    }
    if (date.getDay() == 6) {
      slot = this.state.person.counselling_saturday;
    }
    for (var details in slot) {
      slotOptions.push({
        key: slot[details].id,
        value: slot[details].id,
        text: slot[details].ct_from + " to " + slot[details].ct_to,
      });
    }

    this.setState({
      slots: slot,
      slotOptions: slotOptions,
      formWarning: "",
      slotValue: "",
    });
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
        sessionDetails: sessionDetails,
      };

      let stateAdded = this.state.addedSessions;
      var sameValue = true;
      if (stateAdded.length > 0) {
        stateAdded.forEach(checkForDuplicate);

        function checkForDuplicate(item, index) {
          if (
            item.strdate == data.strdate &&
            item.sessionDetails.ct_to == data.sessionDetails.ct_to &&
            item.sessionDetails.ct_from == data.sessionDetails.ct_from
          ) {
            sameValue = false;
          }
        }
      }
      if (sameValue) {
        stateAdded.push(data);
      } else {
        this.setState({ formWarning: "Same session timing selected" });
      }
      this.setState({ addedSessions: stateAdded });
    } else {
      this.setState({ formWarning: "Invalid form" });
    }
  };

  submitRequest = () => {
    const headers = {
      jwtToken: localStorage.jwtToken,
    };
    const data = {
      requestID: this.props.RequestID,
      session: this.state.addedSessions,
    };
    axios
      .post(baseURLAPI + "/session/sessionchange", data, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        toast.success("Change request sent to counselee", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: "",
        });
        var els = document.getElementsByClassName("appBanner");
        for (var i = 0; i < els.length; i++) {
          els[i].style.display =
            els[i].style.display == "none" ? "block" : "none";
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("an error occured", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: "",
        });
      });
  };

  render() {
    return (
      <Container>
        {this.state.isLoading ? (
          <div>
            <Container textAlign="center">
              <h3> Page is loading..</h3>
              <Icon size="huge" loading name="spinner" />
            </Container>
          </div>
        ) : (
          <div>
            <div className="appBanner">
              <h3>Pick a date for the counselling session </h3>

              <DatePicker
                selected={this.state.startDate}
                onChange={this.onDateChange}
                filterDate={this.isWeekday}
                onCalendarClose={this.handleCalendarClose}
                placeholderText="Select a day for meeting "
              />
            </div>
            {this.state.slots.length > 0 ? (
              <div>
                {" "}
                <div className="appBanner">
                  <br />
                  <h3>Choose a slot on the day</h3>
                  <Dropdown
                    placeholder="Add slot timing"
                    fluid
                    selection
                    value={this.state.slotValue}
                    onChange={this.slotChange}
                    options={this.state.slotOptions}
                  />

                  <p style={{ color: "red" }}>{this.state.formWarning}</p>

                  <button class="ui button" onClick={this.addDate}>
                    Add Date
                  </button>
                </div>
                <Table basic="very" celled collapsing>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Session Date </Table.HeaderCell>
                      <Table.HeaderCell>Session Start Time </Table.HeaderCell>
                      <Table.HeaderCell>Session End Time </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.state.addedSessions.length > 0 ? (
                      this.state.addedSessions.map((details, index) => (
                        <Table.Row>
                          <Table.Cell>
                            {details.strdate.substring(0, 15)}
                          </Table.Cell>
                          <Table.Cell>
                            {details.sessionDetails.ct_from}
                          </Table.Cell>
                          <Table.Cell>
                            {details.sessionDetails.ct_to}
                          </Table.Cell>
                        </Table.Row>
                      ))
                    ) : (
                      <Table.Row>
                        <Table.Cell> No change sessions</Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
                <div className="appBanner">
                  <button class="ui button" onClick={this.submitRequest}>
                    Submit Change Request
                  </button>
                </div>
              </div>
            ) : (
              <strong></strong>
            )}
          </div>
        )}

        {/* {this.state.isLoading ? (<div> </div>) :( <div> < br /><h3>Requested counselling session  change dates</h3> */}

        {/* </div> )} */}
      </Container>
    );
  }
}

export default ChangeSession;
