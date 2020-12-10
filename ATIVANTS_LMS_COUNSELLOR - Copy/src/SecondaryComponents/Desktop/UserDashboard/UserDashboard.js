import React, { useState, useContext, useEffect } from 'react';
import { Authorize } from "../../../MainComponents/DesktopComponent";
import { toast } from "react-toastify";
import TopMenu from './layout/TopMenu';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect, Link
} from "react-router-dom";

import {
    Button,
    Form, Modal,
    Header,
    Icon,
    Input, Dropdown, Grid,
    Message,
    Segment,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";

import ViewProfile from './layout/ViewCounsellorProfile'
import Search from './layout/Search'
import DisplayProfiles from './layout/ViewUserDisplayProfiles'
import ViewMessages from './layout/ViewMessages'
import ViewChangeRequest from './layout/ViewUserChangeRequest'
import ViewAccepted from './layout/ViewUserAccepted';
import ViewRequest from './layout/ViewUserRequest';

import ViewUserRating from './layout/ViewUserRating';
import EditUserProfile from './layout/ViewEditUserProfile';

import { baseURLAPI, baseURL } from "../../../Global";


import RegistrationUserMultiStepForm from '../RegistrationComponents/User/_RegistrationUserMultiStepForm';
const axios = require('axios');
toast.configure();

const UserDashboard = (props) => {

    const setAuth = useContext(Authorize);

    const [userDetails, setUserDetails] = useState({ name: '', email: '', isCounsellor: '', image: '', isCompleted: '' });
    const [isProfileSelected, setIsProfileSelected] = useState(false);
    const [isRequestAcceptSelected, setIsRequestAcceptSelected] = useState(false);
    const [isRequestChangeSelected, setIsRequestChangeSelected] = useState(false);
    const [open, setOpen] = useState(false);
    const [isMessagesSelected, setIsMessagesSelected] = useState(false);
    const [isRequestSelected, setIsRequestSelected] = useState(false);
    const [isRatingSelected, setIsRatingSelected] = useState(false);

     

    const [isEditSelected, setIsEditSelected] = useState(false);
    const [isUserCompleteSelected, setUserCompletedSelected] = useState(false);
    const { name, email, isCounsellor, image, isCompleted } = userDetails;
    var user = [];
    async function getName() {
        try {
            setUserDetails({
                name: localStorage.name,
                email: localStorage.email,
                image: localStorage.image,
                isCounsellor: localStorage.isCounsellor,
                isCompleted: localStorage.isCompleted
            });

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getName();
    }, [])

    const logout = async () => {

        window.open(baseURLAPI + "/socialauth/logout", "_self");
        localStorage.removeItem("userID");
        localStorage.removeItem("isCounsellor");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("email");
        localStorage.removeItem("image");
        localStorage.removeItem("name");
        localStorage.removeItem("isCompleted");
        localStorage.removeItem("verificationStatus");

        setAuth(false);
    }

    var users = `This is just an amazing website. Isn't it...?? `;
    return (
        <>
            <Grid.Row>
                <Grid.Column width={20}>
                    <Container clearing style={{ backgroundColor: 'transparent', width: "100%", padding: '30px 3rem 0px 3rem' }}>
                        <div style={{ float: 'left' }}>
                            <List horizontal >
                                <List.Item as='a' style={{ color: 'black' }}>
                                    <Label color='blue' horizontal>
                                        Hello  {localStorage.name}
                                    </Label>
                                </List.Item>
                            </List>
                        </div>


                        <div style={{ float: 'right' }}>


                            <Label as='a' style={{ marginRight: '10px' }} onClick={() => {setIsRatingSelected(false) ; setIsMessagesSelected(false); setIsRequestSelected(false); setIsRequestChangeSelected(false); setIsProfileSelected(!isProfileSelected); setIsRequestAcceptSelected(false); }}>
                                Home
                            </Label>

                            {parseInt(localStorage.isCompleted) == 1 && <Label as='a' style={{ marginRight: '10px' }} onClick={() => {setIsRatingSelected(false) ; setIsEditSelected(true); setIsMessagesSelected(false); setIsRequestSelected(false); setIsRequestChangeSelected(false); setIsProfileSelected(false); setIsRequestAcceptSelected(false); }}>
                                View Profile
      </Label>}

                            <Label as='a' style={{ marginRight: '10px' }} onClick={() => { setIsRatingSelected(false) ;setIsMessagesSelected(false); setIsRequestSelected(false); setIsRequestChangeSelected(!isRequestAcceptSelected); setIsProfileSelected(false); setIsRequestAcceptSelected(false); }}>
                                View Change Request
                            </Label>

                            <Label as='a' style={{ marginRight: '10px' }} onClick={() => { setIsMessagesSelected(false); setIsRequestSelected(false); setIsRequestChangeSelected(false); setIsRatingSelected(!isRequestAcceptSelected); setIsProfileSelected(false); setIsRequestAcceptSelected(false); }}>
                                View Rating
                            </Label>
                             
                            <Label as='a' style={{ marginRight: '10px' }} onClick={() => { setIsMessagesSelected(false); setIsRequestSelected(!isRequestAcceptSelected);setIsRatingSelected(false) ; setIsRequestChangeSelected(false); setIsProfileSelected(false); setIsRequestAcceptSelected(false); }}>
                                View Requests
                            </Label>
                            <Popup
                                trigger={<Label as='a' circular style={{ marginRight: '10px' }}>
                                    <Icon name='mail' style={{ margin: '0px' }} />
                                </Label>}
                                size='mini'
                                position='top right'
                                on='click'
                                flowing hoverable
                            // popper={{ id: 'popper-container' }}
                            // trigger={<Button>View Message</Button>}
                            >                                        <Popup.Content  >
                                    <Grid style={{ width: '500px', height: '400px', overflowY: 'scroll', marginBottom: "15px" }}    >
                                        <Grid.Column  >
                                            <ViewMessages />
                                        </Grid.Column>
                                    </Grid>
                                </Popup.Content>
                            </Popup>
                            <Label as='a' circular style={{ marginRight: '10px' }}>
                                <Icon name='alarm' style={{ margin: '0px' }} />
                            </Label>
                            <Label as='a' circular style={{ marginRight: '10px' }}>
                                <Icon name='like' style={{ margin: '0px' }} />
                            </Label>


                            <Label as='a' onClick={e => logout()} style={{ marginRight: '10px' }}>
                                <Icon name='sign out' />
                                Log out
                            </Label>

                        </div>
                    </Container>
                    <Container clearing style={{
                        backgroundColor: 'transparent',
                        width: "100%",
                        marginTop: '5rem',
                        padding: '0rem 7rem 0rem 3rem'
                    }}>
                    </Container>
                </Grid.Column >
            </Grid.Row >



            {parseInt(localStorage.verificationStatus) == 1 ? (
                <div>
                </div>

            ) : (<   div style={{ paddingBottom: "1%" }} >
                <div class="ui message" style={{ backgroundColor: 'teal', color: 'white' }}  >
                    <div class="header">
                        Please check your mailbox for {localStorage.email} for email verification link
</div> </div> </div>)
            }


            {parseInt(localStorage.isCompleted) == 1 ? (
                <div>
                </div>

            ) : (<div>
                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={
                        <   div>
                            <div class="ui message" style={{ backgroundColor: '#EA3C53', color: 'white' }}  >
                                <div class="header">
                                    Click here to complete profile set up
</div> </div><br /></div>
                    }
                >
                    <Modal.Content  >
                        <RegistrationUserMultiStepForm />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                    </Modal.Actions>
                </Modal>
            </div>)
            }

            {isRequestChangeSelected && <ViewChangeRequest />}
            {isRequestAcceptSelected && <ViewAccepted />}
            {/* {isMessagesSelected && <ViewMessages />} */}
            {isRequestSelected && <ViewRequest />}
            {isRatingSelected && <ViewUserRating />}
             
            {/* {isProfileSelected && <ViewProfile />}  */}
            {/* {!isProfileSelected && <Search />} */}
            {/* {!isProfileSelected && <DisplayProfiles />} */}
            {isProfileSelected && <Search />}
            {isEditSelected && <EditUserProfile />}

        </>
    )
}

export default UserDashboard;   