import React from 'react';
import {
    Button, Form, Header, Image, Input,
    Dropdown, Grid, Modal,
    Message, Segment, Card, Img, Icon,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";

import RegistrationUserMultiStepForm from '../../../../RegistrationComponents/User/_RegistrationUserMultiStepForm';
const axios = require('axios');
class ViewRegisterUserProfile extends React.Component {
  
    render() {
        return (
            <Grid columns='equal' divided>

                <Grid.Row textAlign='center'>
                    <Grid.Column>
                        <Container>
                            <h1>Register Profile</h1>
                            <RegistrationUserMultiStepForm />
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default ViewRegisterUserProfile;