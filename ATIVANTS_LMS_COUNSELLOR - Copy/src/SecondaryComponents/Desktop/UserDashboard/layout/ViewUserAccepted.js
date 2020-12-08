import React from 'react';
import {
    Button, Form, Header, Image, Input,
    Dropdown, Grid, Modal,
    Message, Segment, Card, Img, Icon,Rating,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";
import { ToastContainer, toast } from 'react-toastify';
import ChangeSession from "./UserRequestChangeSessionModel"
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
// import FullCalendar from '@fullcalendar/react'
// import interactionPlugin from '@fullcalendar/interaction'
// import timeGridPlugin from ' ullcalendar/timegrid'
 
import {baseURLAPI ,baseURL }from "../../../../Global";
const axios = require('axios'); 


class ViewAccepted extends React.Component {
    state = {
        requests: [],
        openModel: false,
        element : {},     rating :0 , maxRating : 5,
        feedback :''
    }

    componentDidMount() {
       this.setTable();
    }
    setTable = ( ) => {
        axios.get(baseURLAPI+'/session/user/accepted/'+localStorage.userID, {
            headers: {
                jwtToken: localStorage.jwtToken
            },
            data: {
                userID: localStorage.userID

            }
        })
            .then((res) => {
                const requests = res.data;
                var display = [];

                requests.forEach(element => {

                    // var datestr = element.ct_session_start_time.split("T");

                    // var datestrdate = datestr[0].split("-");
                    // var datestr3 = datestr[1].split(":");

                    // var enddatestr = element.ct_session_end_time.split("T");

                    // var enddatestr3 = enddatestr[1].split(":");
                    // var day = (parseInt(datestrdate[2])).toString();

                    // element.ct_session_start_time = datestr3[0] + ":" + datestr3[1];
                    // element.ct_session_end_time = enddatestr3[0] + ":" + enddatestr3[1];
                    // element.ct_session_date = day + "/" + datestrdate[1] + "/" + datestrdate[0];

          
                    let strsa = element.ct_session_start_time;
                    var st = strsa.split('T');
                    var stDF = st[1].split(':');
                    let str = st[0]+"T"  +stDF[0]     +":"  +stDF[1]      +":00"               ;
                 
                    let startdate = new Date(str  ); 
                     
                    let endstrsa = element.ct_session_end_time;
                    var endst = endstrsa.split('T');
                    var endstDF = endst[1].split(':');
                    let endstr = endst[0]+"T"  +endstDF[0]     +":"  +endstDF[1]      +":00"               ;
                 
                    let enddate = new Date(endstr  ); 


                    var eventdatestart = startdate;  

                    var eventdateend =  enddate   ;   
                    var datestr = element.ct_session_start_time.split("T");

                    var datestrdate = datestr[0].split("-");
                    var datestr3 = datestr[1].split(":");

                    var enddatestr = element.ct_session_end_time.split("T");

                    var enddatestr3 = enddatestr[1].split(":");
                    var day = (parseInt(datestrdate[2])).toString();

                    element.ct_session_start_time = datestr3[0] + ":" + datestr3[1];
                    element.ct_session_end_time = enddatestr3[0] + ":" + enddatestr3[1];
                    element.ct_session_date = day + "/" + datestrdate[1] + "/" + datestrdate[0];
                    var obj = {title: 'Counselling Session', start :  str ,end :endstr,
                 
                    extendedProps: {  element: element     }};
                     
                    display.push(obj);
                });
              
                const openModel = false;
                this.setState({ requests : display, openModel :openModel });
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    acceptRequest = (requestID, response) => {
        console.log(requestID);
        console.log(response);
        var data = {
            requestID: requestID,
            response: response,
            counsellorID: localStorage.userID
        };

        var options = {
            headers: {
                jwtToken: localStorage.jwtToken,
            }
        };
        axios.get(baseURLAPI+'/request/google/get',
            {
                params: {
                    requestID: requestID,
                    response: response,
                    counsellorID: localStorage.userID
                }
            })
            .then((res) => {

                if (res.status == 200) {
                    toast.success('Request accepted successfully!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: '',
                    });

                    this.setTable();
                }
                else {
                    toast.error(res.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: '',
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    handleEventClick= ({event}) => {
        // openAppointment is a function I wrote to open a form to edit that appointment
        console.log(event);
        // window.open(event._def.extendedProps.url);
        console.log(event);
         


        this.setState({ openModel: true , element : event._def.extendedProps.element })


    }

    handleRate = (e, { rating, maxRating }) =>
    this.setState({ rating, maxRating })
    _onKeyUp = e => {
        var value = e.target.value.toLowerCase();
        this.setState({ feedback: value });
    };


    openGoogleMeet= (url) => {
        window.open( url);
    }
    sendMessage = () => {
        console.log(this.state.feedback);
         


        const headers = {
            jwtToken: localStorage.jwtToken
        }
        const formData = {
            feedback: this.state.feedback,
            rating: this.state.rating ,





        }
        axios.post(baseURLAPI + '/messages/creaddddddddddddddddteMessages', formData, {
            headers: headers
        })
            .then((res) => {
                console.log(res);
             
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <Grid columns='equal' divided>

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
    events={ this.state.requests}
    eventClick={this.handleEventClick}

  />



<Modal
                                                        onClose={() => this.setState({ openModel: false })}
                                                        onOpen={() => this.setState({ openModel: true })}
                                                        open={this.state.openModel}
                                                      
                                                    >
                                                        <Modal.Header>Session Details </Modal.Header>
                                                        <Modal.Content  >

                                                  Counsellor Username  : {this.state.element.TX_USER_NAME}  <br/>
                                                  Counsellor  Email : {this.state.element.TX_USER_EMAIL}  <br/>
                                                Session Date  : {this.state.element.ct_session_date}  <br/>
                                                Session Start Time  : {this.state.element.ct_session_start_time} <br/> 
                                                Session End Time  : {this.state.element.ct_session_end_time}  <br/>
                                                <Button color='teal'
                                                 onClick={() => window.open(this.state.element.ct_meeting_url)}
                                                 > Google Meet Link
                                                 </Button> 



                                                 <Form  >
        <Form.Group>
          <Form.Input
           style ={{width:"300px"}} 
           type="FeedBack"
           onChange={this._onKeyUp                                       }
           name="m"
           id="m"
           placeholder="FeedBack"
       
          />
         <Rating maxRating={5} onRate={this.handleRate} />
          <Form.Button style ={{width:"100px"}} onClick={() => this.sendMessage()}>  Send </Form.Button>
        </Form.Group>
      </Form>            




                                                        </Modal.Content>
                                                        <Modal.Actions>
                                                            <Button color='black' onClick={() => this.setState({ openModel: false })}>
                                                                Close
                                                                </Button>
                                                        </Modal.Actions>
                                                    </Modal>











{/* 

                        <Container>
                            <h1>Requests for sessions</h1>
                            <Table basic='very' celled collapsing>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Session ID </Table.HeaderCell>

                                        <Table.HeaderCell>Counsellee Name </Table.HeaderCell>
                                        <Table.HeaderCell>Counsellee Email </Table.HeaderCell>

                                        <Table.HeaderCell>Session Date </Table.HeaderCell>
                                        <Table.HeaderCell>Session Start Time </Table.HeaderCell>
                                        <Table.HeaderCell>Session End Time </Table.HeaderCell>
                                        <Table.HeaderCell>Session Time Zone </Table.HeaderCell>
                                        <Table.HeaderCell>Options</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {this.state.requests.length > 0 ? (
                                        this.state.requests.map((details, index) => (
                                            <Table.Row>
                                                <Table.Cell>
                                                    {details.url}
                                                </Table.Cell>

{/*                                                 
                                                <Table.Cell>
                                                    {details.TX_USER_NAME}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {details.TX_USER_EMAIL}
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
                                                <Table.Cell>
                                                    {details.ct_counsellor_timezone_code}
                                                </Table.Cell> */}
                                                {/* <Table.Cell>
                                                <button   class="ui positive button"   onClick={() => this.acceptRequest(details.id, 1)}><Icon name='check' /> Accept </button>
 
                                                </Table.Cell>    <Table.Cell>
                                                <button class="ui negative button"  onClick={() => this.acceptRequest(details.id, 0)} ><Icon name='close' /> Decline </button>
                                                   
                                                </Table.Cell>    */}
                                               
 

                                                {/* <Table.Cell>
                                                  
                                                    <Modal
                                                        onClose={() => this.setState({ openModel: false })}
                                                        onOpen={() => this.setState({ openModel: true })}
                                                        open={this.state.openModel}
                                                        trigger={<Button  class="ui button"         color='yellow' ><Icon name='edit ' /> Change Session Timing  </Button>}
                                                    >
                                                        <Modal.Header>Request Session Change</Modal.Header>
                                                        <Modal.Content  >
                                                            <ChangeSession
                                                                CounsellorID={details.ct_counsellor_id}
                                                                RequestID={details.id}
                                                                UserID={localStorage.userID}
                                                            />
                                                        </Modal.Content>
                                                        <Modal.Actions>
                                                            <Button color='black' onClick={() => this.setState({ openModel: false })}>
                                                                Close
                                                                </Button>
                                                        </Modal.Actions>
                                                    </Modal>
                                                </Table.Cell> */}

                                            {/* </Table.Row>))
                                    ) :
                                        (
                                            <Table.Row>
                                                <Table.Cell>
                                                    No requests found for you today
                                        </Table.Cell>
                                            </Table.Row>
                                        )
                                    }
                                </Table.Body>
                            </Table>
                        </Container>  */}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default ViewAccepted; 