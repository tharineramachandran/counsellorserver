import React from 'react';
import {
    Button, Form, Header, Image, Input,
    Dropdown, Grid, Modal,
    Message, Segment, Card, Img, Icon,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";
import { ToastContainer, toast } from 'react-toastify';
import ChangeSession from "./CounsellorChangeSessionModel"
const axios = require('axios');
class ViewRequest extends React.Component {
    state = {
        requests: [],
        openModel: false,
        totalRequests :0
    }

    componentDidMount() {
       this.setTable();
       setInterval(this.checkValue, 5000);
    }

    checkValue = ( ) => {
        
        if (Number.isInteger(parseInt(localStorage.userID) )){  
            
            axios.get('http://localhost:5000/request/getTotalCounsellorRequests/'+localStorage.userID, {
            headers: {
                jwtToken: localStorage.jwtToken
            },
            data: {
                userID: localStorage.userID

            }
        })
            .then((res) => {
                const totalRequests = res.data;
                console.log("totalRequests");
                console.log(totalRequests);
                const openModel = false;
                if (totalRequests != this.state.totalRequests ){
                    this.setTable();
                    this.setState({ totalRequests, openModel });

                }
                
            })
            .catch(function (error) {
                console.log(error);
            }); }


    }

    setTable = ( ) => {
        if (Number.isInteger(parseInt(localStorage.userID) )){  
        axios.get('http://localhost:5000/request/getCounsellorRequests/'+localStorage.userID, {
            headers: {
                jwtToken: localStorage.jwtToken
            },
            data: {
                userID: localStorage.userID

            }
        })
            .then((res) => {
                const requests = res.data;
                requests.forEach(element => {

                    var datestr = element.ct_session_start_time.split("T");

                    var datestrdate = datestr[0].split("-");
                    var datestr3 = datestr[1].split(":");

                    var enddatestr = element.ct_session_end_time.split("T");

                    var enddatestr3 = enddatestr[1].split(":");
                    var day = (parseInt(datestrdate[2])).toString();

                    element.ct_session_start_time = datestr3[0] + ":" + datestr3[1];
                    element.ct_session_end_time = enddatestr3[0] + ":" + enddatestr3[1];
                    element.ct_session_date = day + "/" + datestrdate[1] + "/" + datestrdate[0];

                });
                const openModel = false;
                
                this.setState({ requests, openModel });
            })
            .catch(function (error) {
                console.log(error);
            });
        }else {

            toast.error("session expired.Please relogin", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: '',
            });


        }

    }


    acceptRequest = (requestID, response) => {
        console.log(requestID);
        console.log(response);
        if (Number.isInteger(parseInt(localStorage.userID) )   ){  



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
        axios.get('http://localhost:5000/request/google/get',
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
                toast.error("please sign-in to your google calendar", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: '',
                });
            });
        }else {

            toast.error("session expired.Please relogin", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: '',
            });


        }    this.setTable();
    };

    render() {
        return (
            <Grid columns='equal' divided>

                <Grid.Row textAlign='center'>
                    <Grid.Column>
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
                                                    {details.id}
                                                </Table.Cell>
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
                                                </Table.Cell>
                                                <Table.Cell>
                                                <button   class="ui positive button"   onClick={() => this.acceptRequest(details.id, 1)}><Icon name='check' /> Accept </button>
 
                                                </Table.Cell>    <Table.Cell>
                                                <button class="ui negative button"  onClick={() => this.acceptRequest(details.id, 0)} ><Icon name='close' /> Decline </button>
                                                   
                                                </Table.Cell>   
                                                <Table.Cell>
                                                  
                                                    <Modal
                                                        onClose={() => this.setState({ openModel: false })}
                                                        onOpen={() => this.setState({ openModel: true })}
                                                        open={this.state.openModel}
                                                        trigger={<Button    class="ui button"        color='yellow' ><Icon name='edit ' />Reschedule  </Button>}
                                                    >
                                                        <Modal.Header>Request Session Change</Modal.Header>
                                                        <Modal.Content  >
                                                            <ChangeSession
                                                                CounsellorID={localStorage.userID}
                                                                RequestID={details.id}
                                                                UserID={details.ct_user_id}
                                                            />
                                                        </Modal.Content>
                                                        <Modal.Actions>
                                                            <Button color='black' onClick={() => this.setState({ openModel: false })}>
                                                                Close
                                                                </Button>
                                                        </Modal.Actions>
                                                    </Modal>
                                                </Table.Cell>
                                            </Table.Row>))
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
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default ViewRequest;