import React, { useState, useEffect, useContext } from 'react';

import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Divider, Table, Card, List, Container, Label, Item, Dropdown, Select
} from 'semantic-ui-react';
import matthew from '../../../Static/Images/matthew.png'
import { useForm } from "react-hook-form";

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

    const [icon_name, setIcon_name] = useState('circle');
    const { handleSubmit, register, errors } = useForm({

    });

    console.log(formData)

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Segment inverted color='teal' size="mini" style={{ width: '85%', textAlign: 'center' }}>
                        <Container>
                            <div style={{ float: 'left', marginLeft: '2rem' }}>
                                <h4>Summary Page</h4>
                            </div>
                            <div style={{ float: 'right', padding: '1rem;' }}>
                                <Label as='a' onClick={() => navigation.next()}>
                                    <Icon name='hand point right outline' />
                                  Next
                                </Label>
                            </div>
                        </Container>
                        <br />
                        <Container style={{ padding: '1rem 2rem', textAlign: 'left' }}>
                            <div style={{ backgroundColor: 'transparent' }}>
                                <List horizontal >
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
                                        <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(4)}>
                                            <Icon name="circle outline" />
                                                Availability&nbsp;
                                            </Label>
                                        <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(5)}>
                                            <Icon name="circle outline" />
                                                Verification&nbsp;
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
                                <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(0)}>
                                    <Icon name="edit" />
                                                    Edit&nbsp;
                                            </Label>
                            </div>
                            <br />
                            <Table  >


                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell  >  <span>
                                            <Icon name="user" className="customIconsAlign" />   First Name :
                                {COUNSELLOR_FIRST_NAME ? (<span>{COUNSELLOR_FIRST_NAME}</span>) :
                                                (<span>No first name provided</span>)
                                            }
                                        </span>
                                        </Table.Cell>
                                        <Table.Cell  >                              <span>
                                            <Icon name="user" className="customIconsAlign" /> Last Name :
                                {COUNSELLOR_LAST_NAME ? (<span>{COUNSELLOR_LAST_NAME}</span>) :
                                                (<span>No last name provided</span>)
                                            }
                                        </span>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell  >                             <span>
                                            <Icon name="mail" className="customIconsAlign" />  Email :
                                {COUNSELLOR_EMAIL ? (<span>{COUNSELLOR_EMAIL}</span>) :
                                                (<span>No email provided</span>)
                                            }
                                        </span>
                                        </Table.Cell>
                                        <Table.Cell  >    <div >
                                            <span>  <Icon name="phone" className="customIconsAlign" />  Phone Number :  {COUNSELLOR_PHONE_NUMBER ? (<span>{COUNSELLOR_PHONE_NUMBER}</span>) :
                                                (<span>No phone number provided</span>)
                                            }
                                            </span>
                                        </div>



                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell  >     <span >
                                            <Icon name="world" className="customIconsAlign" /> Country :
                                {COUNSELLOR_COUNTRY_CODE ? (<span>{COUNSELLOR_COUNTRY_CODE}</span>) :
                                                (<span>No country provided</span>)
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
                                            (<Table.Cell>    <span>information is missing</span>
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
                                                <Table.Cell>    <span>information is missing</span>
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
                                <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(1)}>
                                    <Icon name="edit" />
                                                    Edit&nbsp;
                                            </Label>
                            </div>
                            <br />
                            <div>
                                {COUNSELLOR_PHOTO ? (
                                    <Image src="" size="medium">
                                        <img src={COUNSELLOR_PHOTO} alt="" />
                                    </Image>

                                ) :
                                    (<span>No Introduction image provided</span>)
                                }
                            </div>
                        </ Segment>

                        < Segment color='violet' size="mini" widths='equal' >
                            <div style={{ width: '100%', textAlign: 'left' }}>
                                <Label as='a' color='blue' ribbon>
                                    Description
                        </Label>
                                <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(2)}>
                                    <Icon name="edit" />
                                                    Edit&nbsp;
                                            </Label>
                            </div>
                            <br />
                            <Table>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <span  >Headlines :
                                            {COUNSELLOR_HEADLINE ? (<span>  {COUNSELLOR_HEADLINE} </span>) :
                                                    (<span>No headlines provided</span>)
                                                }  </span>
                                        </Table.Cell>
                                        <Table.Cell>                                           <span>About :
                                {COUNSELLOR_ABOUT_DESCRIPTION ? (<span>  {COUNSELLOR_ABOUT_DESCRIPTION} </span>) :
                                                (<span>No about provided</span>)
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
                                <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(3)}>
                                    <Icon name="edit" />
                                                    Edit&nbsp;
                                            </Label>
                            </div>
                            <br />
                            <div >

                                {COUNSELLOR_VIDEO_URL ? (

                                    <iframe width="600" height="315" src={COUNSELLOR_VIDEO_URL}>
                                    </iframe>) :
                                    (<p>No video was provided</p>)
                                }

                            </div>

                        </Segment >
                        < Segment color='yellow' size="mini" widths='equal' >
                            <div style={{ width: '100%', textAlign: 'left' }}>
                                <Label as='a' color='blue' ribbon>
                                    Availability
                        </Label> <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(4)}>
                                    <Icon name="edit" />
                                                    Edit&nbsp;
                                            </Label>
                            </div>
                            <br />
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
                                                        <Table.Row  >  <Table.Cell  >   <span> information is missing </span>
                                                        </Table.Cell>   </Table.Row>

                                                    ) :

                                                        index == 0 && COUNSELLOR_AVAILABILITY_MONDAY.length == 1 ? (
                                                            <Table.Row  >  <Table.Cell  >   <span> No session in this day </span>
                                                            </Table.Cell>   </Table.Row>
                                                        ) :


                                                            (<Table.Row  >  <Table.Cell  >   <span>Empty slot found</span>
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
                                                        <Table.Row  >  <Table.Cell  >   <span> information is missing </span>
                                                        </Table.Cell>   </Table.Row>

                                                    ) :

                                                        index == 0 && COUNSELLOR_AVAILABILITY_TUESDAY.length == 1 ? (
                                                            <Table.Row  >  <Table.Cell  >   <span> No session in this day </span>
                                                            </Table.Cell>   </Table.Row>
                                                        ) :


                                                            (<Table.Row  >  <Table.Cell  >   <span>Empty slot found</span>
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
                                                        <Table.Row  >  <Table.Cell  >   <span> information is missing </span>
                                                        </Table.Cell>   </Table.Row>

                                                    ) :

                                                        index == 0 && COUNSELLOR_AVAILABILITY_WEDNESDAY.length == 1 ? (
                                                            <Table.Row  >  <Table.Cell  >   <span> No session in this day </span>
                                                            </Table.Cell>   </Table.Row>
                                                        ) :


                                                            (<Table.Row  >  <Table.Cell  >   <span>Empty slot found</span>
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
                                                        <Table.Row  >  <Table.Cell  >   <span> information is missing </span>
                                                        </Table.Cell>   </Table.Row>

                                                    ) :

                                                        index == 0 && COUNSELLOR_AVAILABILITY_THURSDAY.length == 1 ? (
                                                            <Table.Row  >  <Table.Cell  >   <span> No session in this day </span>
                                                            </Table.Cell>   </Table.Row>
                                                        ) :


                                                            (<Table.Row  >  <Table.Cell  >   <span>Empty slot found</span>
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
                                                        <Table.Row  >  <Table.Cell  >   <span> information is missing </span>
                                                        </Table.Cell>   </Table.Row>

                                                    ) :

                                                        index == 0 && COUNSELLOR_AVAILABILITY_FRIDAY.length == 1 ? (
                                                            <Table.Row  >  <Table.Cell  >   <span> No session in this day </span>
                                                            </Table.Cell>   </Table.Row>
                                                        ) :


                                                            (<Table.Row  >  <Table.Cell  >   <span>Empty slot found</span>
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
                                                        <Table.Row  >  <Table.Cell  >   <span> information is missing </span>
                                                        </Table.Cell>   </Table.Row>

                                                    ) :

                                                        index == 0 && COUNSELLOR_AVAILABILITY_SATURDAY.length == 1 ? (
                                                            <Table.Row  >  <Table.Cell  >   <span> No session in this day </span>
                                                            </Table.Cell>   </Table.Row>
                                                        ) :


                                                            (<Table.Row  >  <Table.Cell  >   <span>Empty slot found</span>
                                                            </Table.Cell>   </Table.Row>)

                                                }
                                            </p>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                        </Segment >
                    </Segment >
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )

}

export default Registration_Result;
