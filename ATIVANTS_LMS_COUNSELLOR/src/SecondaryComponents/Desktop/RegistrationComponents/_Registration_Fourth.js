import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Divider, List, Dropdown, Select
} from 'semantic-ui-react';

import { useForm } from "react-hook-form";

const Registration_Fourth = ({ formData, setForm, navigation }) => {

    const { COUNSELLOR_PHOTO } = formData;

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
                            <h1>Profile Photo</h1>

                            <div>
                                <Grid  padded style={{ textAlign: 'center' }}>
                                    <Grid.Column>
                                        <Image src={COUNSELLOR_PHOTO} size="medium" alt="preview of uploaded image" />
                                    </Grid.Column>
                                </Grid>
                            </div>


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

export default Registration_Fourth;