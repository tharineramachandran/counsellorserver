import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Label, Loader, Divider, List, Dropdown, Select
} from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { useStep } from 'react-hooks-helper';
import demoPicture from '../../../Static/Images/demoPicture.png'
import amazingPhoto from '../../../Static/Images/amazingPhoto.png'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop from 'react-image-crop';

const Registration_Second = ({ formData, setForm, navigation }) => {

    const { COUNSELLOR_PHOTO } = formData;
    const [src, selectFile] = useState(null);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ aspect: 1 / 1 });
    const [result, setResult] = useState(null);



    const { handleSubmit, register, errors } = useForm({

    });

    const onSubmit = (data) => {

        navigation.next()
    };

    const handleFileChange = e => {
        selectFile(URL.createObjectURL(e.target.files[0]))
    }

    function getCroppedImg() {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        const base64Image = canvas.toDataURL('image/jpeg');

        setResult(base64Image);

    }

    const Cropped = () => {
        const e = {
          target: {
            name: "COUNSELLOR_PHOTO",
            value: result
          }
        };
        setForm(e);
      };
    

    console.log(result);

    return (

        <Grid>
            <Grid.Column>
                <center>
                    <Segment stacked style={{ width: '80%', textAlign: 'left' }}>
                        <h2>Profile Photo</h2>
                        <center>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Segment stacked style={{ width: '100%' }}>
                                            <div style={{ width: '100%', textAlign: 'left' }}>
                                                <Label color='blue' horizontal>
                                                    Select your Photo and crop it
                                            </Label>
                                            </div>
                                            <br />
                                            <label class="custom-file-input" for="Upload" >
                                            </label>
                                            <br />
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                id="Upload"
                                                name="_photos"
                                                accept="image/*"
                                                className="hiddenButton"
                                            />
                                            {src ?
                                                <Image src="" size="medium">
                                                    <ReactCrop
                                                        src={src}
                                                        onImageLoaded={setImage}
                                                        crop={crop}
                                                        onChange={setCrop}
                                                    />
                                                    <Button onClick={getCroppedImg} >Crop your Image</Button>
                                                </Image>
                                                :
                                                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' disabled />
                                            }
                                        </Segment>
                                        <Segment>
                                            <Button>Preview your cropped Photo</Button><br /><br />
                                            {result ?
                                                <>
                                                    <Image src="" size="medium">
                                                        <img src={result} alt="cropped" onLoad={Cropped} />
                                                    </Image>
                                                </>
                                                :
                                                { COUNSELLOR_PHOTO } &&
                                                    <>
                                                        <Image src="" size="medium">
                                                            <img src={COUNSELLOR_PHOTO} alt="cropped"/>
                                                        </Image>
                                                    </>
                                            }
                                            {/* {COUNSELLOR_PHOTO || result ?
                                                <>

                                                    <Image src="" size="medium">
                                                        <img src={result || COUNSELLOR_PHOTO} alt="cropped image" onLoad={Cropped} />
                                                    </Image>
                                                </>
                                                :
                                                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' disabled />
                                            } */}
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column width={8} style={{ textAlign: 'left' }}>
                                        <Segment stacked style={{ width: '100%' }}>
                                            <Label color='green' horizontal>
                                                Tips for an amazing Photo
                                            </Label>
                                            <br />
                                            <br />
                                            <Image src={amazingPhoto} size="medium" />
                                            <br />
                                            <div>
                                                <Segment color='olive' size="mini">Smile and look at the camera</Segment>
                                                <Segment color='teal' size="mini">Smile and look at the camera</Segment>
                                                <Segment color='violet' size="mini">Smile and look at the camera</Segment>
                                                <Segment color='red' size="mini">Smile and look at the camera</Segment>
                                                <Segment color='yellow' size="mini">Smile and look at the camera</Segment>
                                            </div>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
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