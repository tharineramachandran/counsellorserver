import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Label, Loader, Progress, Divider, List, Dropdown, Select
} from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { useStep } from 'react-hooks-helper';
import demoPicture from '../../../Static/Images/demoPicture.png'
import amazingPhoto from '../../../Static/Images/amazingPhoto.png'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop from 'react-image-crop';

const Registration_Second = ({ formData, setForm, navigation }) => {

    const { COUNSELLOR_DOCUMENT_IMAGE } = formData;
    const [src, selectFile] = useState(null);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ aspect: 1 / 1 });
    const [result, setResult] = useState(null);
    const [completed, setCompleted] = useState(0);
    const [statusCode, setStatusCode] = useState('');
    const [fileName, setFileName] = useState({file:'',name:''});

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
        const e = {
            target: {
                name: "COUNSELLOR_DOCUMENT_IMAGE",
                value: result
            }
        };
        setForm(e);
    }, [result])

    return (

        <Grid>
            <Grid.Column>
                <center>
                    <Segment stacked style={{ width: '80%', textAlign: 'left' }}>
                        <h2>Profile Photo</h2>
                        <center>


                            <Form >
                                <Form.Field>
                                    <label>File input  upload </label>
                                    <Button as="label" htmlFor="file" type="button" animated="fade">
                                        <Button.Content visible>
                                            <Icon name="file" />
                                        </Button.Content>
                                        <Button.Content hidden>Choose a File</Button.Content>
                                    </Button>
                                    <input
                                        type="file"
                                        id="file"
                                        hidden
                                        onChange={handleFileChange}
                                    />
                                    <Form.Input
                                        fluid
                                        label="File Chosen: "
                                        placeholder="Use the above bar to browse your file system"
                                        readOnly
                                        value={fileName.name}
                                    />
                                </Form.Field>
                            </Form>




                                        <Segment>
                                            {result && "Document Attached"}
                                        </Segment>

                        </center>
                        <br /><br />
                        <Form size='small' onSubmit={handleSubmit(onSubmit)}>

                            <Button
                                color='teal'
                                fluid
                                size='large'
                                onClick={() => navigation.previous()}
                            >
                                Back
                            </Button>
                            <br />
                            <Button
                                color='teal'
                                fluid
                                size='large'
                                type="submit"
                                onClick={() => navigation.next()}
                            >
                                Next
                    </Button>
                        </Form>
                    </Segment>
                </center>

            </Grid.Column>
        </Grid >
    )

}

export default Registration_Second;