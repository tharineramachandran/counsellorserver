import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
    Checkbox,
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Divider, Table, Card, List, Container, Label, Item, Dropdown, Select
} from 'semantic-ui-react';

import { useForm } from "react-hook-form";
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import keys from "../../../../env";
toast.configure();
const Registration_Result = ({ formData, setForm, navigation, step }) => {

    const { COUNSELLOR_FIRST_NAME,
        COUNSELLOR_LAST_NAME,
        COUNSELLOR_EMAIL,
        COUNSELLOR_PHONE_NUMBER,
        COUNSELLOR_COUNTRY_CODE,
        COUNSELLOR_COUNSELLING_SUBJECT_ID,
        COUNSELLOR_HOURLY_RATE,
        COUNSELLOR_QUALIFICATION_INSTITUTE,
        COUNSELLOR_COUNSELLING_DETAILS,
        COUNSELLOR_PHOTO, COUNSELLOR_HEADLINE, COUNSELLOR_ABOUT_DESCRIPTION,
        COUNSELLOR_VIDEO_URL,
        COUNSELLOR_TIME_ZONE_CODE, COUNSELLOR_AVAILABILITY_MONDAY, COUNSELLOR_AVAILABILITY_TUESDAY, COUNSELLOR_AVAILABILITY_WEDNESDAY,
        COUNSELLOR_AVAILABILITY_THURSDAY, COUNSELLOR_AVAILABILITY_FRIDAY, COUNSELLOR_AVAILABILITY_SATURDAY,
        COUNSELLOR_DOCUMENT_IMAGE,
    } = formData;
    const [firstboxError, setfirstboxError] = useState([]);
    const [secondboxError, setsecondboxError] = useState([]);
    const [thirdboxError, setthirdboxError] = useState([]);
    const [fourthboxError, setfourthboxError] = useState([]);
    const [fifthboxError, setfifthboxError] = useState([]);
    const [sixthboxError, setsixthboxError] = useState([]);
    const [seventhboxError, setseventhboxError] = useState([]);
    const [eighthboxError, seeighthboxError] = useState([]);
    const [captchaDemo, setcaptchaDemo] = useState([]);
    const [recapcha, setrecapcha] = useState([]);

    const [icon_name, setIcon_name] = useState('circle');
    const { handleSubmit, register, errors } = useForm({

    });

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
     
    const _handleSubmitClick = async () => {

        var firstString = [];
        var secondString = [];
        var thirdString = [];
        var fourthString = [];
        var fifthString = [];
        var sixthString = [];
        var seventhString = [];
        var eightString = [];
        if (checkedstate.checked && recapcha.value) {
            axios.post(`http://localhost:5000/Counsellee/createCounsellee`, { formData: formData, COUNSELLORID: localStorage.userID })
                .then(res => {
                    console.log(res);
                    console.log(res.data);


                    toast.success('Counsellee created successful!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: '',
                    });
                    var els = document.getElementsByClassName('appBanner');
                    for (var i = 0; i < els.length; i++) {
                        els[i].style.visibility = els[i].style.visibility == "hidden" ? "visible" : "hidden";
                    }

                }).catch((error) => {
                    if (error.response) {
                        var list = error.response.data; // => the response payload 
                        toast.error('Unsuccessful creation of counsellee', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: '',
                        });

                        list.forEach(DisplayValidation);
                        console.log(firstString);
                        setfirstboxError(firstString);
                        setsecondboxError(secondString);
                        setthirdboxError(thirdString);
                        setfourthboxError(fourthString);
                        setfifthboxError(fifthString);
                        setsixthboxError(sixthString);
                        setseventhboxError(seventhString);

                        function DisplayValidation(item, index) {



                            if (item.error == "COUNSELLOR_AVAILABILITY_FRIDAY" || item.error == "COUNSELLOR_AVAILABILITY_MONDAY" || item.error == "COUNSELLOR_AVAILABILITY_SATURDAY" || item.error == "COUNSELLOR_AVAILABILITY_THURSDAY" || item.error == "COUNSELLOR_AVAILABILITY_WEDNESDAY" || item.error == "COUNSELLOR_AVAILABILITY_TUESDAY") {
                                seventhString.push(item.message);

                            }


                            if (item.error == "COUNSELLOR_FIRST_NAME" || item.error == "COUNSELLOR_LAST_NAME" || item.error == "COUNSELLOR_COUNTRY_CODE" || item.error == "COUNSELLOR_EMAIL" || item.error == "COUNSELLOR_PHONE_NUMBER") {
                                firstString.push(item.message);

                            }

                            if (item.error == "COUNSELLOR_QUALIFICATION_INSTITUTE") {
                                secondString.push(item.message);

                            }
                            if (item.error == "COUNSELLOR_COUNSELLING_DETAILS") {
                                thirdString.push(item.message);

                            }
                            if (item.error == "COUNSELLOR_PHOTO") {
                                fourthString.push(item.message);

                            }

                            if (item.error == "COUNSELLOR_ABOUT_DESCRIPTION" || item.error == "COUNSELLOR_HEADLINE") {
                                fifthString.push(item.message);

                            }

                            if (item.error == "COUNSELLOR_VIDEO_URL") {
                                sixthString.push(item.message);

                            }

                        }


                    }
                });
        } else {

            setseventhboxError(["Accept terms and conditions and recapcha first"])



        }
    }
    console.log(formData)



    const [checkedstate, setcheckedstate] = useState({ checked: false });
    const [open, setOpen] = useState(false)
    const toggle = async () => {
        setcheckedstate((prevState) => ({ checked: !prevState.checked }));
        console.log(checkedstate);
        setOpen(false);
    }
    return (
        <Grid>
            <Grid.Column>
                <center>
                    <Segment inverted color='teal' size="mini" style={{ width: '85%', textAlign: 'center', float: 'center' }}>
                        <Container>
                            <div style={{ float: 'left', marginLeft: '2rem' }}>
                                <h4>Summary Page</h4>
                            </div>

                        </Container>
                        <br />
                        <Container style={{ padding: '1rem 2rem', textAlign: 'left' }}>
                            <div style={{ backgroundColor: 'transparent' }}>
                                <List horizontal className="appBanner"   >
                                    <List.Item>
                                        <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(0)}>
                                            <Icon name="circle outline" />
                                                    Personal Details&nbsp;
                                            </Label>
                                        <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(1)}>
                                            <Icon name="circle outline" />
                                                Photo&nbsp;
                                            </Label>
                                        <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(2)}>
                                            <Icon name="circle outline" />
                                                Description&nbsp;
                                            </Label>
                                        <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(3)}>
                                            <Icon name="circle outline" />
                                                Video&nbsp;
                                            </Label>
                                        {/* <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(4)}>
                                            <Icon name="circle outline" />
                                                Availability&nbsp;
                                            </Label>
                                        <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(5)}>
                                            <Icon name="circle outline" />
                                                Verification&nbsp;
                                            </Label> */}
                                        <Label as='a' circular onClick={() => navigation.go(4)}>
                                            <Icon name={icon_name} />
                                                Summary&nbsp;
                                            </Label>
                                    </List.Item>
                                </List>
                            </div>
                        </Container>
                        <Segment color='olive' size="mini" widths='equal'   >
                            <div style={{ width: '100%', textAlign: 'left' }}>
                                <Label as='a' color='blue' ribbon>
                                    Personal Details
                                                 </Label>

                                <div className="appBanner" style={{ float: 'right' }}  >



                                    <Label className="appBanner" as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(0)}>
                                        <Icon name="edit" />
                                                    Edit&nbsp;
                                            </Label></div>

                            </div>
                            <br />
                            {firstboxError.length > 0 && (
                                <Form.Group widths='equal'>
                                    <Form.Field className="CustomForm">
                                        <Message negative style={{ padding: '0.5rem' }}>
                                            {firstboxError.map((firstStringmessage, index) => (
                                                <p>
                                                    {firstStringmessage}
                                                </p>
                                            ))}

                                        </Message>
                                    </Form.Field>
                                </Form.Group>
                            )
                            }

                            <Table  >
                                <Table.Body>

                                    <Table.Row>
                                        <Table.Cell  >
                                            <span>
                                                <Icon name="user" className="customIconsAlign" />   First Name :
                                {COUNSELLOR_FIRST_NAME ? (<span>{COUNSELLOR_FIRST_NAME}</span>) :
                                                    (<span style={{ color: 'red' }}>No first name provided</span>)
                                                }
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell  >                              <span>
                                            <Icon name="user" className="customIconsAlign" /> Last Name :
                                {COUNSELLOR_LAST_NAME ? (<span>{COUNSELLOR_LAST_NAME}</span>) :
                                                (<span style={{ color: 'red' }} >No last name provided</span>)
                                            }
                                        </span>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell  >                             <span>
                                            <Icon name="mail" className="customIconsAlign" />  Email :
                                {COUNSELLOR_EMAIL ? (<span>{COUNSELLOR_EMAIL}</span>) :
                                                (<span style={{ color: 'red' }} >No email provided</span>)
                                            }
                                        </span>

                                        </Table.Cell>
                                        <Table.Cell  >    <div >
                                            <span>  <Icon name="phone" className="customIconsAlign" />  Phone Number :  {COUNSELLOR_PHONE_NUMBER ? (<span>{COUNSELLOR_PHONE_NUMBER}</span>) :
                                                (<span style={{ color: 'red' }} >No phone number provided</span>)
                                            }
                                            </span>
                                        </div>



                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell  >     <span >
                                            <Icon name="world" className="customIconsAlign" /> Country :
                                {COUNSELLOR_COUNTRY_CODE ? (<span>{COUNSELLOR_COUNTRY_CODE}</span>) :
                                                (<span style={{ color: 'red' }} >No country provided</span>)
                                            }
                                        </span>
                                        </Table.Cell>

                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            <div style={{ width: '100%', textAlign: 'left' }}>
                                <Label as='a' color='blue' ribbon>
                                    Educational details
                            </Label>
                            </div>
                            <br />

                            {secondboxError.length > 0 && (
                                <Form.Group widths='equal'>
                                    <Form.Field className="CustomForm">
                                        <Message negative style={{ padding: '0.5rem' }}>
                                            {secondboxError.map((firstStringmessage, index) => (
                                                <p>
                                                    {firstStringmessage}
                                                </p>
                                            ))}

                                        </Message>
                                    </Form.Field>
                                </Form.Group>
                            )
                            }

                            <Table>

                                {COUNSELLOR_QUALIFICATION_INSTITUTE.map((qualification, index) => (
                                    <Table.Body>
                                        {qualification.CT_QUALIFICATION_CODE && qualification.CT_INSTITUTE_CODE ? (
                                            <Table.Row>
                                                <Table.Cell>
                                                    <span> <Icon name="graduation" className="customIconsAlign" />  Qualification : <span>{qualification.CT_QUALIFICATION_NAME} </span>  </span>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <span> <Icon name="university" className="customIconsAlign" />  Institute :  <span>{qualification.CT_INSTITUTE_NAME} </span>  </span> </Table.Cell>
                                            </Table.Row>
                                        ) :
                                            (<Table.Cell>    <span style={{ color: 'red' }} >information is missing</span>
                                            </Table.Cell>)
                                        }
                                    </Table.Body>
                                ))}
                            </Table>

                            <div style={{ width: '100%', textAlign: 'left' }}>
                                <Label as='a' color='blue' ribbon>
                                    Counselling details
                        </Label>

                            </div>
                            <br />
                            {thirdboxError.length > 0 && (
                                <Form.Group widths='equal'>
                                    <Form.Field className="CustomForm">
                                        <Message negative style={{ padding: '0.5rem' }}>
                                            {thirdboxError.map((firstStringmessage, index) => (
                                                <p>
                                                    {firstStringmessage}
                                                </p>
                                            ))}

                                        </Message>
                                    </Form.Field>
                                </Form.Group>
                            )
                            }
                            <Table>

                                {COUNSELLOR_COUNSELLING_DETAILS.map((details, index) => (
                                    <Table.Body>
                                        {details.CT_COUNSELLING_SUBJECT_NAME && details.CT_COUNSELLING_LEVEL_NAME && details.COUNSELLOR_HOURLY_RATE ? (
                                            <Table.Row>
                                                <Table.Cell>
                                                    <span>  <Icon name="university" className="customIconsAlign" />  Counselling Level :  {details.CT_COUNSELLING_LEVEL_NAME}   </span>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <span>  <Icon name="graduation" className="customIconsAlign" /> Counselling subject code : {details.CT_COUNSELLING_SUBJECT_NAME}</span>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <span> <Icon name="user" className="customIconsAlign" />  Counselling hourly rate : {details.COUNSELLOR_HOURLY_RATE} </span>
                                                </Table.Cell>
                                            </Table.Row>
                                        ) :
                                            (<Table.Row>
                                                <Table.Cell>    <span style={{ color: 'red' }} >information is missing</span>
                                                </Table.Cell>

                                            </Table.Row>)
                                        }
                                    </Table.Body>
                                ))}
                            </Table>
                        </Segment >
                        < Segment color='blue' size="mini" widths='equal' >
                            <div style={{ width: '100%', textAlign: 'left' }}>
                                <Label as='a' color='blue' ribbon>
                                    Photo
                        </Label>
                                <div className="appBanner" style={{ float: 'right' }}  >
                                    <Label as='a' class="appBanner" className="activeBreadCrumb" circular onClick={() => navigation.go(1)}>
                                        <Icon name="edit" />
                                                    Edit&nbsp;
                                            </Label>
                                </div> </div>
                            <br />
                            {fourthboxError.length > 0 && (
                                <Form.Group widths='equal'>
                                    <Form.Field className="CustomForm">
                                        <Message negative style={{ padding: '0.5rem' }}>
                                            {fourthboxError.map((firstStringmessage, index) => (
                                                <p>
                                                    {firstStringmessage}
                                                </p>
                                            ))}

                                        </Message>
                                    </Form.Field>
                                </Form.Group>
                            )
                            }
                            <br />
                            <div>
                                {COUNSELLOR_PHOTO ? (
                                    <Image src="" size="medium">
                                        <img src={COUNSELLOR_PHOTO} alt="" />
                                    </Image>

                                ) :
                                    (<span style={{ color: 'red' }} >No Introduction image provided</span>)
                                }<br /><br />
                            </div>
                        </ Segment>

                        < Segment color='violet' size="mini" widths='equal' >
                            <div style={{ width: '100%', textAlign: 'left' }}>
                                <Label as='a' color='blue' ribbon>
                                    Description
                        </Label>
                                <div className="appBanner" style={{ float: 'right' }}  >
                                    <Label as='a' className="appBanner" className="activeBreadCrumb" circular onClick={() => navigation.go(2)}>
                                        <Icon name="edit" />
                                                    Edit&nbsp;
                                            </Label>
                                </div>         </div>
                            <br />
                            {fifthboxError.length > 0 && (
                                <Form.Group widths='equal'>
                                    <Form.Field className="CustomForm">
                                        <Message negative style={{ padding: '0.5rem' }}>
                                            {fifthboxError.map((firstStringmessage, index) => (
                                                <p>
                                                    {firstStringmessage}
                                                </p>
                                            ))}

                                        </Message>
                                    </Form.Field>
                                </Form.Group>
                            )
                            }

                            <Table>
                                <Table.Body>



                                    <Table.Row>
                                        <Table.Cell>
                                            <span  >Headlines :
                                            {COUNSELLOR_HEADLINE ? (<span>  {COUNSELLOR_HEADLINE} </span>) :
                                                    (<span style={{ color: 'red' }} >No headlines provided</span>)
                                                }  </span>
                                        </Table.Cell>
                                        <Table.Cell>                                           <span>About :
                                {COUNSELLOR_ABOUT_DESCRIPTION ? (<span>  {COUNSELLOR_ABOUT_DESCRIPTION} </span>) :
                                                (<span style={{ color: 'red' }} >No about provided</span>)
                                            }</span>
                                        </Table.Cell>

                                    </Table.Row>
                                </Table.Body>
                            </Table>

                        </Segment >
                        < Segment color='red' size="mini" widths='equal' >
                            <div style={{ width: '100%', textAlign: 'left' }}>
                                <Label as='a' color='blue' ribbon>
                                    Video
                        </Label>
                                <div className="appBanner" style={{ float: 'right' }}  >
                                    <Label as='a' className="appBanner" className="activeBreadCrumb" circular onClick={() => navigation.go(3)}>
                                        <Icon name="edit" />
                                                    Edit&nbsp;
                                            </Label>
                                </div>            </div>
                            <br />
                            {sixthboxError.length > 0 && (
                                <Form.Group widths='equal'>
                                    <Form.Field className="CustomForm">
                                        <Message negative style={{ padding: '0.5rem' }}>
                                            {sixthboxError.map((firstStringmessage, index) => (
                                                <p>
                                                    {firstStringmessage}
                                                </p>
                                            ))}

                                        </Message>
                                    </Form.Field>
                                </Form.Group>
                            )
                            }

                            <br />
                            <div >

                                {COUNSELLOR_VIDEO_URL ? (
                                    <iframe width="560" height="315" src={COUNSELLOR_VIDEO_URL} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    // <iframe width="600" height="315" src={COUNSELLOR_VIDEO_URL}>
                                    // </iframe>


                                ) :
                                    (<p style={{ color: 'red' }} >No video was provided</p>)
                                }<br /><br />

                            </div>< div>
                                {seventhboxError.length > 0 && (
                                    <Form.Group widths='equal'>
                                        <Form.Field className="CustomForm">
                                            <Message negative style={{ padding: '0.5rem' }}>
                                                {seventhboxError.map((firstStringmessage, index) => (
                                                    <p>
                                                        {firstStringmessage}
                                                    </p>
                                                ))}

                                            </Message>
                                        </Form.Field>
                                    </Form.Group>
                                )
                                }
                                <Table color='teal' key='teal' inverted >
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell width='10%' >
                                                <Checkbox

                                                    onChange={toggle}
                                                    checked={checkedstate.checked}
                                                />

                                            </Table.Cell>  <Table.Cell width='10%' textAlign='left'  >
                                                <Modal
                                                    open={open}
                                                    onClose={toggle}
                                                    onOpen={() => setOpen(true)}
                                                    trigger={


                                                        <Header as='p' inverted color='white'>
                                                            Read and  Accept terms and Conditions
    </Header>}
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
Cookies <br />
We employ the use of cookies. By accessing Counselling LMS, you agreed to use cookies in agreement with the Counselling LMS's Privacy Policy.
<br />
Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
<br /> <br />
License
Unless otherwise stated, Counselling LMS and/or its licensors own the intellectual property rights for all material on Counselling LMS. All intellectual property rights are reserved. You may access this from Counselling LMS for your own personal use subjected to restrictions set in these terms and conditions.
<br /> <br />
You must not:
<br />
Republish material from Counselling LMS
Sell, rent or sub-license material from Counselling LMS
Reproduce, duplicate or copy material from Counselling LMS
Redistribute content from Counselling LMS <br /> <br />
This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the Terms And Conditions Generator and the Privacy Policy Generator.

Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Counselling LMS does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Counselling LMS,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Counselling LMS shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.

Counselling LMS reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
<br /> <br />
You warrant and represent that: <br />

You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;
The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;
The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy
The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.
You hereby grant Counselling LMS a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
<br /> <br />
Hyperlinking to our Content
The following organizations may link to our Website without prior written approval:
<br /> <br />
Government agencies;
Search engines;
News organizations;
Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and
System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.
These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.
<br /> <br />
We may consider and approve other link requests from the following types of organizations:
<br /> <br />
commonly-known consumer and/or business information sources;
dot.com community sites;
associations or other groups representing charities;
online directory distributors;
internet portals;
accounting, law and consulting firms; and
educational institutions and trade associations. <br /> <br />
We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Counselling LMS; and (d) the link is in the context of general resource information.
These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.
If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Counselling LMS. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
Approved organizations may hyperlink to our Website as follows:
<br /> <br />
By use of our corporate name; or
By use of the uniform resource locator being linked to; or
By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.
No use of Counselling LMS's logo or other artwork will be allowed for linking absent a trademark license agreement.
<br /> <br />
iFrames
Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
<br /> <br />
Content Liability
We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
<br /> <br />
Your Privacy
Please read Privacy Policy
<br /> <br />
Reservation of Rights
We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
<br /> <br />
Removal of links from our website
If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
<br />
We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
<br /> <br />
Disclaimer <br />
To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
<br /> <br />
limit or exclude our or your liability for death or personal injury;
limit or exclude our or your liability for fraud or fraudulent misrepresentation;
limit any of our or your liabilities in any way that is not permitted under applicable law; or
exclude any of our or your liabilities that may not be excluded under applicable law.
The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
<br /> <br />
As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
          </p>

                                                            </Container>

                                                        </Modal.Description>
                                                    </Modal.Content>
                                                    <Modal.Actions>
                                                        <Button onClick={toggle}  >
                                                            Close
        </Button>
                                                    </Modal.Actions>
                                                </Modal>

                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </div>
                        </Segment >
                        {/* < Segment color='yellow' size="mini" widths='equal' >
                            <div style={{ width: '100%', textAlign: 'left' }}>
                                <Label as='a' color='blue' ribbon>
                                    Availability
                        </Label>
                                <div className="appBanner" style={{ float: 'right' }}  > <Label as='a' className="appBanner" className="activeBreadCrumb" circular onClick={() => navigation.go(4)}>
                                    <Icon name="edit" />
                                                    Edit&nbsp;
                                            </Label>
                                </div>       </div>
                            <br />

                            {seventhboxError.length > 0 && (
                                            <Form.Group widths='equal'>
                                                <Form.Field className="CustomForm">
                                                    <Message negative style={{ padding: '0.5rem' }}>
                                                        {seventhboxError.map((firstStringmessage, index) => (
                                                            <p>
                                                                {firstStringmessage}
                                                            </p>
                                                        ))}

                                                    </Message>
                                                </Form.Field>
                                            </Form.Group>
                                        )
                                        }

                            <div>
                                <br />
                                <Label color="blue">Monday</Label>
                                <br />
                                <Table  >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell  >Session starts from </Table.HeaderCell>
                                            <Table.HeaderCell>Session ends at</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {COUNSELLOR_AVAILABILITY_MONDAY.map((details, index) => (
                                            <p>
                                                { details.FROM && details.TO ? (

                                                    <Table.Row>
                                                        <Table.Cell  >   <span> {details.FROM}  </span>
                                                        </Table.Cell>
                                                        <Table.Cell  >   <span> {details.TO}  </span>
                                                        </Table.Cell>
                                                    </Table.Row>

                                                ) :
                                                    details.FROM || details.TO ? (
                                                        <Table.Row  >  <Table.Cell  >   <span style = {{ color : 'red'}} > information is missing </span>
                                                        </Table.Cell>   </Table.Row>

                                                    ) :

                                                        index == 0 && COUNSELLOR_AVAILABILITY_MONDAY.length == 1 ? (
                                                            <Table.Row  >  <Table.Cell  >   <span> No session in this day </span>
                                                            </Table.Cell>   </Table.Row>
                                                        ) :


                                                            (<Table.Row  >  <Table.Cell  >   <span style = {{ color : 'red'}} >Empty slot found</span>
                                                            </Table.Cell>   </Table.Row>)

                                                }
                                            </p>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                            <div>
                                <br />
                                <Label color="blue">Tuesday</Label>
                                <br />
                                <Table  >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell  >Session starts from </Table.HeaderCell>
                                            <Table.HeaderCell>Session ends at</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {COUNSELLOR_AVAILABILITY_TUESDAY.map((details, index) => (
                                            <p>
                                                { details.FROM && details.TO ? (

                                                    <Table.Row>
                                                        <Table.Cell  >   <span> {details.FROM}  </span>
                                                        </Table.Cell>
                                                        <Table.Cell  >   <span> {details.TO}  </span>
                                                        </Table.Cell>
                                                    </Table.Row>

                                                ) :
                                                    details.FROM || details.TO ? (
                                                        <Table.Row  >  <Table.Cell  >   <span style = {{ color : 'red'}} > information is missing </span>
                                                        </Table.Cell>   </Table.Row>

                                                    ) :

                                                        index == 0 && COUNSELLOR_AVAILABILITY_TUESDAY.length == 1 ? (
                                                            <Table.Row  >  <Table.Cell  >   <span> No session in this day </span>
                                                            </Table.Cell>   </Table.Row>
                                                        ) :


                                                            (<Table.Row  >  <Table.Cell  >   <span style = {{ color : 'red'}} >Empty slot found</span>
                                                            </Table.Cell>   </Table.Row>)

                                                }
                                            </p>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                            <div>
                                <br />
                                <Label color="blue">Wednesday</Label>
                                <br />
                                <Table  >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell  >Session starts from </Table.HeaderCell>
                                            <Table.HeaderCell>Session ends at</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {COUNSELLOR_AVAILABILITY_WEDNESDAY.map((details, index) => (
                                            <p>
                                                { details.FROM && details.TO ? (

                                                    <Table.Row>
                                                        <Table.Cell  >   <span> {details.FROM}  </span>
                                                        </Table.Cell>
                                                        <Table.Cell  >   <span> {details.TO}  </span>
                                                        </Table.Cell>
                                                    </Table.Row>

                                                ) :
                                                    details.FROM || details.TO ? (
                                                        <Table.Row  >  <Table.Cell  >   <span style = {{ color : 'red'}} > information is missing </span>
                                                        </Table.Cell>   </Table.Row>

                                                    ) :

                                                        index == 0 && COUNSELLOR_AVAILABILITY_WEDNESDAY.length == 1 ? (
                                                            <Table.Row  >  <Table.Cell  >   <span> No session in this day </span>
                                                            </Table.Cell>   </Table.Row>
                                                        ) :


                                                            (<Table.Row  >  <Table.Cell  >   <span style = {{ color : 'red'}} >Empty slot found</span>
                                                            </Table.Cell>   </Table.Row>)

                                                }
                                            </p>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                            <div>
                                <br />
                                <Label color="blue">Thursday</Label>
                                <br />
                                <Table  >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell  >Session starts from </Table.HeaderCell>
                                            <Table.HeaderCell>Session ends at</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {COUNSELLOR_AVAILABILITY_THURSDAY.map((details, index) => (
                                            <p>
                                                { details.FROM && details.TO ? (

                                                    <Table.Row>
                                                        <Table.Cell  >   <span> {details.FROM}  </span>
                                                        </Table.Cell>
                                                        <Table.Cell  >   <span> {details.TO}  </span>
                                                        </Table.Cell>
                                                    </Table.Row>

                                                ) :
                                                    details.FROM || details.TO ? (
                                                        <Table.Row  >  <Table.Cell  >   <span style = {{ color : 'red'}} > information is missing </span>
                                                        </Table.Cell>   </Table.Row>

                                                    ) :

                                                        index == 0 && COUNSELLOR_AVAILABILITY_THURSDAY.length == 1 ? (
                                                            <Table.Row  >  <Table.Cell  >   <span> No session in this day </span>
                                                            </Table.Cell>   </Table.Row>
                                                        ) :


                                                            (<Table.Row  >  <Table.Cell  >   <span style = {{ color : 'red'}} >Empty slot found</span>
                                                            </Table.Cell>   </Table.Row>)

                                                }
                                            </p>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                            <div>
                                <br />
                                <Label color="blue">Friday</Label>
                                <br />
                                <Table  >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell  >Session starts from </Table.HeaderCell>
                                            <Table.HeaderCell>Session ends at</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {COUNSELLOR_AVAILABILITY_FRIDAY.map((details, index) => (
                                            <p>
                                                { details.FROM && details.TO ? (

                                                    <Table.Row>
                                                        <Table.Cell  >   <span> {details.FROM}  </span>
                                                        </Table.Cell>
                                                        <Table.Cell  >   <span> {details.TO}  </span>
                                                        </Table.Cell>
                                                    </Table.Row>

                                                ) :
                                                    details.FROM || details.TO ? (
                                                        <Table.Row  >  <Table.Cell  >   <span style = {{ color : 'red'}} > information is missing </span>
                                                        </Table.Cell>   </Table.Row>

                                                    ) :

                                                        index == 0 && COUNSELLOR_AVAILABILITY_FRIDAY.length == 1 ? (
                                                            <Table.Row  >  <Table.Cell  >   <span> No session in this day </span>
                                                            </Table.Cell>   </Table.Row>
                                                        ) :


                                                            (<Table.Row  >  <Table.Cell  >   <span style = {{ color : 'red'}} >Empty slot found</span>
                                                            </Table.Cell>   </Table.Row>)

                                                }
                                            </p>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                            <div>
                                <br />
                                <Label color="blue">Saturday</Label>
                                <br />
                                <Table  > <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell  >Session starts from </Table.HeaderCell>
                                        <Table.HeaderCell>Session ends at</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                    <Table.Body>
                                        {COUNSELLOR_AVAILABILITY_SATURDAY.map((details, index) => (
                                            <p>
                                                { details.FROM && details.TO ? (

                                                    <Table.Row>
                                                        <Table.Cell  >   <span> {details.FROM}  </span>
                                                        </Table.Cell>
                                                        <Table.Cell  >   <span> {details.TO}  </span>
                                                        </Table.Cell>
                                                    </Table.Row>

                                                ) :
                                                    details.FROM || details.TO ? (
                                                        <Table.Row  >  <Table.Cell  >   <span style = {{ color : 'red'}} > information is missing </span>
                                                        </Table.Cell>   </Table.Row>

                                                    ) :

                                                        index == 0 && COUNSELLOR_AVAILABILITY_SATURDAY.length == 1 ? (
                                                            <Table.Row  >  <Table.Cell  >   <span> No session in this day </span>
                                                            </Table.Cell>   </Table.Row>
                                                        ) :


                                                            (<Table.Row  >  <Table.Cell  >   <span style = {{ color : 'red'}}>Empty slot found</span>
                                                            </Table.Cell>   </Table.Row>)

                                                }
                                            </p>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                        </Segment > */}

                        <ReCAPTCHA
                            sitekey={keys.google.googleRecapcha }

                            style={{ display: "inline-block" }}
                            theme="light"
                          
                            onChange={handleChange}
                            asyncScriptOnLoad={asyncScriptOnLoad}
                        />

                        <Button className="appBanner" color='blue' onClick={_handleSubmitClick}>
                            <Icon name='send' className="appBanner" /> Submit &nbsp;&nbsp;
                                    </Button> &nbsp;&nbsp;&nbsp;
                    </Segment >
                </center>
            </Grid.Column>

        </Grid>
    )

}

export default Registration_Result;
