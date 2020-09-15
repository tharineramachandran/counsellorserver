import React, { useState, useEffect } from 'react';
import abc from '../../Static/Images/finalBg.png'
import { Segment, Grid, Image, Label, Button, Header, Icon, Input, Container, List, Popup }
    from 'semantic-ui-react'
import _RegistrationModal from './_RegistrationModal';
import counsellor from '../../Static/Images/FinalBannerImage.png';


const _Header = () => {
    const [value, setValue] = useState(false);

    const showModal = () => {
        setValue(true);
    }

    const CloseModal = () => {
        setValue(false);
    }

    var users = `This is just an amazing website. Isn't it...?? `;

    const style = {
        borderRadius: 10,
        padding: '1em',
        width: '10rem'
    }


    return (
        <React.Fragment>
            <Grid.Row className="customGridPadding">
                <Grid.Column width={16}
                    style={{
                        width: '100%',
                        minHeight: 500,
                        maxHeight: 500,
                        backgroundImage: `url(${abc})`,
                        // backgroundImage: `linear-gradient(360deg, rgba(1,73,88,0) 30%, rgba(0,212,255,1) 100%)`,
                        display: 'inline-block',
                        backgroundSize: 'cover',
                    }}>
                    <Container clearing style={{ backgroundColor: 'transparent', width: "100%", padding: '30px 3rem 0px 3rem' }}>
                        <div style={{ float: 'left' }}>
                            <List horizontal >
                                <List.Item as='a' style={{ color: 'black' }}>
                                    <Label color='green' horizontal>
                                        Find a Counsellor
                                    </Label>
                                </List.Item>
                                <List.Item as='a' style={{ color: 'black' }}>
                                    <Label color='blue' horizontal>
                                        Become a Counsellor
                                    </Label>
                                </List.Item>
                            </List>
                        </div>
                        <div style={{ float: 'right' }}>
                            <Popup content={users}
                                trigger={
                                    <Label as='a' circular style={{ marginRight: '10px' }}>
                                        <Icon name='question' style={{ margin: '0px' }} />
                                    </Label>
                                }
                                style={style}
                            />

                            <Label as='a' onClick={() => showModal()}>
                                <Icon name='sign in' />
                                Log In
                            </Label>
                        </div>
                    </Container>

                    <Container clearing style={{
                        backgroundColor: 'transparent',
                        width: "100%",
                        marginTop: '5rem',
                        padding: '0rem 7rem 0rem 3rem'
                    }}>
                        <div style={{ float: 'left', paddingTop: '7rem' }}>
                            <Input
                                size='big'
                                action={{
                                    color: 'teal',
                                    labelPosition: 'left',
                                    icon: 'address book outline',
                                    content: 'Find a course',
                                }}
                                actionPosition='right'
                                placeholder='Search your courses..'
                                defaultValue=''
                                brder='2px solid green'
                            />
                        </div>
                        <div style={{ float: 'right' }}>
                            <Image src={counsellor} size='large' />
                        </div>
                    </Container>

                </Grid.Column >

            </Grid.Row >

            {value ? <_RegistrationModal onCloseModal={() => CloseModal()} /> : " "}

        </React.Fragment >
    )
}

export default _Header;