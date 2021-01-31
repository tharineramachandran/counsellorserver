import GetWidthOfComponent from './GetWidthOfComponent'
import React, { useState, useEffect } from 'react'
import _NavigationItems from '../SecondaryComponents/Desktop/_NavigationItems'
import _Promos from '../SecondaryComponents/Desktop/_Promos'
import axios from 'axios'
import { Responsive } from 'semantic-ui-react'
import UserDashboard from '../SecondaryComponents/Desktop/UserDashboard/UserDashboard';
import CounsellorDashboard from '../SecondaryComponents/Desktop/UserDashboard/CounsellorDashboard'; 
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  BrowserRouter as Router,  Switch,  Route,  Redirect} from "react-router-dom";

import {baseURLAPI ,baseURL }from "../Global";
const Authorize = React.createContext();
  
const DesktopComponent = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isCounsellor, setIsCounsellor] = useState(0); 
  const setAuth = (boolean) => {

    setIsAuthenticated(boolean);

  } 

  const setCount = (boolean) => {

    setIsCounsellor(boolean);

  } 

  const checkAuthenticated = async () => {
    try {
 

    if (localStorage.jwtToken) {

      console.log("-------------------------[hiojhl         ")
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);        
        const id = urlParams.get('id');
        

          if (id && localStorage.userID) {
            const response = await axios ({
              url: baseURLAPI+"/request/userID?userID="+localStorage.userID+"&requestID="+id     ,
              method: "GET"
            })
            
            console.log(response)
            
            if (response.status == 200)
            {
              //window.close();
                          
            }
          } 
        const res = await fetch(baseURLAPI+"/auth/verify/", {
          
          method: "GET",
          headers: { jwtToken: localStorage.jwtToken }
        });
        const parseRes = await res.json();
        console.log('parseRes'); 
        console.log(parseRes);

        if (parseRes.message){

          localStorage.setItem("userID", parseRes.userID         ); 
          setIsAuthenticated(true) 

        }else {
          localStorage.clear();

          setIsAuthenticated(false);
          toast.error("An error occured, Try again", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: '',
        });
        }
 
        
          fetch(baseURLAPI+"/user/"+localStorage.userID, {
            method: "GET",
            
          })
          .then(response => {
            if (response.status === 200) return response.json();
            throw new Error("failed to authenticate user");
          })
          .then(parseResponse => {
          
            console.log(["------------------------",parseResponse]); 
             localStorage.setItem("isCounsellor", parseResponse.user.IS_COUNSELLOR);
              localStorage.setItem("isCounsellor", parseResponse.user.IS_COUNSELLOR);



          });
  
          
      }
      else {             

        fetch(baseURLAPI+"/socialauth/login/success", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": false,
          }
        })
          .then(response => {
            if (response.status === 200) return response.json();
            throw new Error("failed to authenticate user");
          })
          .then(responseJson => {
            console.log("responseJson is -====", responseJson);            
            localStorage.setItem("isCounsellor", responseJson.isCounsellor);


try { if (parseInt(localStorage.isCounsellor) == 3 ){    
              fetch(baseURLAPI+"/user/"+responseJson.userID, {
                method: "GET",
                
              })
              .then(response => {
                if (response.status === 200) return response.json();
                throw new Error("failed to authenticate user");
              })
              .then(parseResponse => {
                  console.log(["------------------------",parseResponse.IS_COUNSELLOR]); 
                  console.log(["------------------------",parseResponse.user.IS_COUNSELLOR]); 
                  
                console.log(["------------------------",parseResponse]); 

                  localStorage.setItem("userID", parseResponse.user.ID_USER_UUID);
                 localStorage.setItem("isCounsellor", parseResponse.user.IS_COUNSELLOR);
                 if (parseInt(localStorage.isCounsellor)    == 1){
                  console.log(["------------SET------------" ]); 
                  setIsCounsellor(true);
            
                }else {
                   
                  console.log(["------------SET------------" ]); 
                  setIsCounsellor(false);
                } 

              });

            }
 }catch(err){console.log(err);}
           
 
            localStorage.setItem("jwtToken", responseJson.jwtToken); 
            localStorage.setItem("userID", responseJson.userID); 

            const res = fetch(baseURLAPI+"/auth/verify/", {
              method: "GET",
              headers: { jwtToken: localStorage.jwtToken }
            });
              setIsAuthenticated(true)  
         
          })           
          .catch(error => {
            console.log("error is -====", error);
          });
        }
         
    

    } catch (err) {
      console.log("---------------------------------------------------------------------", err);
      console.error(err.message);
    }
  };
   
  useEffect(() => {
     checkAuthenticated();
     
    
       
      console.log(["------------SET--  sdfasdff ----------" ,     localStorage.userID,localStorage.isCounsellor             ]); 
     

        fetch(baseURLAPI+"/user/"+localStorage.userID, {
        method: "GET",
        
      })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(parseResponse => {
     
        console.log(["------------------------",parseResponse]); 
        if(parseResponse){ 
         localStorage.setItem("isCounsellor", parseResponse.user.IS_COUNSELLOR); 
         localStorage.setItem("userID", parseResponse.user.ID_USER_UUID);
        }
         console.log(["------------SET  C------------",localStorage.isCounsellor ]); 

         if (parseInt(localStorage.isCounsellor)    == 1){
           console.log(["------------SET------------" ]); 
           setIsCounsellor(true);
     
         }else {
            
           console.log(["------------SET------------" ]); 
           setIsCounsellor(false);
         } 
      });

     



  }, []);

 


  return (
    <Responsive getWidth={GetWidthOfComponent} minWidth={Responsive.onlyTablet.minWidth}>
      <Router>
        <div className="container">
          <Authorize.Provider value={setAuth}>
            <Switch>
              <Route exact path="/dashboard" render=
                {
                  props => localStorage.isCounsellor ?
                    (
                      parseInt(localStorage.isCounsellor)  ==1  ? (
                      <div><CounsellorDashboard {...props} />
                       </div>
                        ) :                        
                        (
                        
                          <div> <UserDashboard {...props} />
                           </div>
                       
                          
                          )                       
                    ) :
                    (
                      <Redirect to="/" />
                    )
                }>
              </Route>
              <Route exact path="/" render=
                {
                  props => !isAuthenticated ?
                    (
                      <_NavigationItems {...props} />
                    ) :
                    (
                      <Redirect to="/dashboard/" />
                    )
                }>
              </Route>
            </Switch>
          </Authorize.Provider>
        </div>
      </Router>
    </Responsive>
  )
}

export default DesktopComponent;
export {
  Authorize
}