import React, { useState, useEffect, useContext } from 'react';
import {
    Header, Icon, Form, Image, Message,
    Segment, Grid, Modal, Search, Button, Dimmer, Label, Loader, Container, Divider, List, Dropdown, Select
} from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { useStep } from 'react-hooks-helper';
import amazingPhoto from '../../../../Static/Images/amazingPhoto.png'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop from 'react-image-crop';
import { ToastContainer, toast } from 'react-toastify';
import { baseURLAPI, baseURL } from "../../../../Global";
import demoPofileImage from '../../../../Static/Images/demoProfileImage.png'
const axios = require('axios');

const Edit_Second = ({ formData, setForm, navigation, step }) => {

    const { COUNSELLOR_PHOTO } = formData;
    const [src, selectFile] = useState(null);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ aspect: 1 / 1 });
    const [result, setResult] = useState(null);
    const [icon_name, setIcon_name] = useState('circle');
    const { handleSubmit, register, errors } = useForm({

    });
    const [DEFAULT_COUNSELLOR_PHOTO, setDefaultPP] = useState();
    const [firstboxError, setfirstboxError] = useState([]);
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
        setResult(base64Image);    }

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
    useEffect(() => {


        axios.get(baseURLAPI + '/Counsellee/profilePicture/' + localStorage.userID, {
            headers: {
                jwtToken: localStorage.jwtToken
            },
            data: {
                userID: localStorage.userID

            }
        })
            .then(res => {
                console.log(" res.data.COUNSELLOR_PHOTO")
                console.log(res.data.COUNSELLOR_PHOTO)

                var e = {
                    target: {
                        name: "COUNSELLOR_PHOTO",
                        value: res.data.COUNSELLOR_PHOTO
                    }
                };
                setForm(e);
                setDefaultPP(res.data.COUNSELLOR_PHOTO);
            }).catch(err => {
            })

        if (step.id == 'Counsellor_photo')
            setIcon_name('circle')
        else
            setIcon_name('circle outline')

    }, [])

    const _handleSubmitClick = async () => {
        
        const headers = {
            jwtToken: localStorage.jwtToken
        }
          
        axios.post(`http://localhost:5000/Counsellee/UpdatePhoto`, { formData: formData, COUNSELLORID: localStorage.userID },
        
        {
            headers: headers
        }
        )
            .then(res => {
                console.log(res);
                console.log(res.data);
                setfirstboxError("");
          
                
                toast.success('Counsellee updated successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: '',
                });

            }).catch((error) => {
                if (error.response) {
                    var firstString = [];
                    var list = error.response.data;
                    list.forEach(DisplayValidation);
                    console.log(firstString);
                    setfirstboxError(firstString);

                    function DisplayValidation(item, index) {

                        if (item.error == "COUNSELLOR_PHOTO") {
                            firstString.push(item.message);

                        }

                    }
                    toast.error('Unsuccessful update counsellee', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: '',
                    });
                }
                console.log(error);
            });
    }
    return (

        <Grid>
            <Grid.Column>
                <center>
                    <Segment inverted color='teal' size="mini" style={{ width: '85%', textAlign: 'center' }}>
                        <Container>

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
                                        <Label as='a' circular onClick={() => navigation.go(1)}>
                                            <Icon name={icon_name} />
                                                Photo&nbsp;
                                            </Label>
                                        <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(2)}>
                                            <Icon name="circle outline" />
                                                Description&nbsp;
                                            </Label>
                                            <Label as='a'  className="activeBreadCrumb" circular onClick={() => navigation.go(3)}>
                                            <Icon name={icon_name} />
                                                Change Password&nbsp;
                                            </Label>
                                            <Label as='a' className="activeBreadCrumb" circular onClick={() => navigation.go(4)}>
                                            <Icon name="circle outline" />
                                                Preferance&nbsp;
                                            </Label> 
                                    </List.Item>
                                </List>
                            </div>
                        </Container>

                        <div style={{ width: '100%', float: 'clear' }}>
                            <center>
                                <Segment style={{ width: '95%' }}>
                                    <center><div style={{ width: '100%', textAlign: 'left' , paddingBottom:'1%'}}>
                                                    <Label as='a' color='blue' ribbon>
                                                       Profile Picture
                                        </Label>
                                        
                                                </div> 
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column width={8}>
                                                    <Segment stacked style={{ width: '100%' }}>
                                                                   
                                        <div style={{ width: '100%',  padding:'5px '}}><Label color='blue' horizontal   > 
                                        Add a profile picture and crop it</Label>  
                                                  
                                                </div> 
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
                                                            <Image src={demoPofileImage} size='small' disabled />
                                                        }
                                                        <br/>
 <label class="custom-file-input" for="Upload" > </label>
                                                    </Segment>
                                                    <Segment>   
                                                     <center>
                                                     <Button className="appBanner" color='blue' onClick={_handleSubmitClick}>
                                                         <Icon name='send' className="appBanner" /> Update Details &nbsp;&nbsp;
                         </Button> &nbsp;&nbsp;&nbsp;
                                          </center>
                         
                                              </Segment>
                                                </Grid.Column>
                                                <Grid.Column width={8} style={{ textAlign: 'left' }}>
                                                    <Container stacked style={{ width: '100%' }}><center>
                                                        

                                            <div style={{ width: '100%',  padding:'5px '}}><Label color='blue' horizontal s  >
                                            Preview of profile picture </Label>  
                                                </div> 
                                                        <br />
                                                        {result ?
                                                            <>
                                                                <Image src="" size="medium">
                                                                    <img src={result} alt="" onLoad={Cropped} />
                                                                </Image>
                                                            </>
                                                            :
                                                            { COUNSELLOR_PHOTO } &&
                                                            <>
                                                                <Image src="" size="medium">
                                                                    <img src={COUNSELLOR_PHOTO} alt="" />
                                                                </Image>
                                                            </>
                                                        }
                                                       </center>
                                                    </Container>
                                                    
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </center>
                                </Segment>
                            </center>
                        </div>
                    </Segment>
                </center>

            </Grid.Column>
        </Grid >
    )

}

export default Edit_Second;