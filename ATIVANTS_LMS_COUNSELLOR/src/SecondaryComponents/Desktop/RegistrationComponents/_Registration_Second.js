import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Divider, List
} from 'semantic-ui-react';
import { useForm } from "react-hook-form";


const Registration_Second = ({ formData, setForm, navigation }) => {

    const { secondName, age } = formData;
    console.log(formData);

    const { handleSubmit, register, errors } = useForm({

    });

    const onSubmit = (data) => {
        navigation.next()
    };

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
                                name="secondName"
                                onChange={setForm}
                                value={secondName}
                                ref={register({ validate: secondName => secondName && secondName.length > 3 })}
                            />
                        </Form.Field>
                        
                        {errors.secondName && <p>secondName invalid</p>}


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