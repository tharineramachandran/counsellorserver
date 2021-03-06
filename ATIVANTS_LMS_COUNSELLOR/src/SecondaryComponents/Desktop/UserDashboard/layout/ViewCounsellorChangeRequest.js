import React from 'react';
import {
    Button, Form, Header, Image, Input,
    Dropdown, Grid, Modal,
    Message, Segment, Card, Img, Icon,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";
import { ToastContainer, toast } from 'react-toastify';
import UserChangeSession from './UserChangeSessionModel'
const axios = require('axios');
class ViewCounsellorChangeRequest extends React.Component {
    state = {
        requests: [],
        openModel: false,
        changeRequests: [],

    }

    componentDidMount() {
        axios.get('http://localhost:5000/session/counsellor/ChangeRequests/', {
            headers: {
                jwtToken: localStorage.jwtToken
            }
        })
            .then((res) => {

                const requests = res.data;
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

        axios.get('http://localhost:5000/session/counsellor/acceptChangeRequests/', {
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
                this.setState({ changeRequests: requests });
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

                    axios.get('http://localhost:5000/request/getCounsellorRequests', {
                        headers: {
                            jwtToken: localStorage.jwtToken
                        },
                        data: {
                            userID: localStorage.userID
                        }
                    })
                        .then((res) => {
                            console.log(res);
                            const requests = res.data;
                            console.log(requests);
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

                            this.setState({ requests });
                        })
                        .catch(function (error) {
                            console.log(error);
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
            });
    };
    render() {
        return (
            <Grid columns='equal' divided>
                <Grid.Row textAlign='center'>
                    <Grid.Column>
                        <Container>
                            <h1>Requests for change sessions</h1>
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
                                            details.request.id ? (
                                                <Table.Row>
                                                    <Table.Cell>
                                                        {details.request.id}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {details.request.TX_USER_NAME}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {details.request.TX_USER_EMAIL}
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
                                                            trigger={<Button>View Session dates requested</Button>}
                                                        >
                                                            <Modal.Header> Session Change Date</Modal.Header>
                                                            <Modal.Content  >
                                                                <p>         <strong>Counsellee Name : </strong>
                                                                    {details.request.TX_USER_NAME}
                                                                </p>
                                                                <p>         <strong>Counsellee Email : </strong>
                                                                    {details.request.TX_USER_EMAIL}
                                                                </p>
                                                                <Table basic='very' celled collapsing>
                                                                    <Table.Header>
                                                                        <Table.Row>
                                                                            <Table.HeaderCell>Session ID </Table.HeaderCell>
                                                                            <Table.HeaderCell>Session Date </Table.HeaderCell>
                                                                            <Table.HeaderCell>Session Start Time </Table.HeaderCell>
                                                                            <Table.HeaderCell>Session End Time </Table.HeaderCell>
                                                                            <Table.HeaderCell>Session Time Zone </Table.HeaderCell>
                                                                        </Table.Row>
                                                                    </Table.Header>
                                                                    <Table.Body>
                                                                        {details.changeRequests.length > 0 ? (
                                                                            details.changeRequests.map((detailsCR, index) => (
                                                                                <Table.Row>
                                                                                    <Table.Cell>
                                                                                        {detailsCR.id}
                                                                                    </Table.Cell>
                                                                                    <Table.Cell>
                                                                                        {detailsCR.ct_session_date}
                                                                                    </Table.Cell>
                                                                                    <Table.Cell>
                                                                                        {detailsCR.ct_session_start_time}
                                                                                    </Table.Cell>
                                                                                    <Table.Cell>
                                                                                        {detailsCR.ct_session_end_time}
                                                                                    </Table.Cell>
                                                                                    <Table.Cell>
                                                                                        {details.request.ct_counsellor_timezone_code}
                                                                                    </Table.Cell>

                                                                                </Table.Row>
                                                                            ))) : (

                                                                                <Table.Row>
                                                                                    <Table.Cell>
                                                                                        no session change was recorded
                                                                                        </Table.Cell>
                                                                                </Table.Row>
                                                                            )}
                                                                    </Table.Body>
                                                                </Table>
                                                            </Modal.Content>
                                                            <Modal.Actions>
                                                                <Button color='black' onClick={() => this.setState({ openModel: false })}>
                                                                    Close
                                                                </Button>
                                                            </Modal.Actions>
                                                        </Modal>
                                                    </Table.Cell>
                                                </Table.Row>) : (<Table.Row>
                                                    <Table.Cell>
                                                        No requests found for you today
                                        </Table.Cell>
                                                </Table.Row>)
                                        ))
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
                <Grid.Row textAlign='center'>
                    <Grid.Column>
                        <Container>
                            <h1>Reply for change sessions requests</h1>
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
                                    {this.state.changeRequests.length > 0 ? (
                                        this.state.changeRequests.map((details, index) => (
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
                                                    <button class="ui positive button" onClick={() => this.acceptRequest(details.id, 1)}><Icon name='check' /> Accept </button>
                                                    <button class="ui negative button" onClick={() => this.acceptRequest(details.id, 0)} ><Icon name='close' /> Decline </button>
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

export default ViewCounsellorChangeRequest;