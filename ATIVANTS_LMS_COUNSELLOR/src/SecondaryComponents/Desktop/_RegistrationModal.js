import React, { useState, useEffect } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Divider, List
} from 'semantic-ui-react';
import RegistrationMultiStepForm from './RegistrationComponents/_RegistrationMultiStepForm'


const _RegistrationModal = props => {
    const [open, setOpen] = useState(true);
    const [defHeight, setHeight] = useState(window.innerWidth);

    const [ModalTypeLogin, setModalTypeLogin] = useState(true);


    useEffect(() => {
        const setHeightofScreen = () => setHeight(window.innerHeight)
        window.addEventListener('resize', setHeightofScreen)

        return () => {
            window.removeEventListener('resize', setHeightofScreen)
        }
    })

    const close = () => {
        setOpen(false);
        props.onCloseModal();
    }

    return (
        <React.Fragment>
            {ModalTypeLogin ?
                <Modal
                    closeIcon
                    size={'small'}
                    closeOnEscape={false}
                    closeOnDimmerClick={false}
                    dimmer="blurring"
                    open={open}
                    onClose={() => close()}>

                    <Modal.Content>
                        <Grid textAlign='center' verticalAlign='middle'>
                            <Grid.Column style={{ maxWidth: 450 }}>
                                <Header as='h2' color='black' textAlign='center' style={{ padding: "10px" }}>
                                    Log-in
                            </Header>
                                <Form size='large'>
                                    <List divided relaxed>
                                        <List.Item>
                                            <Button color='SingPass'>
                                                <Icon name='SingPass' /> Log In with SingPass
                                    </Button> &nbsp;&nbsp;&nbsp;

                                        <Button color='facebook'>
                                                <Icon name='facebook' /> Log In with Facebook
                                    </Button>
                                        </List.Item>
                                        <List.Item>
                                            <Button color='red'>
                                                <Icon name='google' /> Log In with Google &nbsp;&nbsp;
                                    </Button> &nbsp;&nbsp;&nbsp;
                                    <Button color='linkedin'>
                                                <Icon name='linkedin' /> Log In with LinkedIn &nbsp;&nbsp;
                                    </Button>
                                        </List.Item>
                                    </List>
                                </Form>
                                <br />
                                <Divider horizontal>Or</Divider>
                                <Form size='small'>
                                    <Segment stacked>
                                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                                        <Form.Input
                                            fluid
                                            icon='lock'
                                            iconPosition='left'
                                            placeholder='Password'
                                            type='password'
                                        />
                                        <Button color='teal' fluid size='large'>
                                            Login
                                </Button>
                                    </Segment>
                                </Form>

                                <Message>
                                    New to us? <br />
                                    <span onClick={() => setModalTypeLogin(false)}><a href='#'>Sign Up as a Student</a>&nbsp;&nbsp; | &nbsp;&nbsp;<a href='#'>Sign Up as a Counsellor</a></span>
                                </Message>

                            </Grid.Column>
                        </Grid>
                    </Modal.Content>
                    <br /><br />
                </Modal> :

                <Modal
                    closeIcon
                    size={'small'}
                    closeOnEscape={false}
                    closeOnDimmerClick={false}
                    dimmer="blurring"
                    open={open}
                    onClose={() => close()}>

                    <Modal.Content>
                        <RegistrationMultiStepForm />
                    </Modal.Content>
                </Modal>

            }

        </React.Fragment >
    )
}
export default _RegistrationModal;