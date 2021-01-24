import React from 'react';
import {
    Button, Form, Header, Image, Input,
    Dropdown, Grid, Modal,
    Message, Segment, Card, Img, Icon,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";
import { ToastContainer, toast } from 'react-toastify'; 
import {baseURLAPI ,baseURL }from "../../../../../../Global";

import RegistrationMultiStepForm from '../../../../RegistrationComponents/CounsellorEdit/EditMultiStepForm';
const axios = require('axios');
class ViewCounsellorEdit extends React.Component {
    state = {
        requests: [],
         
        
    }
 
    render() {
        return (
            <Grid columns='equal' divided>

                <Grid.Row textAlign='center'>
                    <Grid.Column>
                        <Container>
                            <h1>Edit Profile</h1>
                            <RegistrationMultiStepForm />
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default ViewCounsellorEdit;