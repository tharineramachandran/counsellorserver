
import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  Form,
  Header,
  Image,
  Input, Dropdown, Grid,
  Message,
  Segment, Card, Img, Icon,
  Table, Label, Container, List, Popup
} from "semantic-ui-react";
 
import { ToastContainer, toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
const axios = require('axios'); 

import {baseURLAPI ,baseURL }from "../../../../Global";
var daysNotAvailableList = [];
class ChangePassword extends React.Component {
  constructor(props) {
    super(props)

  }

  state = {
    body: false,
    subject: '',
    catagory: '',
    formWarning: '',
    slotOptions: [],
    message :'',
    password :'',
    color :'blue',
    code:''
  }
  


  submitRequest = () => {
    var sessionDetails = undefined;

    console.log([ this.state.subject]);
    if ( this.state.subject) {
      
            const data = {
              
              email :this.state.subject
            };

            console.log(data)


            
            axios.post(baseURLAPI+`/password/requestChange`, data ) 
      .then(res => {
          console.log(res);
          console.log(res.data);
          sessionDetails = res.data; 
          this.results(res.data.code,res.data.message,"","blue");

      }).catch((error) => {
          if (error.response) {
           
               

            this.results(false,"Unsuccessful to resent password",this.state.subject,"red");
              }
 
      });
    
    } else {

      this.setState({ catagory: "Invalid form" , color :'red' });
    }
  }; 


  submitCode = () => { 
    console.log( this.state.code ) 
    if ( this.state.code         ) {
      
            const data = {
              password :this.state.password,
              code :this.state.code
            };

            console.log(data) 

            axios.post(baseURLAPI+'/password/reset', data ) 
      .then(res => {
         
         var parseRes = res.data
          if (parseRes.jwtToken) {
                 localStorage.setItem("jwtToken", parseRes.jwtToken);
                 localStorage.setItem("isCounsellor", parseRes.isCounsellor);
               localStorage.setItem("userID", parseRes.userID); 

              
            toast.success('Password Change Successful', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: '',
            });
 
        window.location=baseURLAPI+ "/dashboard";
        }
        else {
        
          this.results(true,"Invalid password change code ","","red"); 
        } 
          
 
      }).catch((error) => {
        this.results(true,"Invalid password change code ","","red"); 


      });
    
    } else {

      this.setState({ catagory: "Invalid form", color :'red' });
    }
  }; 

  
  results = ( body,catagory      ,subject    ,color       )=> {
    console.log("this.state");
    this.setState({body :body ,catagory : catagory,subject:subject,color:color})
  }; 


  _onKeyUpSubject = e => {
    var value = e.target.value.toLowerCase();
    console.log(value);
    this.setState({ subject: value });
  }; 
  _onKeyUpCode = e => {
    var value = e.target.value.toLowerCase();
    console.log(value);
    this.setState({ code: value });
  }; 
  _onKeyUpMessage = e => {
    var value = e.target.value.toLowerCase();
    console.log(value);
    this.setState({ message: value });
  }; 

  _onKeyUpPassword = e => {
   
    var value = e.target.value.toLowerCase();
    console.log(value);
    this.setState({ password: value });
  }; 

    
  render() {
    return (

      <Container> <Segment>
{ this.state.body   ? (  
        
<Form  >  
        < Form.Group  widths='equal' >
        <Form.Input label="Code"
                   onChange={this._onKeyUpCode}
          
                   control='input'
        />
        <br />
        <Form.Input label="Password"
          
          type='password' control='input'
          onChange={this._onKeyUpPassword} 
        />
        <br />

      </Form.Group>
      <p style={{ color: this.state.color }}>{this.state.catagory}</p>
        < br />
        <button class="ui button" onClick={this.submitCode}>Submit</button>

    </Form>
 
        ) :
        
        (  <Form  >  
            < Form.Group  widths='equal' >
              <Form.Input label="Email"
                
                type="Email"
                onChange={this._onKeyUpSubject}
                name="s"
                id="s"
                placeholder="Email"
              />
              <br />
    
            </Form.Group>
            <p style={{ color: this.state.color }}>{this.state.catagory}</p>
          < br />
          <button class="ui button" onClick={this.submitRequest}>Submit</button>
  
          </Form> 
    ) 
        }
 
     
      </Segment>  
      

      </Container>


    )
  }
}

export default ChangePassword;

