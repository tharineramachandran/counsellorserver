import React, { useState, useContext, useEffect,useRef } from 'react';
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
    Form, Card,
    Header,
    Icon,
    Input, Dropdown, Grid, Modal,
    Message,Menu,
    Segment,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";
import ViewRequest from './layout/ViewCounsellorRequest'
import ViewProfile from './layout/ViewCounsellorProfile'

import ViewMessages from './layout/ViewMessages'
import ViewAccepted from './layout/ViewCounsellorAccepted'
import ViewDeclined from './layout/ViewCounsellorDeclined'

import ViewCounsellorChangeRequest from './layout/ViewCounsellorChangeRequest'

import Search from './layout/Search'
import RegistrationMultiStepForm from '../RegistrationComponents/_RegistrationMultiStepForm';


import { baseURLAPI, baseURL } from "../../../Global";
const axios = require('axios');
toast.configure();

const CounsellorDashboard = (props) => {
const [OpenMessageSelected, setOpenMessageSelected] = useState(false);

    const [totalmessages, settotalmessages] = useState(0);
    const [newNoti, setnewNoti] = useState(false);
    const contextRef = useRef();
    const setAuth = useContext(Authorize);
    const [userDetails, setUserDetails] = useState({ name: '', email: '', isCounsellor: '', isDetailsProvided: true });
    const [isProfileSelected, setIsProfileSelected] = useState(false);
    const [isRequestSelected, setisRequestSelected] = useState(false);
    const [isViewDeclineSelected, setViewDeclineSelected] = useState(false);
    const [isViewChangeSelected, setViewChangeSelected] = useState(false);
    const [isMessagesSelected, setIsMessagesSelected] = useState(false);
    const [isViewAcceptSelected, setViewAcceptSelected] = useState(false);
    const { name, email, isCounsellor, isDetailsProvided } = userDetails;
    var user = [];
    const [open, setOpen] = useState(false)

    async function getName() {
        try {
            axios.get(baseURLAPI + '/Counsellor/GetSingleCounsellorDetails/' + localStorage.userID


                , {
                    headers: {
                        jwtToken: localStorage.jwtToken
                    }
                })
                .then(function (response) {
                    console.log(response);
                    user = response.data.counsellor;
                    var value = undefined;

                    if (user.counsellor_details.length > 0) {
                        value = true;
                    } else {
                        value = false;
                    } console.log(value);

                    setUserDetails({
                        name: response.data.counsellor.user_details[0].TX_USER_NAME,
                        email: response.data.counsellor.user_details[0].TX_USER_EMAIL,
                        isCounsellor: response.data.counsellor.user_details[0].IS_COUNSELLOR,
                        isDetailsProvided: value
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });


        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getName();
        getData();
    }, [])

    async function getData() {
        try {

            axios.get(baseURLAPI + '/messages/TotalUnread/' + localStorage.userID, {
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

                    if (parseInt(res.data) != totalmessages) {

                        settotalmessages(parseInt(res.data));
                        setnewNoti(false);
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });








        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        setInterval(() => {
            try {

                axios.get(baseURLAPI + '/messages/TotalUnread/' + localStorage.userID, {
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
                        console.log(totalmessages);
                        if (parseInt(res.data) != totalmessages) {

                            settotalmessages(parseInt(res.data));
                            setnewNoti(false);
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });








            } catch (error) {
                console.log(error.message);
            }
        }, 10000);


    });
 
    const logout = async () => {
        window.open(baseURLAPI + "/socialauth/logout", "_self");
        setAuth(false);
        localStorage.removeItem("isCounsellor");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("email");
        localStorage.removeItem("image");
        localStorage.removeItem("name");
        localStorage.removeItem("userID");
        localStorage.removeItem("isCompleted");
        localStorage.removeItem("verificationStatus");
    }

    const style = {
        borderRadius: 10,
        padding: '1em',
        width: '10rem'
    }


    var users = `This is just an amazing website. Isn't it...?? `;

    return (
        <>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Container clearing style={{ backgroundColor: 'transparent', width: "100%", padding: '30px 3rem 0px 3rem' }}>
                        <div style={{ float: 'left' }}>
                            <List horizontal >
                                <List.Item as='a' style={{ color: 'black' }}>
                                    <Label color='blue' horizontal>
                                        Hello {name}
                                    </Label>
                                </List.Item>
                            </List>
                        </div>
                        <div style={{ float: 'right' }}>

                            {/* {parseInt(localStorage.isCompleted) == 1 && <Label as='a' style={{ marginRight: '10px' }} onClick={() => {
                                setIsProfileSelected(!isProfileSelected); setisRequestSelected(false); setViewDeclineSelected(false); setIsMessagesSelected(false); setViewDeclineSelected(false); setViewAcceptSelected(false); setViewChangeSelected(false);
                            }}  >
                                View Profile
                            </Label>}
                            <Label as='a' style={{ marginRight: '10px' }} onClick={() => { setIsMessagesSelected(false); setisRequestSelected(!isRequestSelected); setViewAcceptSelected(false); setIsProfileSelected(false); setViewChangeSelected(false); setViewDeclineSelected(false) }}>
                                View Request
                            </Label>
                            <Label as='a' style={{ marginRight: '10px' }} onClick={() => { setIsMessagesSelected(false); setViewDeclineSelected(!isViewDeclineSelected); setViewAcceptSelected(false); setIsProfileSelected(false); setViewChangeSelected(false); setisRequestSelected(false) }}>
                                View Declined Request
                            </Label>
                            <Label as='a' style={{ marginRight: '10px' }} onClick={() => { setIsMessagesSelected(false); setViewAcceptSelected(!isViewAcceptSelected); setViewDeclineSelected(false); setViewChangeSelected(false); setIsProfileSelected(false); setisRequestSelected(false) }}>
                                View Accepted Request
                            </Label>
                            <Label as='a' style={{ marginRight: '10px' }} onClick={() => { setIsMessagesSelected(false); setViewChangeSelected(!isViewChangeSelected); setViewAcceptSelected(false); setViewDeclineSelected(false); setisRequestSelected(false); setIsProfileSelected(false); }}>
                                View Change Request
                            </Label>
                   */}

                            <Menu   secondary >

<Menu.Item> <p onClick={() => {   setIsMessagesSelected(false); setisRequestSelected(false); setViewChangeSelected(false); setIsProfileSelected(!isProfileSelected); setViewAcceptSelected(false); }}>
    Home </p> </Menu.Item>    

{parseInt(localStorage.isCompleted) == 1 && 
  <Menu.Item> <p onClick={() => {    setIsEditSelected(true); setIsMessagesSelected(false); setisRequestSelected(false); setViewChangeSelected(false); setIsProfileSelected(false); setViewAcceptSelected(false); }}>
    View Profile
</p>  </Menu.Item>   } 

<Menu.Item> <p onClick={() => { setIsMessagesSelected(false); setisRequestSelected(!isRequestSelected); setViewAcceptSelected(false); setIsProfileSelected(false); setViewChangeSelected(false); setViewDeclineSelected(false) }}>
                                View Request
 </p>      </Menu.Item> 

 
<Menu.Item> <p onClick={() => { setIsMessagesSelected(false); setViewDeclineSelected(!isViewDeclineSelected); setViewAcceptSelected(false); setIsProfileSelected(false); setViewChangeSelected(false); setisRequestSelected(false) }}>
                                View Declined Request
 </p>      </Menu.Item>    
<Menu.Item> <p onClick={() => {setIsMessagesSelected(false); setViewAcceptSelected(!isViewAcceptSelected); setViewDeclineSelected(false); setViewChangeSelected(false); setIsProfileSelected(false); setisRequestSelected(false) }}>
                               View Accepted Request
</p>      </Menu.Item>   

<Menu.Item> <p onClick={() => { setIsMessagesSelected(false); setViewChangeSelected(!isViewChangeSelected); setViewAcceptSelected(false); setViewDeclineSelected(false); setisRequestSelected(false); setIsProfileSelected(false); }}>
View Change Request
</p>      </Menu.Item>    




<Menu.Item>             <p onClick={() => { setOpenNotiSelected(false) ; setOpenMessageSelected(!OpenMessageSelected) }}>
    <Menu text >
        <Menu.Item >
            < p >
                <Icon name='mail' style={{ margin: '0px' }} />
                {totalmessages > 0 ? (<Label color='red' floating>
                    {totalmessages}
                </Label>) : (

                        <p></p>
                    )}
            </p>
        </Menu.Item>
    </Menu>
</p>
<strong ref={contextRef}> </strong>
<Popup
    flowing hoverable
    popper={{ id: 'popper-container' }}
    position='top right'
    open={OpenMessageSelected}
    context={contextRef}
    content={
        <Grid style={{ width: '500px', height: '400px', overflowY: 'scroll', marginBottom: "15px" }}    >
            <Grid.Column  >
                <ViewMessages />
            </Grid.Column>
        </Grid>
    }
/></Menu.Item>

    <Menu.Item>
<p onClick={() => {  setOpenNotiSelected(!OpenNotiSelected);setOpenMessageSelected(false); }}>
    <Menu text >
        <Menu.Item >
           
                <Icon name='alarm'style={{ margin: '0px' }}  />
                {totalnoti > 0 ? (<Label color='red' floating>
                    {totalnoti}
                </Label>) : (
                        <p></p>
                    )}
            
        </Menu.Item>
    </Menu>
</p>
<strong ref={contextRefNoti}> </strong>
<Popup
    flowing hoverable
    popper={{ id: 'popper-container' }}
    position='top right'
    open={OpenNotiSelected}
    context={contextRefNoti}
    content={
        <Grid style={{ width: '500px', height: '400px', overflowY: 'scroll', marginBottom: "15px" }}    >
            <Grid.Column  >
                <ViewNoti />
            </Grid.Column>
        </Grid>
    }
/></Menu.Item> 
<Menu.Item>

<p as='a' onClick={e => logout()} style={{ marginRight: '10px' }}>
    <Icon name='sign out' />
    Log out
</p>
</Menu.Item>
</Menu >    



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
            <Grid.Row><Grid.Column>
                {parseInt(localStorage.isCompleted) == 1 ? (
                    <h3> </h3>
                ) : (< div>

                    <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={
                            <   div>
                                <div class="ui message" style={{ backgroundColor: '#EA3C53', color: 'white' }}  >
                                    <div class="header">
                                        Click here to complete profile set up
</div> </div> < br /> </div>
                        }
                    >
                        <Modal.Content  >
                            <RegistrationMultiStepForm />
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>

                        </Modal.Actions>
                    </Modal>< br />   </div>
                    )}< br /> < br />  </Grid.Column >
            </Grid.Row >

            < Grid.Row >
                < Grid.Column >
                    {isProfileSelected && <ViewProfile />}
                </Grid.Column >
            </Grid.Row >
            < Grid.Row >
                < Grid.Column >
                    {isViewDeclineSelected && <ViewDeclined />}

                </Grid.Column >
            </Grid.Row >
            < Grid.Row >
                < Grid.Column >
                    {isViewAcceptSelected && <ViewAccepted />}
                </Grid.Column >
            </Grid.Row >
            < Grid.Row >
                < Grid.Column >
                    {isRequestSelected && <ViewRequest />}
                </Grid.Column >
            </Grid.Row >
            < Grid.Row >
                < Grid.Column >
                    {isViewChangeSelected && <ViewCounsellorChangeRequest />}
                </Grid.Column >
            </Grid.Row >

            {isMessagesSelected && <ViewMessages />}
        </>
    )
}

export default CounsellorDashboard;   