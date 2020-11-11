import React from 'react';
import {    Button,    Form,    Header,    Image,    Input, 
    Dropdown, Grid,   
     Message,    Segment, Card, Img, Icon,
    Table, Label, Container, List, Popup} from "semantic-ui-react";
    
import { ToastContainer, toast } from 'react-toastify';
const axios = require('axios');
class ViewDeclined extends React.Component {
    state = {
        requests: []
    }

    componentDidMount() {
        this.setTabledata();
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
        { params: { requestID: requestID,
            response: response,
            counsellorID: localStorage.userID } })
            .then((res) => {
             
                if(res.status == 200 ){
                    toast.success('Successful', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: '',
                    });  

                    this.setTabledata();
  
                } 
            })
            .catch(function (error) {

                toast.error('Sign-In to google first', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: '',
                });  


                console.log(error);
            });
    };

    setTabledata = ( ) => {
        axios.get('http://localhost:5000/session/counsellor/declined', {
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
    };
    render() {
        return (
            <Grid columns='equal' divided>
                <Grid.Row textAlign='center'>
                    <Grid.Column>
                        <Container>
                            <h1>Declined requests for sessions</h1>
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
 
                                                    
                                                </Table.Cell>
                                                <Table.Cell> 
                                                    
                                                    <button class="ui negative button"  onClick={() => this.acceptRequest(details.id, 4)} ><Icon name='trash' /> Delete </button>
 
                                                </Table.Cell>
                                            </Table.Row>))
                                    ) :
                                        (
                                            <Table.Row>
                                                <Table.Cell>
                                                    No declined requests requests found for you  
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

export default ViewDeclined;