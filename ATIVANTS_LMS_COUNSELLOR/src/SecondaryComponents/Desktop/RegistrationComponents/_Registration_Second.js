import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Divider, List
} from 'semantic-ui-react';


const Registration_Second = ({ formData, setForm, navigation }) => {

    const { secondName, age } = formData;

    return (
        <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='black' textAlign='center' style={{ padding: "10px" }}>
                    Registration
                </Header>
                <br />
                <Divider horizontal>Or</Divider>
                <Form size='small'>
                    <Segment stacked>

                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                            type='text'
                            name="secondName"
                            value={secondName}
                            autoComplete="off"
                            onChange={setForm}
                        />

                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                            type='text'
                            name="age"
                            value={age}
                            autoComplete="off"
                            onChange={setForm}
                        />

                        <Button
                            color='teal'
                            fluid
                            size='large'
                            onClick={() => navigation.previous()}
                        >
                            Back
                    </Button>

                        <Button
                            color='teal'
                            fluid
                            size='large'
                            onClick={() => navigation.next()}
                        >
                            Next
                    </Button>
                    </Segment>
                </Form>

            </Grid.Column>
        </Grid>
    )
}

export default Registration_Second;