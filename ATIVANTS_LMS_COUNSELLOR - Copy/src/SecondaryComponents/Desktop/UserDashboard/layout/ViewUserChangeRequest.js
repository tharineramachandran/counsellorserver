import React from 'react';
import {
    Button, Form, Header, Image, Input,
    Dropdown, Grid, Modal,
    Message, Segment, Card, Img, Icon,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";

import { ToastContainer, toast } from 'react-toastify';

import {baseURLAPI ,baseURL }from "../../../../Global";
import UserChangeSession from './UserChangeSessionModel'

const axios = require('axios');
class ViewChangeRequest extends React.Component {
    state = {
        requests: [],
        openModel: false
    }
    componentDidMount() {
        axios.get(baseURLAPI+'/session/getUserChangeRequests/' + localStorage.userID, {
            headers: {
                jwtToken: localStorage.jwtToken
            }
        })
            .then((res) => {
                console.log(res);
                const requests = res.data;
                console.log(requests);

                requests.forEach(element => {

                    var requestdatestr = element.request.ct_session_start_time.split("T");
                    var requestdatestrdate = requestdatestr[0].split("-");
                    var requestdatestr3 = requestdatestr[1].split(":");                    
                    var requestenddatestr = element.request.ct_session_end_time.split("T");

                    var requestenddatestr3 = requestenddatestr[1].split(":");
                    var requestday = (parseInt(requestdatestrdate[2])).toString();

                    element.request.ct_session_start_time = requestdatestr3[0] + ":" + requestdatestr3[1];
                    element.request.ct_session_end_time = requestenddatestr3[0] + ":" + requestenddatestr3[1];
                    element.request.ct_session_date = requestday + "/" + requestdatestrdate[1] + "/" + requestdatestrdate[0];


                    for (let x = 0; x < element.changeRequests.length; x++) {

                        var datestr = element.changeRequests[x].ct_session_start_time.split("T");
                        var datestrdate = datestr[0].split("-");
                        var datestr3 = datestr[1].split(":");
                        var enddatestr = element.changeRequests[x].ct_session_end_time.split("T");
                        var enddatestr3 = enddatestr[1].split(":");
                        var day = (parseInt(datestrdate[2])).toString();

                        element.changeRequests[x].ct_session_start_time = datestr3[0] + ":" + datestr3[1];
                        element.changeRequests[x].ct_session_end_time = enddatestr3[0] + ":" + enddatestr3[1];
                        element.changeRequests[x].ct_session_date = day + "/" + datestrdate[1] + "/" + datestrdate[0];
                    }
                });
                const openModel = false;
                this.setState({ requests, openModel });
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
                        <Container>
                            <h1>Change requests for sessions</h1>
                            <Table basic='very' celled collapsing>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Session ID </Table.HeaderCell>
                                        <Table.HeaderCell>Session Date </Table.HeaderCell>
                                        <Table.HeaderCell>Session Start Time </Table.HeaderCell>
                                        <Table.HeaderCell>Session End Time </Table.HeaderCell>
                                        <Table.HeaderCell>Session Time Zone </Table.HeaderCell>
                                        <Table.HeaderCell>Session User ID </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {this.state.requests.length > 0 ? (
                                        this.state.requests.map((details, index) => (
                                            <Table.Row>
                                                <Table.Cell>
                                                    {details.request.id}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {details.request.ct_session_date}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {details.request.ct_session_start_time}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {details.request.ct_session_end_time}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {details.request.ct_counsellor_timezone_code}
                                                </Table.Cell>
                                                <Table.Cell>

                                                    <Modal
                                                        onClose={() => this.setState({ openModel: false })}
                                                        onOpen={() => this.setState({ openModel: true })}
                                                        open={this.state.openModel}
                                                        trigger={<Button>Change session date</Button>}
                                                    >
                                                        <Modal.Header>Select Session Change Date</Modal.Header>
                                                        <Modal.Content  >
                                                            <UserChangeSession
                                                                Request={details}
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
                                            <Table.Row textAlign ="center">
                                                       No requests found for you today
                                        
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

export default ViewChangeRequest;