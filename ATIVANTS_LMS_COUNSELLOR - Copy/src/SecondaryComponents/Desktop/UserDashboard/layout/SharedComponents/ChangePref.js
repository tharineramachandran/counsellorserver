
import React, { useState, useContext, useEffect } from 'react';
import {
    Button,
    Form,
    Header, Checkbox,
    Image,
    Input, Dropdown, Grid,
    Message,
    Segment, Card, Img, Icon,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";

import { baseURLAPI, baseURL } from "../../../../../Global";
import { ToastContainer, toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
const axios = require('axios');

var daysNotAvailableList = [];
class ChangePref extends React.Component {
    constructor(props) {
        super(props)

    }

    state = {
        check: [],
        formWarning: '',
        ct_session_scheduling: "",
        ct_general_reminders: "",
        ct_product_update: "",
        ct_newsletter: "",
        ct_qna: "",
        ct_sms_sessions_messages: "",
        ct_product_improvents: "",
    }

    submitRequest = () => {

        console.log(this.state);

        const headers = {
            jwtToken: localStorage.jwtToken
        }

        axios.post(baseURLAPI + `/notificationPref/updatePref/` + localStorage.userID, this.state, {
            headers: headers
        })
            .then(res => {
                console.log(res);
                console.log("res.data");
                toast.success('Preferance saved', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: '',
                });

            }).catch((error) => {
                toast.error('Unsuccessful to save preferance', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: '',
                });


            });


    };
    componentDidMount() {
        const headers = {
            jwtToken: localStorage.jwtToken
        }

        axios.get(baseURLAPI + `/notificationPref/getPref/` + localStorage.userID, {
            headers: headers
        })
            .then((res) => {
                console.log("res.sdadfsssssssssssssss"); console.log(res.data);
                var persons = res.data.user; console.log("res.sdadfsssssssssssssss"); console.log(persons);

                this.setState({
                    ct_session_scheduling: persons.ct_session_scheduling,
                    ct_general_reminders: persons.ct_general_reminders,
                    ct_product_update: persons.ct_product_update,
                    ct_newsletter: persons.ct_newsletter,
                    ct_qna: persons.ct_qna,
                    ct_sms_sessions_messages: persons.ct_sms_sessions_messages,
                    ct_product_improvents: persons.ct_product_improvents
                });
            }).catch((error) => {
                console.log("res.sdadfsssssssssssssss");
            });


    }

    render() {
        return (

            <Container>
                <Table style={{ border: "white" }}>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell  >
                                <Checkbox label='Notifications about Sessions, counsellor messages, and payments' checked={this.state.ct_general_reminders} onClick={() => { this.setState({ ct_general_reminders: !this.state.ct_general_reminders }) }} />
                                <br />
                                <Checkbox label='Alerts about new lessons and schedule changes' checked={this.state.ct_session_scheduling} onClick={() => { this.setState({ ct_session_scheduling: !this.state.ct_session_scheduling }) }} />
                                <br />
                                <Checkbox label=' Stay connected with product updates, helpful tips and special offers' checked={this.state.ct_product_update} onClick={() => { this.setState({ ct_product_update: !this.state.ct_product_update }) }} />
                                <br />
                                <Checkbox label='Occasional newsletter with the latest posts.' checked={this.state.ct_newsletter} onClick={() => { this.setState({ ct_newsletter: !this.state.ct_newsletter }) }} />
                                <br />
                                <Checkbox label='   Receive counsellor’ replies to your questions..' checked={this.state.ct_qna} onClick={() => { this.setState({ ct_qna: !this.state.ct_qna }) }} />
                                <br />
                                <Checkbox label=' SMS alerts about counsellor first responses to your requests and trial sesson reminders' checked={this.state.ct_sms_sessions_messages} onClick={() => { this.setState({ ct_sms_sessions_messages: !this.state.ct_sms_sessions_messages }) }} />
                                <br />
                                <Checkbox label='  Product improvements, research and beta testing' checked={this.state.ct_product_improvents} onClick={() => { this.setState({ ct_product_improvents: !this.state.ct_product_improvents }) }} />

                            </Table.Cell>
                        </Table.Row>
                         
                           
                    </Table.Body>
                </Table>
                <centre>   <Button className="appBanner" color='blue' onClick={this.submitRequest}>
                                 <Icon name='send' className="appBanner" /> Update preferances &nbsp;&nbsp;
                    </Button> &nbsp;&nbsp;&nbsp;
                    </centre>   
            </Container>
        )
    }
}

export default ChangePref;

