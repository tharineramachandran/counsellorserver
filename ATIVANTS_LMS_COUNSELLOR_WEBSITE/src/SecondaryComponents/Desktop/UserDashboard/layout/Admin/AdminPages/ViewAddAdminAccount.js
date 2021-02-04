import React, { useState, useContext, useEffect } from "react";
import {
    Button,
    Form,
    Header,
    Checkbox,
    Image,
    Input,
    Dropdown,
    Grid,
    Message,
    Segment,
    Card,
    Img,
    Icon,
    Table,
    Label,
    Container,
    List,
    Popup,
} from "semantic-ui-react";

import FileBase64 from "react-file-base64";
import { ToastContainer, toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { baseURLAPI, baseURL } from "../../../../../../Global";
const axios = require("axios");

class ViewAddAdminAccount extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        formWarning: "",
        deleteformWarning:"",
        currentValues:[],
        options:[]
    };



    submitRequest = () => {
        console.log(this.state);
        function validEmail(userEmail) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
        }
        var valid = true;

        console.log([this.state.checked]);


        if (![this.state.name, this.state.email, this.state.password].every(Boolean)) {

            valid = false;
            this.setState({ formWarning: "Missing Credentials" });
        } else if (!validEmail(this.state.email)) {
            valid = false;
            this.setState({ formWarning: "Invalid Email" });
        }



        if (valid) {
            console.log(this.state);
            this.setState({ formWarning: "" });
            const headers = {
                jwtToken: localStorage.jwtToken
            }
            const body = { TX_USER_NAME: this.state.name, TX_USER_EMAIL: this.state.email, TX_USER_PASSWORD: this.state.password };
            console.log(body);

            axios.post(baseURLAPI + "/auth/admin/register", body, {
                headers: headers
            })
                .then(res => {

                    toast.success('Account Created!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: '',
                    });
                    this.setTable()

                }).catch((error) => {


                    if (error.response) {

                        toast.error(error.response.data, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: '',
                        });

                    }

                });



        }
    };
    submitRequestDelete = () => {
        console.log(this.state);
         



        if (this.state.currentValues.length>0) {
            console.log(this.state);
            this.setState({ deleteformWarning: "" });
            const headers = {
                jwtToken: localStorage.jwtToken
            }
             

            axios.post(baseURLAPI + "/auth/admin/delete", this.state.currentValues, {
                headers: headers
            })
                .then(res => {

                    toast.success('Account Deleted!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: '',
                    });
                    this.setTable()
                }).catch((error) => {


                    if (error.response) {

                        toast.error(error.response.data, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: '',
                        });

                    }

                });



        }else{this.setState({deleteformWarning :"add accounts to delete"})}
    };

    componentDidMount() {
        this.setTable()

        
    }

    setTable = () =>{ axios
    .get(baseURLAPI + "/newsletter/getAdminEmail/", {
        headers: {
            jwtToken: localStorage.jwtToken,
        },
    })
    .then((res) => {
        const url = res.data;
        console.log("url");
        var options = [];
        for (var i = 0; i < url.length; i++) {
            options.push({

                key: url[i].TX_USER_EMAIL,
                text: url[i].TX_USER_EMAIL,
                value: url[i].TX_USER_EMAIL,
            });


        }
        this.setState({ options })


        console.log(url);

    });

}

    handleChange = (e, { value }) => this.setState({ currentValues: value });

    handleAddition = (e, { value }) => {
        this.setState((prevState) => ({
            options: [{ text: value, value }, ...prevState.options],
        }));
    };
    render() {
        return (
            <Container>
                {" "}
                <Segment>
                    <h1> Create an Admin Account</h1>
                    <Form style={{ width: "100%" }}>
                        <Form.Group widths="equal">
                            <Form.Input
                                label="email"
                                type="email"
                                onChange={(e) => this.setState({ email: e.target.value })}
                                name="s"
                                id="s"
                                placeholder="email"
                            />
                            <br />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input
                                label="name"
                                type="text"
                                onChange={(e) => this.setState({ name: e.target.value })}
                                name="s"
                                id="s"
                                placeholder="name"
                            /> </Form.Group>
                        <br />
                        <Form.Group widths="equal">
                            <Form.Input
                                label="password"
                                type="password"
                                onChange={(e) => this.setState({ password: e.target.value })}
                                name="s"
                                id="s"
                                placeholder="password"
                            />
                        </Form.Group>



                    </Form> <p style={{ color: "red" }}>{this.state.formWarning}</p>
                    <br />
                    <button class="ui button" onClick={this.submitRequest}>
                        Create account
        </button>
                </Segment>



                <Segment>
                    <h1>Delete Admin Account</h1>
                    <Form style={{ width: "100%" }}>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>  Accounts : </label>
                                <Dropdown
                                    options={this.state.options}
                                    placeholder="add or select admin account"
                                    search
                                    selection
                                    fluid
                                    multiple
                                    allowAdditions
                                    value={this.state.currentValues}
                                    onAddItem={this.handleAddition}
                                    onChange={this.handleChange}
                                />   </Form.Field>



                        </Form.Group>



                    </Form>
                    <br /><p style={{ color: "red" }}>{this.state.deleteformWarning}</p>
                    
                    <button class="ui button" onClick={this.submitRequestDelete}>
                    Delete account
        </button>
                </Segment>



            </Container>
        );
    }
}

export default ViewAddAdminAccount;
