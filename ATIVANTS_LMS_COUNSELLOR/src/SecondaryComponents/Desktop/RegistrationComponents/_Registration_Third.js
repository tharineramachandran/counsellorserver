import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Divider, Item, Dropdown, Select
} from 'semantic-ui-react';

import { useForm } from "react-hook-form";

const Registration_Third = ({ formData, setForm, navigation }) => {

    const { COUNSELLOR_PHOTO, COUNSELLOR_FIRST_NAME, COUNSELLOR_LAST_NAME, COUNSELLOR_HEADLINE, COUNSELLOR_ABOUT_DESCRIPTION } = formData;

    const { handleSubmit, register, errors } = useForm({

    });


    const onSubmit = (data) => {
        navigation.next()
    };

    console.log(formData)

    return (

        <Grid>
            <Grid.Column>
                <Form size='small' onSubmit={handleSubmit(onSubmit)}>
                    <center>
                        <Segment stacked style={{ width: '80%', textAlign: 'left' }}>
                            <h1>About</h1>

                            <Item.Group>
                                <Item>
                                    <Item.Image src={COUNSELLOR_PHOTO} size="small" alt="preview of uploaded image" />

                                    <Item.Content>
                                        <Item.Header as='a'>{COUNSELLOR_FIRST_NAME}&nbsp;{COUNSELLOR_LAST_NAME}</Item.Header>
                                        <Form.Field className="CustomForm">
                                            <input
                                                placeholder='Enter your details'
                                                type='text'
                                                name="COUNSELLOR_HEADLINE"
                                                onChange={setForm}
                                                value={COUNSELLOR_HEADLINE}
                                            />
                                        </Form.Field>
                                        <Item.Description>
                                            <p>About the Counsellor</p>
                                            <Form.TextArea label='About' placeholder='Tell us more about you...' 
                                            name="COUNSELLOR_ABOUT_DESCRIPTION" onChange={setForm} value={COUNSELLOR_ABOUT_DESCRIPTION}/>
                                        </Item.Description>
                                    </Item.Content>
                                </Item>

                            </Item.Group>

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
                                type="submit"
                                onClick={() => navigation.next()}
                            >
                                Next
                    </Button>

                        </Segment>
                    </center>
                </Form>

            </Grid.Column>
        </Grid >
    )

}

export default Registration_Third;