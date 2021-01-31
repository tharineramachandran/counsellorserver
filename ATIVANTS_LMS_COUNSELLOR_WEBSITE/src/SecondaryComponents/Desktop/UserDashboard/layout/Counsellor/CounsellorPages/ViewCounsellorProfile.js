import React from 'react';
import {
    Button, Form, Header, Image, Input,
    Dropdown, Grid, Modal,
    Message, Segment, Card, Img, Icon,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";  
import _RegistrationMultiStepForm from '../../../../RegistrationComponents/Counsellor/_RegistrationMultiStepForm';
const axios = require('axios');
class ViewCounsellorProfile extends React.Component {
    state = {
        requests: [],
    }
 
    render() {
        return (
            <Grid columns='equal' divided>

                <Grid.Row textAlign='center'>
                    <Grid.Column>
                        <Container>
                            <h1>Register Profile</h1>
                            <_RegistrationMultiStepForm />
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default ViewCounsellorProfile;