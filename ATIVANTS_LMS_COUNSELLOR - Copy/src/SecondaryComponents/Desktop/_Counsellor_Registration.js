import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Checkbox, Divider, List, Label
} from 'semantic-ui-react';
import { Authorize } from "../../MainComponents/DesktopComponent";
import axios from '../../Store/_AxiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import googleLogin from "google-auth-library"
import { baseURLAPI, baseURL } from "../../Global";
import keys from "../../env";
import ReCAPTCHA from "react-google-recaptcha";
const Counsellor_Registration = props => {
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
    const [recapcha, setrecapcha] = useState([]);
    const { TX_USER_NAME, TX_USER_EMAIL, TX_USER_PASSWORD } = inputs;
    const setAuth = useContext(Authorize);
    const setCount = useContext(Authorize);
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
        if (TX_USER_EMAIL && TX_USER_PASSWORD) {  
        if (recapcha.value) {
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
        
            const body = { TX_USER_NAME, TX_USER_EMAIL, TX_USER_PASSWORD };
            console.log(body);

            const response = await fetch(baseURLAPI + "/auth/counsellor/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });



            const parseRes = await response.json();




            console.log("registration data", parseRes);

            if (parseRes.jwtToken) {
                await localStorage.setItem("jwtToken", parseRes.jwtToken); 

                await     localStorage.setItem("email", parseRes.user.TX_USER_EMAIL);
                await   localStorage.setItem("isCounsellor", parseRes.user.IS_COUNSELLOR);
                    await    localStorage.setItem("image", parseRes.user.TX_PICTURE);
                    await   localStorage.setItem("userID", parseRes.user.ID_USER_UUID);
                    await   localStorage.setItem("name", parseRes.user.TX_USER_NAME);
                    await   localStorage.setItem("isCompleted", parseRes.user.TX_IS_COMPLETED);
                 
                    await  localStorage.setItem("verificationStatus", parseRes.user.TX_VERIFICATION_STATUS);
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







                // toast.success("login successfully!")
            }
            else {
                setErrorSignUpMessage(parseRes);
                setAuth(false);
                setCount(false);

            }
         
        } catch (error) {
            console.log(error.message);
        }
    } else {
        setErrorSignUpMessage("Check Recapcha before submit");
        setAuth(false);
        setCount(false);
    }} 
    else {
        setErrorSignUpMessage("Missing credencials");
        setAuth(false);
        setCount(false);
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
        localStorage.setItem("isCounsellor", 1);
        window.open(baseURLAPI + "/socialAuth/google/1", "_self");
    }

    console.log(rememberMe);

    const handleChange = async (value) => {
        console.log("Captcha value:", value);
        setrecapcha({ value });
        // if value is null recaptcha expired
        if (value === null) this.setState({ expired: "true" });
    };

    const asyncScriptOnLoad = async () => {



        setrecapcha({ callback: "called!" });
        console.log("scriptLoad - reCaptcha Ref-");
    };

    return (
        <React.Fragment>
            <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='black' textAlign='center' style={{ padding: "10px" }}>
                        Sign up as Counsellor
                            </Header>
                    <Form size='large' >
                        <List divided relaxed>

                            <List.Item>
                                <Button color='red' onClick={_handleGoogleSignInClick}>
                                    <Icon name='google' /> Sign up with Google &nbsp;&nbsp;
                                    </Button> &nbsp;&nbsp;&nbsp;

                                            </List.Item>
                        </List>
                    </Form>
                    <br />

                </Grid.Column>
            </Grid>
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
                    <Form.Group widths='equal'>
                                                <Form.Field className="CustomForm">
                                                    &nbsp;&nbsp;&nbsp;
                                                        <Checkbox name="rememberMe" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} label='Remember me' />
                                                </Form.Field>
                                            </Form.Group  >     <div   >
                                                <ReCAPTCHA
                                                    sitekey={keys.google.googleRecapcha}

                                                    style={{ display: "inline-block" }}
                                                    theme="light"

                                                    onChange={handleChange}
                                                    asyncScriptOnLoad={asyncScriptOnLoad}
                                                />


                                            </div>


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

                    <Button color='teal' fluid size='large'>
                        Sign up
                                            </Button>
                </Segment>
            </Form>

        </React.Fragment >
    )
}
export default Counsellor_Registration;