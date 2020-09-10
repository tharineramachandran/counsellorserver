import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Loader, Divider, List, Dropdown, Select
} from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import Dropzone from 'react-dropzone';
import { useStep } from 'react-hooks-helper';
import ReactCrop from 'react-image-crop';
import demoPicture from '../../../Static/Images/demoPicture.png'
import amazingPhoto from '../../../Static/Images/amazingPhoto.png'

const Registration_Second = ({ formData, setForm, navigation }) => {

    const { COUNSELLOR_PHOTO } = formData;

    const [imgSrcdemo, setImgSrcDemo] = useState(demoPicture);
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState({ aspectRatio: 1 / 1 });

    const ImageMaxSize = 1000000000; //bytes
    const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
    const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
        return item.trim()
    })

    const { handleSubmit, register, errors } = useForm({

    });

    const onSubmit = (data) => {

        navigation.next()
    };


    const verifyFile = (files) => {
        if (files && files.length > 0) {
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if (currentFileSize > ImageMaxSize) {
                alert("this file is not allowed. " + currentFileSize + " bytes is too large");
                return false;
            }
            if (!acceptedFileTypesArray.includes(currentFileType)) {
                alert("This file is not allowed. Only images are allowed")
                return false;
            }
            return true;
        }
    }

    const handleOnDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            console.log(rejectedFiles)
            verifyFile(rejectedFiles)
        }

        if (files && files.length > 0) {
            const isVerified = verifyFile(files)
            if (isVerified) {
                console.log("accepted")
                const currentFile = files[0]
                const reader = new FileReader()
                reader.addEventListener("load", () => {
                    console.log(reader.result)
                    console.log("fdfsds1312323fsdfs", imgSrc);
                    setImgSrc(reader.result)
                    console.log("fdfsdfsdfs", imgSrc);
                }, false)

                reader.readAsDataURL(currentFile)
            }
        }
    }

    console.log("fdfsdfsdfs", imgSrc);
    console.log(formData)
    return (

        <Grid>
            <Grid.Column>
                <Form size='small' onSubmit={handleSubmit(onSubmit)}>
                    <center>
                        <Segment stacked style={{ width: '80%', textAlign: 'left' }}>
                            <h1>Profile Photo</h1>

                            <div>
                                <Grid columns={2} padded style={{ textAlign: 'center' }}>
                                    <Grid.Column>
                                        <List divided relaxed>
                                            <List.Item>
                                                <Button color=''>
                                                    <Icon name='' /> Upload Photo
                                            </Button> &nbsp;&nbsp;&nbsp;

                                                <Button color=''>
                                                    <Icon name='' /> Take Photo
                                                </Button>
                                            </List.Item>
                                        </List>

                                        {imgSrc ?
                                            <div>
                                                {/* {imgSrc} */}
                                                <Image src={imgSrc}
                                                    name="COUNSELLOR_PHOTO"
                                                    onChange={setForm}
                                                    name="COUNSELLOR_PHOTO"
                                                    onChange={setForm}
                                                    value={COUNSELLOR_PHOTO}
                                                    size="medium"
                                                    alt="preview of uploaded image" />

<Divider/>
                                                <input
                                                    type='image'
                                                    src={imgSrc}
                                                    name="COUNSELLOR_PHOTO"
                                                    onChange={setForm}
                                                    value={COUNSELLOR_PHOTO}
                                                />

                                                {/* <ReactCrop src={imgSrc} crop={crop.aspectRatio} /> */}
                                            </div>
                                            :
                                            <Dropzone onDrop={handleOnDrop} multiple={false} accept={acceptedFileTypes} maxSize={ImageMaxSize}>
                                                {({ getRootProps }) => (
                                                    <div {...getRootProps()}>
                                                        <p>Drop files here, or click to upload files</p>
                                                    </div>
                                                )}
                                            </Dropzone>
                                        }
                                    </Grid.Column>
                                    <Grid.Column style={{ textAlign: 'left' }}>
                                        <p>
                                            Tips for good photo
                                        </p>
                                        <Image src={amazingPhoto} size="medium" />
                                        <List>
                                            <List.Item icon='hand point right' content='Smile and look at the camera' />
                                            <List.Item icon='hand point right' content='Smile and look at the camera' />
                                            <List.Item icon='hand point right' content='Smile and look at the camera' />
                                            <List.Item icon='hand point right' content='Smile and look at the camera' />
                                            <List.Item icon='hand point right' content='Smile and look at the camera' />
                                            <List.Item icon='hand point right' content='Smile and look at the camera' />
                                            <List.Item icon='hand point right' content='Smile and look at the camera' />
                                            <List.Item icon='hand point right' content='Smile and look at the camera' />
                                            <List.Item icon='hand point right' content='Smile and look at the camera' />
                                            <List.Item icon='hand point right' content='Smile and look at the camera' />
                                            <List.Item icon='hand point right' content='Smile and look at the camera' />
                                            <List.Item icon='hand point right' content='Smile and look at the camera' />
                                        </List>
                                    </Grid.Column>
                                </Grid>
                            </div>


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
                                onClick={() => navigation.next()}
                            >
                                Next
                    </Button>

                        </Segment>
                    </center>
                </Form>

            </Grid.Column>
        </Grid >
    )

}

export default Registration_Second;