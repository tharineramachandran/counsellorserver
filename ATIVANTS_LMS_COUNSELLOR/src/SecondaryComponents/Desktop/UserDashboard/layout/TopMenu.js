import React from 'react';
import ViewProfile from "./ViewProfile";
import _Promos from '../../_Promos'
import { Grid, Label, Icon, Container, List, Popup }
    from 'semantic-ui-react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect, Link
} from "react-router-dom";

const style = {
    borderRadius: 10,
    padding: '1em',
    width: '10rem'
}

var users = `This is just an amazing website. Isn't it...?? `;

const TopMenu = ({ user, mail, logoff }) => (

    <React.Fragment>
        <Grid.Row>
            <Grid.Column width={16}>
                <Container clearing style={{ backgroundColor: 'transparent', width: "100%", padding: '30px 3rem 0px 3rem' }}>
                    <div style={{ float: 'left' }}>
                        <List horizontal >
                            <List.Item as='a' style={{ color: 'black' }}>
                                <Label color='blue' horizontal>
                                    Hello {user}
                                </Label>
                            </List.Item>
                        </List>
                    </div>
                    <div style={{ float: 'right' }}>



                        <Link to="/dashboard/profile">
                            <Label as='a' style={{ marginRight: '10px' }}>
                                View Profile
                        </Label>
                            <div>
                                <Switch>
                                    <Router>
                                        <Route exact path="/dashboard/profile" render={() => <ViewProfile /> }/>
                                    </Router>
                                </Switch>
                            </div>
                        </Link>

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
                            <Label as='a' onClick={e => logoff()}>
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

    </React.Fragment >
);

export default TopMenu; 