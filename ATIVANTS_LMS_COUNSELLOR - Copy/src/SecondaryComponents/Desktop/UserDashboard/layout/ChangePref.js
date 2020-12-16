
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

import { baseURLAPI, baseURL } from "../../../../Global";
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
        ct_session_scheduling: false,
        ct_general_reminders: false, 
        ct_product_update : false,
        ct_newsletter : false,
        ct_qna: false,
        ct_sms_sessions_messages: false,
        ct_product_improvents: false,
    }



    submitRequest = () => {

        console.log(this.state);  
          

        
          const headers = {
            jwtToken: localStorage.jwtToken
          }
    
          axios.post( baseURLAPI + `/notificationPref/updatePref/` + localStorage.userID, this.state , {
            headers: headers
          }) 
            .then(res => {
              console.log(res);
              console.log("res.data");
              

            }).catch((error) => {
                console.log("res.sdadfsssssssssssssss");
            });

      
    };



    render() {
        return (

            <Container> <Segment>

                <Form>
                    < Form.Group widths='equal' >
                        < Form.Field>
                            <Checkbox label='Notifications about Sessions, counsellor messages, and payments' value={this.state.ct_general_reminders} onClick={() => { this.setState({ ct_general_reminders: !this.state.ct_general_reminders }) }} />
                        </Form.Field>
                    </Form.Group>
                    < Form.Group widths='equal' >
                        < Form.Field>
                            <Checkbox label='Alerts about new lessons and schedule changes' value={this.state.ct_session_scheduling} onClick={() => { this.setState({ ct_session_scheduling: !this.state.ct_session_scheduling }) }} />
                        </Form.Field>
                    </Form.Group>

                    < Form.Group widths='equal' >
                        < Form.Field>
                            <Checkbox label=' Stay connected with product updates, helpful tips and special offers' value={this.state.ct_product_update} onClick={() => { this.setState({ ct_product_update: !this.state.ct_product_update }) }} />
                        </Form.Field>
                    </Form.Group>
                    < Form.Group widths='equal' >
                        < Form.Field>
                            <Checkbox label='Occasional newsletter with the latest posts.' value={this.state.ct_newsletter} onClick={() => { this.setState({ ct_newsletter: !this.state.ct_newsletter }) }} />
                        </Form.Field>
                    </Form.Group>
                    < Form.Group widths='equal' >
                        < Form.Field>
                            <Checkbox label='   Receive counsellor’ replies to your questions..' value={this.state.ct_qna} onClick={() => { this.setState({ ct_qna: !this.state.ct_qna }) }} />
                        </Form.Field>
                    </Form.Group>

                    < Form.Group widths='equal' >
                        < Form.Field>
                            <Checkbox label=' SMS alerts about counsellor first responses to your requests and trial sesson reminders' value={this.state.ct_sms_sessions_messages} onClick={() => { this.setState({ ct_sms_sessions_messages: !this.state.ct_sms_sessions_messages }) }} />
                        </Form.Field>
                    </Form.Group>
                    < Form.Group widths='equal' >
                        < Form.Field>
                            <Checkbox label='  Product improvements, research and beta testing' value={this.state.ct_product_improvents} onClick={() => { this.setState({ ct_product_improvents: !this.state.ct_product_improvents }) }} />
                        </Form.Field>
                    </Form.Group>




                    <Button className="appBanner" color='blue' onClick={this.submitRequest}>
                        <Icon name='send' className="appBanner" /> Update preferances &nbsp;&nbsp;
                    </Button> &nbsp;&nbsp;&nbsp;
  </Form>


            </Segment>
            </Container>


        )
    }
}

export default ChangePref;

