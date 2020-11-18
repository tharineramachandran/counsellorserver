import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Label, Loader, Container, Card, Progress, Divider, List, Dropdown, Select
} from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { useStep } from 'react-hooks-helper';
import demoPicture from '../../../Static/Images/demoPicture.png'
import amazingPhoto from '../../../Static/Images/amazingPhoto.png'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop from 'react-image-crop';
 

import FileBase64 from 'react-file-base64';
const Registration_Second = ({ formData, setForm, navigation, step }) => {

    const { COUNSELLOR_DOCUMENT_IMAGE } = formData;
    const [src, selectFile] = useState(null);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ aspect: 1 / 1 });
    const [result, setResult] = useState(null);
    const [completed, setCompleted] = useState(0);
    const [statusCode, setStatusCode] = useState('');
    const [fileName, setFileName] = useState({ file: '', name: '' });
    const [icon_name, setIcon_name] = useState('circle');

    const { handleSubmit, register, errors } = useForm({

    });

    const onSubmit = (data) => {

        navigation.next()
    };

    const handleFileChange = e => {
        selectFile(URL.createObjectURL(e.target.files[0]))
        setFileName({ file: e.target.files[0], name: e.target.files[0].name });
        getCroppedImg();
    }

    function getCroppedImg() {
        const canvas = document.createElement('canvas');
        const base64Image = canvas.toDataURL('image/jpeg');
        setResult(base64Image);

    }

    const Cropped = () => {
        const e = {
            target: {
                name: "COUNSELLOR_DOCUMENT_IMAGE",
                value: result
            }
        };
        setForm(e);
    };


    useEffect(() => {
        if (step.id == 'Counsellor_documents')
            setIcon_name('circle')
        else
            setIcon_name('circle outline')
    }, [])

    useEffect(() => {
        const e = {
            target: {
                name: "COUNSELLOR_DOCUMENT_IMAGE",
                value: result
            }
        };
        setForm(e);
    }, [result])

  // Callback~
     const getFiles = files =>    {
console.log(files);
        setFileName({ file:files }); 
        const e = {
            target: {
                name: "COUNSELLOR_FILES",
                value: files
            }
        };
        setForm(e);
  }
    return (

        <Grid>
            <Grid.Column>
                <Form size='small' onSubmit={handleSubmit(onSubmit)}>
                    <center>
                        <Segment inverted color='teal' size="mini" style={{ width: '85%', textAlign: 'center' }}>
                            <Container>
                                <div style={{ float: 'left', marginLeft: '2rem' }}>
                                    <h4>Registation for Counsellor</h4>
                                </div>
                                <div style={{ float: 'right', padding: '1rem;' }}>
                                    <Label as='a' onClick={() => navigation.previous()}>
                                        <Icon name='hand point left outline' />
                                  Previous
                                </Label>
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
                                                <Icon name={icon_name} />
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
                                            <Label as='a' circular onClick={() => navigation.go(5)}>
                                                <Icon name={icon_name} />
                                                Verification&nbsp;
                                            </Label>
                                            <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(6)}>
                                                    <Icon name="circle outline" />
                                                Summary&nbsp;
                                            </Label>
                                        </List.Item>
                                    </List>
                                </div>
                            </Container>
                            <div style={{ width: '100%' }}>
                                <center>
                                    <Segment style={{ width: '70%', textAlign: 'left' }}>

                                        <Container placeholder style={{ backgroundColor: '#e5f1f1', padding: '2rem' }}>
                                            <Header as="h5">
                                                <Icon name="check circle" color="teal" size="tiny" />
                                                     Become a verified counsellor</Header>
                                            <p style={{ marginLeft: '2.5rem' }}>please
                                            upload a photo of you holding your passport. Make
                                            sure passport's photo page is open, with your name and
                                                    face clearly </p>

                                        </Container>
                                        <Card className="customCard">
                                            <Card.Content className="customCard">
                                                <Card.Meta>Upload your document</Card.Meta>
                                                <Card.Description>
                                                    <Form.Field>
                                                        <Button as="label" htmlFor="file" type="button" animated="fade">
                                                            <Button.Content visible>
                                                                <Icon name="file" color="grey" />
                                                            </Button.Content>
                                                            <Button.Content hidden>Choose a File</Button.Content>
                                                        </Button>
                                                        <input
                                                            type="file"
                                                            id="file"
                                                            hidden
                                                            onChange={handleFileChange}
                                                        />

<FileBase64
        multiple={ true }
        onDone={ getFiles } />


                                                    </Form.Field>
                                                </Card.Description>
                                                <Card.Meta className="customCarContent">
                                                    {fileName.name && <>
                                                        < Icon name='check' color="green" />
                                                        {fileName.name}
                                                    </>
                                                    }
                                                </Card.Meta>
                                            </Card.Content>
                                        </Card>
                                        <Container placeholder style={{ backgroundColor: '#fff', padding: '2rem' }}>
                                            <Header as="h5">
                                                <Icon name="lock" color="green" size="tiny" />
                                                     Safe</Header>
                                            <p style={{ marginLeft: '2.5rem' }}>
                                            We do not store your documents on our server after verification is complete.</p>
                                        </Container>
                                    </Segment>
                                </center>
                            </div>
                        </Segment>
                    </center>
                </Form>
            </Grid.Column>
        </Grid >
    )

}

export default Registration_Second;