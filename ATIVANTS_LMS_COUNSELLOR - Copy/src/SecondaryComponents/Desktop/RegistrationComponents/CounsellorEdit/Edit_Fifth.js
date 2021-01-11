import React, { useState, useEffect, useContext } from "react";
import {
  Header,
  Icon,
  Form,
  Image,
  Message,
  Segment,
  Grid,
  Modal,
  Search,
  Button,
  Dimmer,
  Label,
  Loader,
  Container,
  Card,
  Progress,
  Divider,
  List,
  Dropdown,
  Select,
} from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useStep } from "react-hooks-helper";
import demoPicture from "../../../../Static/Images/demoPicture.png";
import amazingPhoto from "../../../../Static/Images/amazingPhoto.png";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop from "react-image-crop";

import { baseURLAPI, baseURL } from "../../../../Global";
import FileBase64 from "react-file-base64";

import { ToastContainer, toast } from "react-toastify";
const axios = require("axios");

const Edit_Fifth = ({ formData, setForm, navigation, step }) => {
  const { COUNSELLOR_DOCUMENT_IMAGE } = formData;
  const [src, selectFile] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [result, setResult] = useState(null);
  const [completed, setCompleted] = useState(0);
  const [statusCode, setStatusCode] = useState("");
  const [fileName, setFileName] = useState({ file: "", name: "" });
  const [icon_name, setIcon_name] = useState("circle");

  const { handleSubmit, register, errors } = useForm({});

  const handleFileChange = (e) => {
    selectFile(URL.createObjectURL(e.target.files[0]));
    setFileName({ file: e.target.files[0], name: e.target.files[0].name });
    getCroppedImg();
  };

  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
  }

  const Cropped = () => {
    const e = {
      target: {
        name: "COUNSELLOR_DOCUMENT_IMAGE",
        value: result,
      },
    };
    setForm(e);
  };

  useEffect(() => {
    if (step.id == "Counsellor_documents") setIcon_name("circle");
    else setIcon_name("circle outline");
  }, []);

  useEffect(() => {
    const e = {
      target: {
        name: "COUNSELLOR_DOCUMENT_IMAGE",
        value: result,
      },
    };
    setForm(e);
  }, [result]);

  // Callback~
  const getFiles = (files) => {
    console.log(files);
    setFileName({ file: files });
    const e = {
      target: {
        name: "COUNSELLOR_FILES",
        value: files,
      },
    };
    setForm(e);
  };

  const documents = (person) => {
    axios
      .get(baseURLAPI + "/verification/getVerificationDocuments/" + person, {
        headers: {
          jwtToken: localStorage.jwtToken,
        },
      })
      .then((res) => {
        const url = res.data;
        console.log(url);
        window.open(url, "_blank");
      });
  };

  const _handleSubmitClick = async () => {
    const headers = {
      jwtToken: localStorage.jwtToken,
    };

    axios
      .post(
        baseURLAPI + `/verification/UpdateDetails`,
        { formData: formData, COUNSELLORID: localStorage.userID },

        {
          headers: headers,
        }
      )

      .then((res) => {
        console.log(res);
        console.log(res.data);

        toast.success("Counsellee update  of counsellor", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: "",
        });
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Unsuccessful update of counsellor", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: "",
          });
        }
      });
  };

  return (
    <Grid>
      <Grid.Column>
        <Form size="small">
          <center>
            <Segment
              inverted
              color="teal"
              size="mini"
              style={{ width: "85%", textAlign: "center" }}
            >
              <Container>
                <div style={{ float: "right", padding: "1rem;" }}>
                  <Label as="a" onClick={() => navigation.previous()}>
                    <Icon name="hand point left outline" />
                    Previous
                  </Label>
                  <Label as="a" onClick={() => navigation.next()}>
                    <Icon name="hand point right outline" />
                    Next
                  </Label>
                </div>
              </Container>
              <br />
              <Container style={{ padding: "1rem 2rem", textAlign: "left" }}>
                <div style={{ backgroundColor: "transparent" }}>
                  <List horizontal>
                    <List.Item>
                      <Label
                        as="a"
                        className="activeBreadCrumb"
                        circular
                        onClick={() => navigation.go(0)}
                      >
                        <Icon name={icon_name} />
                        Personal Details&nbsp;
                      </Label>
                      <Label
                        as="a"
                        className="activeBreadCrumb"
                        circular
                        onClick={() => navigation.go(1)}
                      >
                        <Icon name="circle outline" />
                        Photo&nbsp;
                      </Label>
                      <Label
                        as="a"
                        className="activeBreadCrumb"
                        circular
                        onClick={() => navigation.go(2)}
                      >
                        <Icon name="circle outline" />
                        Description&nbsp;
                      </Label>
                      <Label
                        as="a"
                        className="activeBreadCrumb"
                        circular
                        onClick={() => navigation.go(3)}
                      >
                        <Icon name="circle outline" />
                        Availability&nbsp;
                      </Label>
                      <Label as="a" circular onClick={() => navigation.go(4)}>
                        <Icon name="circle outline" />
                        Verification&nbsp;
                      </Label>
                      <Label
                        as="a"
                        className="activeBreadCrumb"
                        circular
                        onClick={() => navigation.go(5)}
                      >
                        <Icon name="circle outline" />
                        Change Password&nbsp;
                      </Label>
                      <Label
                        as="a"
                        className="activeBreadCrumb"
                        circular
                        onClick={() => navigation.go(6)}
                      >
                        <Icon name="circle outline" />
                        Preferance&nbsp;
                      </Label>
                    </List.Item>
                  </List>
                </div>
              </Container>
              <div style={{ width: "100%" }}>
                <center>
                  <Segment style={{ width: "100%", textAlign: "left" }}>
                    <Container
                      placeholder
                      style={{ backgroundColor: "#e5f1f1", padding: "2rem" }}
                    >
                      <Header as="h5">
                        <Icon name="check circle" color="teal" size="tiny" />
                        Become a verified counsellor
                      </Header>
                      <p style={{ marginLeft: "2.5rem" }}>
                        please upload a photo of you holding your passport. Make
                        sure passport's photo page is open, with your name and
                        face clearly{" "}
                      </p>
                    </Container>
                  
                        <Segment  placeholder>
                          <Grid columns={2} stackable textAlign="center">
                            <Divider vertical>Or</Divider>

                            <Grid.Row verticalAlign="middle">
                              <Grid.Column>
                                <Button
                                  style={{ width: "100%" }}
                                  onClick={() => documents(localStorage.userID)}
                                >
                                  <Icon name="paperclip" />
                                  View submited documents
                                </Button>
                                
                              </Grid.Column>

                              <Grid.Column>
                                <p>Upload your document</p>

                                <input
                                  type="file"
                                  id="file"
                                  hidden
                                  onChange={handleFileChange}
                                />

                                <FileBase64 multiple={true} onDone={getFiles} />
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                          
                        </Segment>
                        <center>
                      <Button color="blue" onClick={_handleSubmitClick}>
                        <Icon name="send" /> Update Details &nbsp;&nbsp;
                      </Button>{" "}
                    </center>
                    <Container
                      placeholder
                      style={{ backgroundColor: "#fff", padding: "2rem" }}
                    >
                      <Header as="h5">
                        <Icon name="lock" color="green" size="tiny" />
                        Safe
                      </Header>
                      <p style={{ marginLeft: "2.5rem" }}>
                        We do not store your documents on our server after
                        verification is complete.
                      </p>
                    </Container>{" "}
             
                  </Segment>
                </center>
              </div>
            </Segment>
          </center>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Edit_Fifth;
