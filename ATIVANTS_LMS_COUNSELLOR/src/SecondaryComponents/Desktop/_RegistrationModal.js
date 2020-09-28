import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Checkbox, Divider, List, Label
} from 'semantic-ui-react';
import RegistrationMultiStepForm from './RegistrationComponents/_RegistrationMultiStepForm';
import { Authorize } from "../../MainComponents/DesktopComponent";
import axios from '../../Store/_AxiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import googleLogin from "google-auth-library"

const _RegistrationModal = props => {
    const [open, setOpen] = useState(true);
    const [defHeight, setHeight] = useState(window.innerWidth);
    const [ModalLogin, setModalLogin] = useState(true);
    const [ModalConsellorTypeSingup, setModalConsellorTypeSingup] = useState(false);
    const [ModalStudentSignUp, setModalStudentSignUp] = useState(false);
    const [inputs, setInputs] = useState({
        TX_USER_NAME: "",
        TX_USER_EMAIL: "",
        TX_USER_PASSWORD: "",
        // USER_CONFIRM_PASSWORD:""
    });
    const [errorLoginMessage, setErrorLoginMessage] = useState('');
    const [errorSignUpMessage, setErrorSignUpMessage] = useState('');
    const [rememberMe, setRememberMe] = useState();

    const { TX_USER_NAME, TX_USER_EMAIL, TX_USER_PASSWORD } = inputs;
    const setAuth = useContext(Authorize);

    useEffect(() => {
        if (localStorage.checkbox && localStorage.username !== "") {
            setRememberMe(localStorage.checkbox);
            setInputs({
                TX_USER_EMAIL: localStorage.username,
                TX_USER_PASSWORD: localStorage.password
            });
        }
    }, [])

    const onChangeOfForm = (e) => {
        setErrorLoginMessage('');
        setErrorSignUpMessage('');
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };

    const onSubmitStudentSignUpForm = async (e) => {
        e.preventDefault();

        try {
            const body = { TX_USER_NAME, TX_USER_EMAIL, TX_USER_PASSWORD };
            console.log(body);

            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()
            console.log("registration data", parseRes)

            if (parseRes.jwtToken) {
                localStorage.setItem("jwtToken", parseRes.jwtToken)
                setAuth(true);
                toast.success('login successfull!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: '',
                });
                // toast.success("login successfully!")
            }
            else {
                setErrorSignUpMessage(parseRes);
                setAuth(false);
            }

        } catch (error) {
            console.log(error.message);
        }
    }


    const onSubmitLoginForm = async (e) => {
        e.preventDefault();

        try {

            if (rememberMe) {
                localStorage.username = TX_USER_EMAIL;
                localStorage.password = TX_USER_PASSWORD;
                localStorage.checkbox = rememberMe;
            }
            else {
                localStorage.username = "";
                localStorage.password = "";
                localStorage.checkbox = false;
            }
            const body = { TX_USER_EMAIL, TX_USER_PASSWORD };
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()
            if (parseRes.jwtToken) {
                localStorage.setItem("jwtToken", parseRes.jwtToken)
                setAuth(true);
                toast.success('login successfull!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: '',
                });
                // toast.success("login successfully!")
            }
            else {
                setErrorLoginMessage(parseRes);
                setAuth(false);
            }


        } catch (error) {
            console.log(error.message);
        }
    }


    useEffect(() => {
        const setHeightofScreen = () => setHeight(window.innerHeight)
        window.addEventListener('resize', setHeightofScreen)

        return () => {
            window.removeEventListener('resize', setHeightofScreen)
        }
    })

    const StudentSignUp = () => {
        setModalLogin(false)
        setModalStudentSignUp(true)
    }
    const CounsellorSignUp = () => {
        setModalLogin(false)
        setModalConsellorTypeSingup(true)
    }

    const close = () => {
        setOpen(false);
        props.onCloseModal();
    }

    const _handleGoogleSignInClick = async () => {
        window.open("http://localhost:5000/socialauth/google", "_self");
    }

    console.log(rememberMe);

    return (
        <React.Fragment>
            {ModalLogin &&
                <>
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
                                    <Form size='large' >
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
                                                <Button color='red' onClick={_handleGoogleSignInClick}>
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
                                    <Form size='small' onSubmit={onSubmitLoginForm}>
                                        <Segment stacked>
                                            <Form.Group widths='equal'>
                                                <Form.Field className="CustomForm">
                                                    <Icon name="user" className="customIconsAlign" />
                                                        &nbsp;&nbsp;&nbsp;
                                                        <input
                                                        placeholder='Enter your Email Id'
                                                        type='text'
                                                        name="TX_USER_EMAIL"
                                                        onChange={e => onChangeOfForm(e)}
                                                        value={TX_USER_EMAIL}
                                                    />
                                                </Form.Field>
                                            </Form.Group>
                                            <Form.Group widths='equal'>
                                                <Form.Field className="CustomForm">
                                                    <Icon name="user" className="customIconsAlign" />
                                                        &nbsp;&nbsp;&nbsp;
                                                        <input
                                                        placeholder='Enter password'
                                                        type='password'
                                                        name="TX_USER_PASSWORD"
                                                        onChange={e => onChangeOfForm(e)}
                                                        value={TX_USER_PASSWORD}
                                                    />
                                                </Form.Field>
                                            </Form.Group>
                                            <Form.Group widths='equal'>
                                                <Form.Field className="CustomForm">
                                                    &nbsp;&nbsp;&nbsp;
                                                        <Checkbox name="rememberMe" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} label='Remember me' />
                                                </Form.Field>
                                                <Form.Field className="CustomForm">
                                                    &nbsp;&nbsp;&nbsp;
                                                    <Label as="a">Forgot password?</Label>
                                                </Form.Field>
                                            </Form.Group>
                                            {errorLoginMessage && (
                                                <Form.Group widths='equal'>
                                                    <Form.Field className="CustomForm">
                                                        <Message negative style={{ padding: '0.5rem' }}>
                                                            {errorLoginMessage}
                                                        </Message>
                                                    </Form.Field>
                                                </Form.Group>
                                            )
                                            }
                                            <Button color='teal' fluid size='large'>
                                                Login
                                </Button>
                                        </Segment>
                                    </Form>

                                    <Message>
                                        New to us? <br />
                                        <span onClick={StudentSignUp}>
                                            <a href='#'>Sign Up as a Student</a>&nbsp;&nbsp;
                                        </span > |
                                        <span onClick={CounsellorSignUp}>&nbsp;&nbsp;<a href='#'>Sign Up as a Counsellor</a></span>
                                    </Message>

                                </Grid.Column>
                            </Grid>
                        </Modal.Content>
                        <br /><br />
                    </Modal>
                </>
            }

            {ModalConsellorTypeSingup &&
                <>
                    <Modal
                        closeIcon
                        size="large"
                        centered={false}
                        open={open}
                        onClose={() => close()}
                        closeOnEscape={false}
                        closeOnDimmerClick={false}
                    >
                        <Modal.Content scrolling>
                            <Grid>
                                <Grid.Column style={{ maxWidth: '100%', backgroundColor: 'white' }}>
                                    <RegistrationMultiStepForm />
                                </Grid.Column>
                            </Grid>
                        </Modal.Content>
                    </Modal>
                </>
            }


            {ModalStudentSignUp &&
                <>
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
                                        Sign up for Students
                            </Header>
                                    <br />
                                    <Divider horizontal>Or</Divider>
                                    <Form size='small' onSubmit={onSubmitStudentSignUpForm}>
                                        <Segment stacked>
                                            <Form.Group widths='equal'>

                                                <Form.Field className="CustomForm">
                                                    <Icon name="user" className="customIconsAlign" />
                                                        &nbsp;&nbsp;&nbsp;
                                                        <input
                                                        placeholder='Enter your Name'
                                                        type='text'
                                                        name="TX_USER_NAME"
                                                        onChange={e => onChangeOfForm(e)}
                                                        value={TX_USER_NAME}
                                                    />
                                                </Form.Field>
                                            </Form.Group>
                                            <Form.Group widths='equal'>
                                                <Form.Field className="CustomForm">
                                                    <Icon name="user" className="customIconsAlign" />
                                                        &nbsp;&nbsp;&nbsp;
                                                        <input
                                                        placeholder='Enter your Email Id'
                                                        type='text'
                                                        name="TX_USER_EMAIL"
                                                        onChange={e => onChangeOfForm(e)}
                                                        value={TX_USER_EMAIL}
                                                    />
                                                </Form.Field>
                                            </Form.Group>
                                            <Form.Group widths='equal'>
                                                <Form.Field className="CustomForm">
                                                    <Icon name="user" className="customIconsAlign" />
                                                        &nbsp;&nbsp;&nbsp;
                                                        <input
                                                        placeholder='Enter password'
                                                        type='password'
                                                        name="TX_USER_PASSWORD"
                                                        onChange={e => onChangeOfForm(e)}
                                                        value={TX_USER_PASSWORD}
                                                    />
                                                </Form.Field>
                                            </Form.Group>
                                            {errorSignUpMessage && (
                                                <Form.Group widths='equal'>
                                                    <Form.Field className="CustomForm">
                                                        <Message negative style={{ padding: '0.5rem' }}>
                                                            {errorSignUpMessage}
                                                        </Message>
                                                    </Form.Field>
                                                </Form.Group>
                                            )
                                            }
                                            {/* <Form.Group widths='equal'>
                                                <Form.Field className="CustomForm">
                                                    <Icon name="user" className="customIconsAlign" />
                                                        &nbsp;&nbsp;&nbsp;
                                                        <input
                                                        placeholder='Re-enter password'
                                                        type='password'
                                                        name="USER_CONFIRM_PASSWORD"
                                                        onChange={e => onChangeOfForm(e)}
                                                        value={USER_CONFIRM_PASSWORD}
                                                    />
                                                </Form.Field>
                                            </Form.Group> */}


                                            {/* <Button onClick={() => setAuth(true)} color='teal' fluid size='large'> */}
                                            <Button color='teal' fluid size='large'>
                                                Sign up
                                            </Button>
                                        </Segment>
                                    </Form>
                                </Grid.Column>
                            </Grid>
                        </Modal.Content>
                        <br /><br />
                    </Modal>
                </>
            }


        </React.Fragment >
    )
}
export default _RegistrationModal;