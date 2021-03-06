import React from 'react';
import {
    Button, Form, Header, Image, Input,
    Dropdown, Grid, Modal,
    Message, Segment, Card, Img, Icon,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";
import { ToastContainer, toast } from 'react-toastify';
const axios = require('axios');


class ViewMessages extends React.Component {
    state = {
        requests: [],
        openModel: false,
        messages: "",
        chatID: "",
        receiverID: 0,
        message: "",
        receiverName: '',
        receiverEmail: '',
        viewNotiMessage: false,
        totalChats : 0
    }

    componentDidMount() {
        this.setTable();
        this.getData();
        setInterval(this.getData, 5000);  
    }
    getData = () => {
        axios.get('http://localhost:5000/messages/getTotalChats/' + localStorage.userID, {
            headers: {
                jwtToken: localStorage.jwtToken
            },
            data: {
                userID: localStorage.userID
            }
        })
            .then((res) => {
            
                if (parseInt(res.data)  != this.state.totalChats) {
                    this.setTable();
                    this.setState({totalChats :parseInt(res.data)   })

                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    setTable = () => {
        axios.get('http://localhost:5000/messages/getChats/' + localStorage.userID, {
            headers: {
                jwtToken: localStorage.jwtToken
            },
            data: {
                userID: localStorage.userID
            }
        })
            .then((res) => {
                const requests = res.data;
                const openModel = false;
                this.setState({ requests, openModel });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    sendMessage = () => {
        console.log(this.state.message);

        const headers = {
            jwtToken: localStorage.jwtToken
        }
        const data = {
            message: this.state.message,
            receiverID: this.state.receiverID,
            chatID: this.state.chatID,
            userID: localStorage.userID
        }
        axios.post('http://localhost:5000/messages/createMessages', data, {
            headers: headers
        })
            .then((res) => {
                console.log(res);
                this.getNewMessages(this.state.chatID);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getNewMessages = (chatID) => {
        axios.get('http://localhost:5000/messages/getMessages/' + chatID, {
            headers: {
                jwtToken: localStorage.jwtToken
            },
            data: {
                userID: localStorage.userID
            }
        })
            .then((res) => {
                this.setState({ messages: res.data })
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    viewMessages = (chatID, receiverID, receiverName, receiverEmail) => {
        const headers = {
            jwtToken: localStorage.jwtToken
        }
        const data = {
            
            chatID: chatID
          
        }

        axios.post('http://localhost:5000/messages/read/'+chatID, data, {
            headers: headers
        })
            .then((res) => {
                console.log(res);
                this.getNewMessages(this.state.chatID);
            })
            .catch(function (error) {
                console.log(error);
            });



        console.log([chatID, receiverID]);
        var viewNotiMessage = true;
        
        this.setState({ chatID, receiverID, receiverName, receiverEmail, viewNotiMessage });
        this.getNewMessages(chatID);
        this.setTable ();
    };
    backToMessages = () => {

        var viewNotiMessage = false;
        this.setState({ viewNotiMessage });

    };

    _onKeyUp = e => {
        var value = e.target.value.toLowerCase();
        this.setState({ message: value });
    };
    render() {
        return (
            <Grid columns='equal' divided>



                {this.state.viewNotiMessage ? (

                    <Grid.Row>
                        <Grid.Column >
                            < Container style={{ padding: "5px" }}> <Button onClick={this.backToMessages} style={{ float: 'left' }}   >    <Icon color='black' name='angle left' /> Back to inbox</Button>
                                <br />
                                <br />
                            </Container>
                            < Container  >
                                <Table basic='very' celled collapsing>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>
                                                <strong> {this.state.receiverName}</strong>
                                                <p> {this.state.receiverEmail}</p>
                                            </Table.Cell>
                                        </Table.Row>
                                        {this.state.messages.length > 0 ? (
                                            this.state.messages.map((details, index) => (
                                                <Table.Row>
                                                    {/* <Table.Cell>
                                                    {details.ct_sender}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {details.ct_receiver}
                                                </Table.Cell> */}
                                                    <Table.Cell>
                                                        {details.ct_message}
                                                    </Table.Cell>
                                                </Table.Row>))
                                        ) :
                                            (
                                                <Table.Row>
                                                    <Table.Cell>
                                                        No Messages found for you
                                        </Table.Cell>
                                                </Table.Row>
                                            )
                                        }
                                    </Table.Body>
                                </Table>
                                <Segment>
                                    <Input
                                        type="Message"
                                        onChange={this._onKeyUp}
                                        name="m"
                                        id="m"
                                        placeholder="Message"
                                    /> <Button onClick={() => this.sendMessage()}>  Send </Button>
                                </Segment>
                            </Container>
                        </Grid.Column>

                    </Grid.Row>

                )
                    :
                    (< Grid.Row >
                        <Grid.Column>
                            <Container style={{ padding: '5%' }}>
                                <h1>Inbox</h1>
                                {this.state.requests.length > 0 ? (
                                    this.state.requests.map((details, index) => (
                                        <Card style={{ width: '100%',padding:'2%' }} onClick={() => this.viewMessages(details.id, details.ID_USER_UUID, details.TX_USER_NAME, details.TX_USER_EMAIL)} >
                                            {details.ct_unread == '1' ? (     < div>
                                            <Icon style={{ float: "right", width: '10%' }} color='blue' name='circle' />
                                                <Card.Content style={{ float: "left", width: '80%' }}  >     
                                                
                                                    <Card.Description>
                                                    {details.TX_USER_NAME}
                                                    </Card.Description>
                                                    <p><strong>Subject : </strong>{details.ct_subject} </p>
                                                    <p><strong>Catagory :   </strong>{details.ct_catagory} </p>
                                                     
                                                </Card.Content  >
                                                </div>
                                                
                                                )
                                                :
                                                ( < div>
                                                 <Icon style={{ float: "right", width: '10%' }} color='grey' name='circle outline' />    
                                                <Card.Content style={{ float: "left", width: '80%' }}  >                                                          
                                                    <Card.Description>
                                                    {details.TX_USER_NAME}
                                                    </Card.Description>
                                                    <p><strong>Subject : </strong>{details.ct_subject} </p>
                                                    <p><strong>Catagory :   </strong>{details.ct_catagory} </p>
                                                     
                                                </Card.Content> </div>
                                                
                                                )
                                            }



                                        </Card>





                                        //                                 <Card  style={{ width: '100%' }}  onClick={() => this.viewMessages(details.id, details.ID_USER_UUID, details.TX_USER_NAME, details.TX_USER_EMAIL)} >

                                        // <Card.Content  > {details.ct_unread  == '1'? (   

                                        //                                                  <Icon    floated='right' color='blue' name='circle' /> 

                                        //                                             )
                                        //                                             :
                                        //                                             ( 
                                        //                                                  <Icon   floated='right'  color='grey' name='circle outline' /> 
                                        //                                             )
                                        // }
                                        //                                         <Card.Description>
                                        //                                             {details.TX_USER_NAME}</Card.Description>
                                        //                                             <p>
                                        //                                             {details.ct_subject } </p>
                                        //                                             </Card.Content>


                                        //                                 </Card>
                                    ))
                                ) :
                                    (
                                        <Card style={{ width: '100%' }} >
                                            <Card.Content>
                                                <Card.Header>
                                                    No Messages Yet..</Card.Header>
                                            </Card.Content>
                                        </Card>
                                    )
                                }
                            </Container>
                        </Grid.Column>
                    </Grid.Row >
                    )

                }




            </Grid>
        )
    }
}

export default ViewMessages;