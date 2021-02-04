import React, { useState, useContext, useEffect, useRef } from "react";
import { Authorize } from "../../../../../../MainComponents/DesktopComponent";
import { toast } from "react-toastify";
import TopMenu from "../../SharedComponents/TopMenu";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

import {
  Button,
  Form,
  Card,
  Header,
  Icon,
  Input,
  Dropdown,
  Grid,
  Modal,
  Message,
  Menu,
  Segment,
  Table,
  Label,
  Container,
  List,
  Popup,
} from "semantic-ui-react"; 

import ViewNoti from "../../SharedComponents/ViewNoti";
import ViewMessages from "../../SharedComponents/ViewMessages";
import ViewVerification from "../AdminPages/ViewVerification"; 
import ViewSendNewsletter from "../AdminPages/ViewSendNewsletter"; 
import ViewAddAdminAccount from "../AdminPages/ViewAddAdminAccount"; 
import { baseURLAPI, baseURL } from "../../../../../../Global";
const axios = require("axios");
toast.configure();

const AdminDashboard = (props) => {
  const [OpenMessageSelected, setOpenMessageSelected] = useState(false);

  const contextRefNoti = useRef();
  const [totalmessages, settotalmessages] = useState(0);
  const [newNoti, setnewNoti] = useState(false);
  const contextRef = useRef();
  const setAuth = useContext(Authorize);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    isCounsellor: "",
    isDetailsProvided: true,
  }); 
  const [ IsVerification, setIsVerification] = useState(false);
  const { name, email, isCounsellor, isDetailsProvided } = userDetails;

  const [OpenNotiSelected, setOpenNotiSelected] = useState(false);
  
  const [ Newsletter, setNewsletter] = useState(false);
   
  const [ AddAdminAccount, setAddAdminAccount] = useState(false);
  const [totalnoti, settotalnoti] = useState(0);
  var user = [];
  const [open, setOpen] = useState(false);

  const [activeItem, setactiveItem] = useState(false);
  async function getName() {
    try {
      axios
        .get(
          baseURLAPI +
            "/Counsellor/GetSingleCounsellorDetails/" +
            localStorage.userID,

          {
            headers: {
              jwtToken: localStorage.jwtToken,
            },
          }
        )
        .then(function (response) {
          user = response.data.counsellor;
          var value = undefined;

          if (user.counsellor_details.length > 0) {
            value = true;
          } else {
            value = false;
          }

          setUserDetails({
            name: response.data.counsellor.user_details[0].TX_USER_NAME,
            email: response.data.counsellor.user_details[0].TX_USER_EMAIL,
            isCounsellor:
              response.data.counsellor.user_details[0].IS_COUNSELLOR,
            isDetailsProvided: value,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getName();
    getData();
  }, []);

  async function getData() {
    try {
      axios
        .get(baseURLAPI + "/messages/TotalUnread/" + localStorage.userID, {
          headers: {
            jwtToken: localStorage.jwtToken,
          },
          data: {
            userID: localStorage.userID,
          },
        })
        .then((res) => {
          if (parseInt(res.data) != totalmessages) {
            settotalmessages(parseInt(res.data));
            setnewNoti(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
    try {
      axios
        .get(baseURLAPI + "/notification/TotalNoti/" + localStorage.userID, {
          headers: {
            jwtToken: localStorage.jwtToken,
          },
          data: {
            userID: localStorage.userID,
          },
        })
        .then((res) => {
          if (parseInt(res.data) != totalnoti) {
            settotalnoti(parseInt(res.data));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    setInterval(() => {
      try {
        axios
          .get(baseURLAPI + "/messages/TotalUnread/" + localStorage.userID, {
            headers: {
              jwtToken: localStorage.jwtToken,
            },
            data: {
              userID: localStorage.userID,
            },
          })
          .then((res) => {
            if (parseInt(res.data) != totalmessages) {
              settotalmessages(parseInt(res.data));
              setnewNoti(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error.message);
      }

      try {
        axios
          .get(baseURLAPI + "/notification/TotalNoti/" + localStorage.userID, {
            headers: {
              jwtToken: localStorage.jwtToken,
            },
            data: {
              userID: localStorage.userID,
            },
          })
          .then((res) => {
            if (parseInt(res.data) != totalnoti) {
              settotalnoti(parseInt(res.data));
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error.message);
      }
    }, 5000);
  });
  const logout = async () => {
    //window.open(baseURLAPI + "/socialauth/logout", "_self");
    setAuth(false);
    localStorage.removeItem("isCounsellor");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("email");
    localStorage.removeItem("image");
    localStorage.removeItem("name");
    localStorage.removeItem("userID");
    localStorage.removeItem("isCompleted");
    localStorage.removeItem("verificationStatus");
  };

  const style = {
    borderRadius: 10,
    padding: "1em",
    width: "10rem",
  };

  var users = `This is just an amazing website. Isn't it...?? `;

  return (
    <>
      <Grid.Row>
        <Grid.Column width={16}>
          <Container
            clearing
            style={{
              backgroundColor: "transparent",
              width: "100%",
              padding: "30px 3rem 0px 3rem",
            }}
          >
            <div>
              <Menu secondary>
                <Menu.Item>
                  <Label color="blue" horizontal>
                    Hello {name}
                  </Label>
                </Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item
                   active={activeItem === 'verify'}
                
                   onClick={() => {
                     setactiveItem(  "verify"  ) 
                        setIsVerification(!IsVerification); 
                        setNewsletter(false)
                        setAddAdminAccount(false); 
                    }}
                  >
                    Verification
                  </Menu.Item>
                  <Menu.Item
                   active={activeItem === 'adminAccount'}
                
                   onClick={() => {
                     setactiveItem(  "adminAccount"  ) 
                        setIsVerification(false); 
                        setNewsletter(false)
                        setAddAdminAccount(!AddAdminAccount); 
                    }}
                  >
                    Admin Account
                  </Menu.Item>


                   
                  <Menu.Item
                 active={activeItem === 'news'}
                
                 onClick={() => {
                   setactiveItem(  "news"  ) 
                        setIsVerification(false); 
                        setNewsletter(!Newsletter)
                        setAddAdminAccount(false); 
                    }}
                  >
                    Send Newsletter
                  </Menu.Item>
                   

 
                  <Menu.Item>
                    <Menu text>
                      <Menu.Item
                        onClick={() => {
                          setOpenNotiSelected(false);
                          setOpenMessageSelected(!OpenMessageSelected);
                        }}
                      >
                        <p>
                          <Icon name="mail" style={{ margin: "0px" }} />
                          {totalmessages > 0 ? (
                            <Label color="red" floating>
                              {totalmessages}
                            </Label>
                          ) : (
                            <p></p>
                          )}
                        </p>
                      </Menu.Item>
                    </Menu>

                    <strong ref={contextRef}> </strong>
                    <Popup
                      flowing
                      hoverable
                      popper={{ id: "popper-container" }}
                      position="top right"
                      open={OpenMessageSelected}
                      context={contextRef}
                      content={
                        <Grid
                          style={{
                            width: "500px",
                            height: "400px",
                            overflowY: "scroll",
                            marginBottom: "15px",
                          }}
                        >
                          <Grid.Column>
                            <ViewMessages />
                          </Grid.Column>
                        </Grid>
                      }
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <Menu text>
                      <Menu.Item
                        onClick={() => {
                          setOpenNotiSelected(!OpenNotiSelected);
                          setOpenMessageSelected(false);
                        }}
                      >
                        <Icon name="alarm" style={{ margin: "0px" }} />
                        {totalnoti > 0 ? (
                          <Label color="red" floating>
                            {totalnoti}
                          </Label>
                        ) : (
                          <p></p>
                        )}
                      </Menu.Item>
                    </Menu>

                    <strong ref={contextRefNoti}> </strong>
                    <Popup
                      flowing
                      hoverable
                      popper={{ id: "popper-container" }}
                      position="top right"
                      open={OpenNotiSelected}
                      context={contextRefNoti}
                      content={
                        <Grid
                          style={{
                            width: "500px",
                            height: "400px",
                            overflowY: "scroll",
                            marginBottom: "15px",
                          }}
                        >
                          <Grid.Column>
                            <ViewNoti />
                          </Grid.Column>
                        </Grid>
                      }
                    />
                  </Menu.Item>
                  <Menu.Item
                    as="a"
                    onClick={(e) => logout()}
                    style={{ marginRight: "10px" }}
                  >
                    <Icon name="sign out" />
                    Log out
                  </Menu.Item>
                </Menu.Menu>
              </Menu>{" "}
            </div>
          </Container> 
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
    
      </Grid.Row>
      {IsVerification  && (
        <ViewVerification />
      )} 
       {Newsletter  && (
        <ViewSendNewsletter />
      )} { AddAdminAccount  && (
        <ViewAddAdminAccount />
      )} 
    </>
  );
};

export default AdminDashboard;
