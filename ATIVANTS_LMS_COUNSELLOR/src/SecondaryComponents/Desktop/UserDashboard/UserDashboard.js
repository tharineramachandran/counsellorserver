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
    Form,
    Header,
    Icon,
    Input, Dropdown, Grid,
    Message,
    Segment,
    Table, Label, Container, List, Popup
} from "semantic-ui-react";

import ViewProfile from './layout/ViewProfile'
import Search from './layout/Search'
import DisplayProfiles from './layout/DisplayProfiles'
import Test from './layout/test'


toast.configure();

const UserDashboard = (props) => {


    const setAuth = useContext(Authorize);
    const [userDetails, setUserDetails] = useState({ name: '', email: '' });
    const [isProfileSelected, setIsProfileSelected] = useState(false);
    const { name, email } = userDetails;


    async function getName() {
        try {
            // const body = { TX_USER_NAME, TX_USER_EMAIL, TX_USER_PASSWORD };
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { jwtToken: localStorage.jwtToken }
            });

            const parseRes = await response.json()
            console.log("useDetails", parseRes);

            setUserDetails({
                name: parseRes.TX_USER_NAME,
                email: parseRes.TX_USER_EMAIL
            })

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getName();
    }, [])


    const logout = async () => {
        localStorage.removeItem("jwtToken");
        setAuth(false);
        window.open("http://localhost:5000/socialauth/logout", "_self");
    }

    const style = {
        borderRadius: 10,
        padding: '1em',
        width: '10rem'
    }

    var users = `This is just an amazing website. Isn't it...?? `;

    console.log(props);

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

                            <Label as='a' style={{ marginRight: '10px' }} onClick={e => setIsProfileSelected(!isProfileSelected)}>
                                {isProfileSelected ? "Home" : "View Profile"}
                            </Label>

                            <Popup content={users}
                                trigger={
                                    <Label as='a' circular style={{ marginRight: '10px' }}>
                                        <Icon name='question' style={{ margin: '0px' }} />
                                    </Label>
                                }
                                style={style}
                            />
                            <Label as='a' circular style={{ marginRight: '10px' }}>
                                <Icon name='mail' style={{ margin: '0px' }} />
                            </Label>
                            <Label as='a' circular style={{ marginRight: '10px' }}>
                                <Icon name='alarm' style={{ margin: '0px' }} />
                            </Label>
                            <Label as='a' circular style={{ marginRight: '10px' }}>
                                <Icon name='like' style={{ margin: '0px' }} />
                            </Label>
                            <Label as='a' onClick={e => logout()}>
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

            {isProfileSelected && <ViewProfile />}
            {/* {!isProfileSelected && <Search />} */}
            {/* {!isProfileSelected && <DisplayProfiles />} */}
            {!isProfileSelected && <Test />}
        </>
    )
}

export default UserDashboard;   