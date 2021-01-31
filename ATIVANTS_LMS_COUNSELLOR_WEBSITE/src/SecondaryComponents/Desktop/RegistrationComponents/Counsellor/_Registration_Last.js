import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Divider, List
} from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import axios from 'axios';


import {baseURLAPI ,baseURL }from "../../../../Global"; 
const Registration_Second = ({ formData, setForm, navigation }) => {

    const { COUNSELLOR_NAME, COUNSELLOR_AGE } = formData;
    
    console.log(formData);

    const { handleSubmit, register, errors } = useForm({

    });

    const onSubmit = data => {
        const jsonData = { COUNSELLOR_NAME, COUNSELLOR_AGE };
        axios.post( baseURLAPI+'/Counsellor', JSON.stringify(jsonData), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(json => {
                console.log(json);
                navigation.next();
            })

            .catch(err => {
                console.log(err.Message);
            })
    }



    return (
        <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='black' textAlign='center' style={{ padding: "10px" }}>
                    Registration
                </Header>
                <br />
                <Divider horizontal>Or</Divider>
                <Form size='small' onSubmit={handleSubmit(onSubmit)}>
                    <Segment stacked>

                        <Form.Field>
                            <label>User Input</label>
                            <input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='Enter your details'
                                type='text'
                                name="COUNSELLOR_AGE"
                                onChange={setForm}
                                value={COUNSELLOR_AGE}
                                ref={register({ validate: COUNSELLOR_AGE => COUNSELLOR_AGE && COUNSELLOR_AGE.length != null })}
                            />
                        </Form.Field>

                        {errors.COUNSELLOR_AGE && <p>COUNSELLOR_AGE invalid</p>}


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