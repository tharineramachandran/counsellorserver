import React from 'react';
import {
    Button, Form, Header, Image, Input,
    Dropdown, Grid, Modal, Tab,
    Message, Segment, Card, Img, Icon,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";
import { ToastContainer, toast } from 'react-toastify';
import { baseURLAPI, baseURL } from "../../../../Global";
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
        totalChats: 0,
        receiverImage: '',
        panes: [],
        read: [],
        unread: [],
        date: "",
        loadingChats: "Loading chats",
        loadingMessages: "Loading Messages"
    }

    componentDidMount() {
        this.setTable();
        this.getData();
         
        this.intervalID = setInterval(this.getData, 5000);
        console.log("is here    ");
    }
    componentWillUnmount() {
        console.log("asdfasdfasdf here    ");
        clearInterval(this.intervalID) ;
    }

    getData = () => {
        axios.get(baseURLAPI + '/messages/getTotalChats/' + localStorage.userID, {
            headers: {
                jwtToken: localStorage.jwtToken
            },
            data: {
                userID: localStorage.userID
            }
        })
            .then((res) => {
 console.log("res.data");
                    console.log(res.data);
                if(parseInt(res.data) == 0 ) {

                    this.setState({ loadingChats: "No chats for you ",loadingMessages : 'No messages for you '})
                }

                if (parseInt(res.data) != this.state.totalChats) {
                    this.setTable();
                    this.setState({ totalChats: parseInt(res.data) })
                   
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    setTable = () => {
        axios.get(baseURLAPI + '/messages/getChats/' + localStorage.userID, {
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
                console.log(["--requests---", requests])

                var unread = [];
                var read = [];
                for (var i = 0; i < requests.length; i++) {
                    var item = requests[i];
                    read.push(item);
                    if (item.ct_unread_user1) {
                        if (item.ct_unread_user1 == 1) {
                            unread.push(item);

                        }
                    } else {

                        if (item.ct_unread_user2 == 1) {
                            unread.push(item);

                        }
                    }
                    var loadingChats = "No chats "
                    this.setState({ read, unread, loadingChats })
                }
                this.setState({ requests, openModel });
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(["-----", this.state.read])
        console.log(["-----", this.state.unread])
        var panes =

            [
                {
                    menuItem: 'All', render: () => <Tab.Pane>
                        {this.state.read.length > 0 ? (
                            this.state.read.map((details, index) => (
                                <Card style={{ width: '100%', padding: '2%' }} onClick={() => this.viewMessages(details.id, details.ID_USER_UUID, details.TX_USER_NAME, details.TX_USER_EMAIL, details.TX_PICTURE)} >
                                    <Card.Content style={{ float: "left", width: '80%' }}  >
                                        <Card.Description>
                                            {details.TX_USER_NAME}
                                        </Card.Description>
                                        <p><strong>Subject : </strong>{details.ct_subject} </p>
                                        <p><strong>Catagory :   </strong>{details.ct_catagory} </p>
                                    </Card.Content  >
                                </Card>
                            ))
                        ) :
                            (
                                <Card style={{ width: '100%' }} >
                                    <Card.Content>
                                        <Card.Header>
                                            {this.state.loadingChats} </Card.Header>
                                    </Card.Content>
                                </Card>
                            )
                            }
                    </Tab.Pane>
                },
                {
                    menuItem: 'Unread', render: () => <Tab.Pane>
                        {this.state.unread.length > 0 ? (
                            this.state.unread.map((details, index) => (
                                <Card style={{ width: '100%', padding: '2%' }} onClick={() => this.viewMessages(details.id, details.ID_USER_UUID, details.TX_USER_NAME, details.TX_USER_EMAIL, details.TX_PICTURE)} >
                                    <Card.Content style={{ float: "left", width: '80%' }}  >
                                        <Card.Description>
                                            {details.TX_USER_NAME}
                                        </Card.Description>
                                        <p><strong>Subject : </strong>{details.ct_subject} </p>
                                        <p><strong>Catagory :   </strong>{details.ct_catagory} </p>

                                    </Card.Content  >
                                </Card>
                            ))
                        ) :
                            (
                                <Card style={{ width: '100%' }} >
                                    <Card.Content>
                                        <Card.Header>
                                            {this.state.loadingChats}  </Card.Header>
                                    </Card.Content>
                                </Card>
                            )
                        }
                    </Tab.Pane>
                    },
            ];
        this.setState({ panes })
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
        axios.post(baseURLAPI + '/messages/createMessages', data, {
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
        axios.get(baseURLAPI + '/messages/getMessages/' + chatID, {
            headers: {
                jwtToken: localStorage.jwtToken
            },
            data: {
                userID: localStorage.userID
            }
        })
            .then((res) => {

                if (res.data.length == 0) {
                    this.setState({ messages: res.data, loadingMessages: "No messages found" })
                } else { this.setState({ messages: res.data }) }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    viewMessages = (chatID, receiverID, receiverName, receiverEmail, receiverImage) => {
        const headers = {
            jwtToken: localStorage.jwtToken
        }
        const data = {

            chatID: chatID,
            userID: localStorage.userID
        }

        axios.post(baseURLAPI + '/messages/read/' + chatID, data, {
            headers: headers
        })
            .then((res) => {
                console.log(res);
                this.getNewMessages(this.state.chatID);
            })
            .catch(function (error) {
                console.log(error);
            });


        console.log([chatID, receiverImage]);
        var viewNotiMessage = true;
        this.setState({ chatID, receiverID, receiverName, receiverEmail, viewNotiMessage, receiverImage });
        this.getNewMessages(chatID);
        this.setTable();
    };
    backToMessages = () => {

        var viewNotiMessage = false;
        this.setState({ viewNotiMessage });

    };

    renderDate = (date) => {
        var Date = date.split("T");
        var dayofdate = Date[0];
        var timeofdate = Date[1].substring(0, 5);
        return (
            <p>{dayofdate} , {timeofdate} </p>
        )
    };

    _onKeyUp = e => {
        var value = e.target.value.toLowerCase();
        this.setState({ message: value });
    };
    render() {
        return (
            <Grid style={{ height: '400px' }} columns='equal' divided>
                {this.state.viewNotiMessage ? (
                    <Grid.Row>
                        <Grid.Column    >
                            < Container > <Button onClick={this.backToMessages} icon="angle left" style={{ float: 'left' }} />
                            </Container>
                            < Container  >
                                <Table style={{ borderColor: '#FFFFFF', borderBottomColor: '#FFFFFF', borderBottom: '0px', borderTop: '0px', width: '450px', height: '200px', overflowY: 'scroll' }} collapsing>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Image src={this.state.receiverImage} size='tiny' circular />
                                                <strong> {this.state.receiverName}</strong>
                                                <p> {this.state.receiverEmail}</p>
                                            </Table.Cell>
                                        </Table.Row><Table.Row>

                                            <Table.Cell>< div>
                                                {this.state.messages.length > 0 ? (
                                                    this.state.messages.map((details, index) => (
                                                        <List>
                                                            {this.state.receiverID == parseInt(details.ct_sender) ? (
                                                                <List.Item style={{ width: '400px' }}>
                                                                    <List.Content floated='left' >
                                                                        <Image src={this.state.receiverImage} avatar />
                                                                        <Label basic size='large' color='teal' pointing='left' > {details.ct_message}</Label>
                                                                        {this.renderDate(details.ct_date)}
                                                                    </List.Content>
                                                                </List.Item>
                                                            )
                                                                : (<  List.Item style={{ width: '400px' }}   >
                                                                    <List.Content floated='right'    >
                                                                        < Label basic size='large' color='grey' pointing='right'>{details.ct_message}</Label>
                                                                        <br />
                                                                        {this.renderDate(details.ct_date)}
                                                                    </List.Content>
                                                                </List.Item>
                                                                )
                                                            }

                                                        </List>

                                                    )
                                                    )
                                                ) :
                                                    (
                                                        <div>
                                                            {this.state.loadingMessages}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            </Table.Cell>
                                        </Table.Row><Table.Row>

                                            <Table.Cell>

                                                {/* < List >
                                                    <List.Item  >
                                                        
                                                    <List.Content floated='right'>
                                                    <Button style ={{width:"100px"}} onClick={() => this.sendMessage()}>  Send </Button>
      </List.Content>
       
      <List.Content>   */}
          {/* <Input style ={{width:"300px"}} 
                                                                type="Message"
                                                                onChange={this._onKeyUp}
                                                                name="m"
                                                                id="m"
                                                                placeholder="Message"
                                                            />
                                                             */}
                                                            <Form  >
        <Form.Group>
          <Form.Input
           style ={{width:"300px"}} 
           type="Message"
           onChange={this._onKeyUp}
           name="m"
           id="m"
           placeholder="Message"
       
          />
        
          <Form.Button style ={{width:"100px"}} onClick={() => this.sendMessage()}>  Send </Form.Button>
        </Form.Group>
      </Form>           
{/*                                                             
                                                            </List.Content>
    </List.Item>

                                                </List > */}
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>

                )
                    :
                    (< Grid.Row >
                        <Grid.Column>

                            <Tab menu={{ color: "teal", attached: false, tabular: false }} panes={this.state.panes} />
                            {/* <Container style={{ padding: '5%' }}>
                                <p>Messages</p>
                                {this.state.requests.length > 0 ? (
                                    this.state.requests.map((details, index) => (
                                        <Card style={{ width: '100%', padding: '2%' }} onClick={() => this.viewMessages(details.id, details.ID_USER_UUID, details.TX_USER_NAME, details.TX_USER_EMAIL, details.TX_PICTURE)} >
                                            {details.ct_unread == '1' ? (< div>
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
                                                (< div>
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


                                    ))
                                ) :
                                    (
                                        <Card style={{ width: '100%' }} >
                                            <Card.Content>
                                                <Card.Header>
                                                    Loading..</Card.Header>
                                            </Card.Content>
                                        </Card>
                                    )
                                }
                            </Container> */}
                        </Grid.Column>
                    </Grid.Row >
                    )

                }




            </Grid>
        )
    }
}

export default ViewMessages;