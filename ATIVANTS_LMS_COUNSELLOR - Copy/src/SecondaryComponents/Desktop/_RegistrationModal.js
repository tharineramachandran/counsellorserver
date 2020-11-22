import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,Container,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Checkbox, Divider, List, Label
} from 'semantic-ui-react';
import Counsellor_Registration from './_Counsellor_Registration';


import ReCAPTCHA from "react-google-recaptcha";
import keys from "../../env";

import ChangePassword from "./UserDashboard/layout/ChangePasswordModel"
import { Authorize } from "../../MainComponents/DesktopComponent";
import axios from '../../Store/_AxiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import googleLogin from "google-auth-library"

import { baseURLAPI, baseURL } from "../../Global";



const _RegistrationModal = props => {
     
    const [ TermsOpen, setTermsOpen] = useState(false);
    const [open, setOpen] = useState(true);
    const [defHeight, setHeight] = useState(window.innerWidth);
    const [ModalLogin, setModalLogin] = useState(true);
    const [ModalConsellorTypeSingup, setModalConsellorTypeSingup] = useState(false);
    const [openPassword, setPasswordOpen] = useState(false)
    const [ModalStudentSignUp, setModalStudentSignUp] = useState(false);
    const [ModalPassword, setModalPassword] = useState(false);

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
        if (  recapcha.value) {
        try {
            const body = { TX_USER_NAME, TX_USER_EMAIL, TX_USER_PASSWORD };
            console.log(body);

            const response = await fetch(baseURLAPI + "/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseResponse = await response.json()
            console.log("registration data", parseResponse)

            if (parseResponse.jwtToken) {
                await localStorage.setItem("jwtToken", parseResponse.jwtToken)
                await localStorage.setItem("email", parseResponse.user.TX_USER_EMAIL);
                await localStorage.setItem("isCounsellor", parseResponse.user.IS_COUNSELLOR);
                await localStorage.setItem("image", parseResponse.user.TX_PICTURE);
                await localStorage.setItem("userID", parseResponse.user.ID_USER_UUID);
                await localStorage.setItem("name", parseResponse.user.TX_USER_NAME);
                await localStorage.setItem("isCompleted", parseResponse.user.TX_IS_COMPLETED);


                setAuth(true);
                toast.success('login successful!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: '',
                });
            }
            else {
                setErrorSignUpMessage(parseResponse);
                setAuth(false);
            }

        } catch (error) {
            console.log(error.message);
        }
    }
        else {
            setErrorSignUpMessage("Check Recapcha before submit");
            setAuth(false);
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
            const response = await fetch(baseURLAPI + "/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()
            console.log(["--------------------------------ss",parseRes]);
            if (parseRes.jwtToken) {
                

                   localStorage.setItem("jwtToken", parseRes.jwtToken)
                  localStorage.setItem("email", parseRes.user.TX_USER_EMAIL);
                  localStorage.setItem("isCounsellor", parseRes.user.IS_COUNSELLOR);
                  localStorage.setItem("image", parseRes.user.TX_PICTURE);
                  localStorage.setItem("userID", parseRes.user.ID_USER_UUID);
                  localStorage.setItem("name", parseRes.user.TX_USER_NAME);
                  localStorage.setItem("isCompleted", parseRes.user.TX_IS_COMPLETED);

                setAuth(true);
                toast.success('login successfull!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
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
    const [recapcha, setrecapcha] = useState([]);

    

  const  handleChange = async (value) =>    {
        console.log("Captcha value:", value);
        setrecapcha({ value });
        // if value is null recaptcha expired
        if (value === null) this.setState({ expired: "true" });
      };
    
    const  asyncScriptOnLoad = async () => {
        setrecapcha({ callback: "called!" });
        console.log("scriptLoad - reCaptcha Ref-" );
      };
     
    const StudentSignUp = () => {
        setModalLogin(false)
        setModalStudentSignUp(true)
    }
    const CounsellorSignUp = () => {
        setModalLogin(false)
        setModalConsellorTypeSingup(true)
    }
    const PasswordSignUp = () => {
        setModalLogin(false)
        setModalConsellorTypeSingup(false)
        setModalPassword(true)
    }
    const close = () => {
        setOpen(false);
        props.onCloseModal();
    }

    const _handleGoogleSignInClick = async () => {
        console.log(baseURLAPI);
        localStorage.setItem("isCounsellor", 0);
        window.open(baseURLAPI + "/socialauth/google/0", "_self");
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
                                        <br />
                                        <span onClick={PasswordSignUp}>&nbsp;&nbsp;<a href='#'>Forgot Password</a></span>


                                        {/* <Modal
      onClose={() => setPasswordOpen(false)}
      onOpen={() => setPasswordOpen(true)} 
      open={openPassword}
      trigger={      <span  >&nbsp;&nbsp;<a href='#' >Change Password </a></span>                     }
    >
      <Modal.Header>Change Password</Modal.Header>
      <Modal.Content  >
      <ChangePassword 
           
         /> 
         
      </Modal.Content> 
    </Modal> */}
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
                                    <Counsellor_Registration />
                                </Grid.Column>
                            </Grid>
                        </Modal.Content>
                    </Modal>
                </>
            }
            {ModalPassword &&
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
                                    <ChangePassword />
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
                                    <br />    <Form size='large' >
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

                                                    
                                                </Form.Field></Form.Group>
                                                <Form.Group widths='equal'> 
                                                <Form.Field>
                                                <ReCAPTCHA
                            sitekey={keys.google.googleRecapcha }

                            style={{ display: "inline-block" }}
                            theme="light"
                          
                            onChange={handleChange}
                            asyncScriptOnLoad={asyncScriptOnLoad}
                        /></Form.Field></Form.Group>  <Form.Group widths='equal'> 
                         <Form.Field> 

                         
                                              
                         <Modal
                                                    open={TermsOpen}
                                                    onClose= {() => setTermsOpen(false)}
                                                    onOpen={() => setTermsOpen(true)}
                                                    trigger={


                                                        <p>
                                                          By clicking Sign-up, you agree to the counselling gorilla's terms of service  and privacy policy 
    </p>}
                                                >
                                                    <Modal.Header>Terms and Conditions</Modal.Header>
                                                    <Modal.Content image scrolling>

                                                        <Modal.Description>
                                                            <Container width='20%' text>

                                                                <p>

                                                                    Welcome to Counselling LMS!
 <br /> <br />
These terms and conditions outline the rules and regulations for the use of Counselling LMS's Website, located at CounsellingLMS.com.

By accessing this website we assume you accept these terms and conditions. Do not continue to use Counselling LMS if you do not agree to take all of the terms and conditions stated on this page.

The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
<br />
Cookies <br />  </p>

                                                            </Container>

                                                        </Modal.Description>
                                                    </Modal.Content>
                                                    <Modal.Actions>
                                                        <Button onClick={() => setTermsOpen(false)}  >
                                                            Close
        </Button>
                                                    </Modal.Actions>
                                                </Modal>

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