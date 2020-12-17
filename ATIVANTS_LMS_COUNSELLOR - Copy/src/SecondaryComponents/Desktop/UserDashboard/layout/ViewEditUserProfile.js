import React from 'react';
import {
    Button, Form, Header, Image, Input,
    Dropdown, Grid, Modal,
    Message, Segment, Card, Img, Icon,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";
import { ToastContainer, toast } from 'react-toastify';
import ChangeSession from "./CounsellorChangeSessionModel"
import {baseURLAPI ,baseURL }from "../../../../Global";

import RegistrationUserMultiStepForm from '../../RegistrationComponents/UserEdit/_RegistrationUserMultiStepForm';
const axios = require('axios');
class ViewEditUserProfile extends React.Component {
    state = {
        requests: [],
    }

    componentDidMount() {
       this.setTable();
    }

    setTable = ( ) => {
        if (Number.isInteger(parseInt(localStorage.userID) )){  
        axios.get(baseURLAPI+'/request/getCounsellorRequests/'+localStorage.userID, {
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
                this.setState({ requests  });
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

    render() {
        return (
            <Grid columns='equal' divided>
                <Grid.Row textAlign='center'>
                    <Grid.Column>
                        <Container>
                            <h1>Edit Profile</h1>
                            <RegistrationUserMultiStepForm />
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default ViewEditUserProfile;