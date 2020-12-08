import React from 'react';
import {
    Button, Form, Header, Image, Input,
    Dropdown, Grid, Modal,Rating,
    Message, Segment, Card, Img, Icon,
    Table, Label, Container, List, Popup,  
} from "semantic-ui-react";

import { ToastContainer, toast } from 'react-toastify';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {baseURLAPI ,baseURL }from "../../../../Global";
const axios = require('axios');
class ViewAccepted extends React.Component {
    state = {
        requests: [],
        openModel: false,
        element: {},
    
    }

    componentDidMount() {
        axios.get(baseURLAPI+'/session/accepted/'+localStorage.userID, {
            headers: {
                jwtToken: localStorage.jwtToken
            },
            data: {
                userID: localStorage.userID

            }
        })
            .then((res) => {
                console.log("-------------------------------------------------------------------res");
                const requests = res.data;
                console.log(requests);
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


                    var eventdatestart = startdate;

                    var eventdateend = enddate;
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
                        title: 'Counselling Session', start: str, end: endstr,

                        extendedProps: { element: element }
                    };

                    display.push(obj);
                });

                const openModel = false;
                this.setState({ requests: display, openModel: openModel });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleEventClick = ({ event }) => {
        // openAppointment is a function I wrote to open a form to edit that appointment

        console.log(event);
        // window.open(event._def.extendedProps.url);
        console.log(event);



        this.setState({ openModel: true, element: event._def.extendedProps.element })


    }
 


    openGoogleMeet = (url) => {
        window.open(url);
    }
   


    
    render() {
        return (
            <Grid columns='equal' divided>
                <Grid.Row textAlign='center'>
                    <Grid.Column>

                        <Container>



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
                                open={this.state.openModel} >
                                <Modal.Header>Session Details </Modal.Header>
                                <Modal.Content  >

                                    Counsellee Username  : {this.state.element.TX_USER_NAME}  <br />
                                    Counsellee  Email : {this.state.element.TX_USER_EMAIL}  <br />
                                    Session Date  : {this.state.element.ct_session_date}  <br />
                                    Session Start Time  : {this.state.element.ct_session_start_time} <br />
                                    Session End Time  : {this.state.element.ct_session_end_time}   <br />  <br />
                                    <Button color='teal'
                                        onClick={() => window.open(this.state.element.ct_meeting_url)}
                                    > Google Meet Link
                                                 </Button>

                                                 
                                             




                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='black' onClick={() => this.setState({ openModel: false })}>
                                        Close
                                                                </Button>
                                </Modal.Actions>
                            </Modal>













                            {/* <h1>Accepted requests for sessions</h1>
                            <Table basic='very' celled collapsing>
                                <Table.Header>
                                    <Table.Row>
                                    <Table.HeaderCell> Session ID </Table.HeaderCell>
                                        <Table.HeaderCell> Counsellee Name </Table.HeaderCell>
                                        <Table.HeaderCell> Counsellee Email </Table.HeaderCell>
                                        <Table.HeaderCell>Session Start Time </Table.HeaderCell>
                                        <Table.HeaderCell>Session Meeting URL </Table.HeaderCell>
                                        <Table.HeaderCell>Session Session Start Time  </Table.HeaderCell>
                                        <Table.HeaderCell>Session Session End Time </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {this.state.requests.length > 0 ? (
                                        this.state.requests.map((details, index) => (
                                            
  
                                            <Table.Row>
                                               < Table.Cell>
                                                    {details.id}
                                                </Table.Cell>
                                                
                                                <Table.Cell>
                                                    {details.TX_USER_NAME}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {details.TX_USER_EMAIL}
                                                </Table.Cell>
                                                <Table.Cell>
                                                  
                            <a class="ui teal label"  onClick= {() => {    window.open(details.ct_meeting_url ); }}>Google Meet Link </a>

                                                </Table.Cell>
                                                <Table.Cell>
                                                    {details.ct_session_date}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {details.ct_session_start_time}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {details.ct_session_end_time}
                                                </Table.Cell>
                                            </Table.Row>))
                                    ) :
                                        (
                                            <Table.Row>
                                                <Table.Cell>
                                                    No accepted requests requests found for you  
                                        </Table.Cell>
                                            </Table.Row>
                                        )
                                    }
                                </Table.Body>
                            </Table> */}
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default ViewAccepted;