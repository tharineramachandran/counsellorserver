import React from 'react';
import {
    Button, Form, Header, Image, Input,
    Dropdown, Grid, Modal, Placeholder,
    Message, Segment, Card, Img, Icon,
    Table, Label, Container, List, Popup, Rating
} from "semantic-ui-react";
import { ToastContainer, toast } from 'react-toastify'; 
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
// import FullCalendar from '@fullcalendar/react'
// import interactionPlugin from '@fullcalendar/interaction'
// import timeGridPlugin from ' ullcalendar/timegrid'

import { baseURLAPI, baseURL } from "../../../../../../Global";
const axios = require('axios');


class ViewRequest extends React.Component {
    state = {
        requests: [],
        openModel: false,
        element: {}, rating: 0, maxRating: 5,
        feedback: ''
    }

    componentDidMount() {
        this.setTable();
    }
    setTable = () => {
        axios.get(baseURLAPI + '/request/user/getRequests/' + localStorage.userID, {
            headers: {
                jwtToken: localStorage.jwtToken
            },
            data: {
                userID: localStorage.userID

            }
        })
            .then((res) => {
                const requests = res.data;
                var display = this.dateTimeFormat(requests, "#db2828", "Unconfirmed sessions");


                const openModel = false;
                this.setState({ requests: display, openModel: openModel });

            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get(baseURLAPI + '/session/user/accepted/' + localStorage.userID, {
            headers: {
                jwtToken: localStorage.jwtToken
            },
            data: {
                userID: localStorage.userID

            }
        })
            .then((res) => {
                const requests = res.data;
                var display = this.dateTimeFormat(requests, "#21ba45", "Confirmed sessions");
                var final = this.state.requests.concat(display);
                console.log("final"); console.log(final);  
                const openModel = false;
                this.setState({ requests: final, openModel: openModel });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    dateTimeFormat = (requests, backgroundColor, title) => {

        var display = [];

        requests.forEach(element => {

            let strsa = element.ct_session_start_time;
            var st = strsa.split('T');
            var stDF = st[1].split(':');
            let str = st[0] + "T" + stDF[0] + ":" + stDF[1] + ":00";
            let startdate = new Date(str);
            let endstrsa = element.ct_session_end_time;
            var endst = endstrsa.split('T');
            var endstDF = endst[1].split(':');
            let endstr = endst[0] + "T" + endstDF[0] + ":" + endstDF[1] + ":00";

            let enddate = new Date(endstr);
            var datestr = element.ct_session_start_time.split("T");
            var datestrdate = datestr[0].split("-");
            var datestr3 = datestr[1].split(":");
            var enddatestr = element.ct_session_end_time.split("T");
            var enddatestr3 = enddatestr[1].split(":");

            var day = (parseInt(datestrdate[2])).toString();

            element.ct_session_start_time = datestr3[0] + ":" + datestr3[1];
            element.ct_session_end_time = enddatestr3[0] + ":" + enddatestr3[1];
            element.ct_session_date = day + "/" + datestrdate[1] + "/" + datestrdate[0];

            var obj = {
                title: title, start: str, end: endstr,
                color: backgroundColor,
                extendedProps: { element: element }
            };
            display.push(obj);
        });

        return display
    }

    handleRate = (e, { rating, maxRating }) =>
        this.setState({ rating, maxRating })
    _onKeyUp = e => {
        var value = e.target.value.toLowerCase();
        this.setState({ feedback: value });
    };


    sendMessage = () => {
        console.log(this.state.feedback);

        const headers = {
            jwtToken: localStorage.jwtToken
        }
        const data = {
            requestID: this.state.element.ct_request_id,
            feedback: this.state.feedback,
            rating: this.state.rating,
            userID: this.state.element.ct_user_id,
            cousellorID: this.state.element.ct_counsellor_id

        }
        axios.post(baseURLAPI + '/Counsellor/rating', { formData: data }, {
            headers: headers
        })
            .then((res) => {
                console.log(res);
                toast.success('Feedback Successfully Sent!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: '',
                });
            })
            .catch(function (error) {
                console.log(error);
                toast.error('An error occurred!', {
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

    handleEventClick = ({ event }) => { 
        console.log(event);
        this.setState({ openModel: true, element: event._def.extendedProps.element })
    }
    render() {
        return (
            <Grid columns='equal' divided style={{ padding: '3%' }}>
                <Grid.Row>      <Grid.Column>
                    <div>
                        <Message>
                            <Message.Header>Legend</Message.Header>
                            <p>   <Label color='green' circular empty ></Label>  Confirmed Sessions</p>
                            <p> <Label color='red' circular empty ></Label> Unconfirmed Sessions</p>
                        </Message>
                    </div>
                </Grid.Column>     </Grid.Row>
                <Grid.Row textAlign='center'>
                    <Grid.Column>
                        <FullCalendar
                            nowIndicator={true}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                            }}
                            initialView='dayGridMonth'
                            events={this.state.requests}
                            eventClick={this.handleEventClick}

                        />
                        <Modal
                            onClose={() => this.setState({ openModel: false })}
                            onOpen={() => this.setState({ openModel: true })}
                            open={this.state.openModel}
                        >
                            <Modal.Header>Session Details </Modal.Header>
                            <Modal.Content  >
                                <p> <strong>Counsellor Username  :</strong> {this.state.element.TX_USER_NAME} </p>
                                <p> <strong> Counsellor  Email :</strong> {this.state.element.TX_USER_EMAIL} </p>
                                <p> <strong> Session Date  : </strong> {this.state.element.ct_session_date}  </p>
                                <p> <strong>    Session Start Time  :</strong>  {this.state.element.ct_session_start_time} </p>
                                <p> <strong>   Session End Time  : </strong> {this.state.element.ct_session_end_time} </p>
                                <br />
                                {this.state.element.ct_meeting_url ? (
                                    <div>
                                       
                                        <Button color='teal'
                                            onClick={() => window.open(this.state.element.ct_meeting_url)}
                                        > Google Meet Link
                                                     </Button> 
                                                     </div>
                                )
                                    : (
                                        <strong style={{ color: "red" }}> This session has not be confirmed by the counsellor</strong>
                                    )
                                }
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='black' onClick={() => this.setState({ openModel: false })}>
                                    Close
                                    </Button>
                            </Modal.Actions>
                        </Modal>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default ViewRequest;