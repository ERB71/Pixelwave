import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Alert, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import "./Login.css";
import logo from "../Header/PixelWave.png";

function Login() {
   try{
      axios.post(`http://localhost:3001/user/createAdmin`);
   }
   catch{
      console.log("error creating admin")
   }


   const [emailAddressReg, setEmailAddressReg] = useState("");
   const [passwordReg, setPasswordReg] = useState ("");

   const [emailAddress, setLoginEmailAddress] = useState("");
   const [password, setLoginPassword] = useState ("");

   const [alertMessage, setAlertMessage] = useState({ severity : "success", message : "Placeholder"})
   const [alertOpen, setAlertOpen] = useState(false);

   const handleAlertClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setAlertOpen(false)
   }
   
   const navigate = useNavigate();

   const register = async () => {
      try{
         let query = await axios.post(`http://localhost:3001/user/register?emailAddress=${emailAddressReg}&password=${passwordReg}`);
         console.log(query.data);
         setAlertMessage({severity:"success", message: "User Registered"})
         localStorage.setItem('email', emailAddressReg)
         navigate('/home')
      }
      catch{
         setAlertMessage({severity: "error", message: "Error While Validating New User. Please Try Again"})
      }
      setAlertOpen(true)
   };
   
   const login = async () => {
      try{
         let query = await axios.get(`http://localhost:3001/user/login?emailAddress=${emailAddress}&password=${password}`);
         console.log(query.data);
         setAlertMessage({severity:"success", message: "User Found, Logging In..."})
         localStorage.setItem('email', emailAddress)
         navigate('/home')
      }
      catch{
         setAlertMessage({severity: "error", message: "Error When Validating Provided Login Details. Please Try Again"})
      }
      setAlertOpen(true)
   }

   return (
       <div className="App">
         <div className = "Logo">
            <img src = { logo } alt = "PixelWave Logo" height={"100px"}/>
         </div>
         <div className="registration">
            <h1>Registration</h1>
            <label>Email Address</label>
            <input type="text" 
               onChange={(e) => {
                  setEmailAddressReg(e.target.value);
               }}
            />
            <label>Password</label>
            <input type="password" 
               onChange={(e) => {
                  setPasswordReg(e.target.value);
               }}
            /> <br/>
            <button onClick={register}> Register</button>
         </div> <br/>
         <div className="login">
            <h1>Login</h1>
            <input type="text" placeholder="Email Address…" 
               onChange = { (e) => {
                  setLoginEmailAddress (e.target.value);
               }}
            /> 
            <Typography>Hint: admin@Pixelwave.com</Typography>
            <br/>
            <input type="password" placeholder="Password…" 
               onChange = { (e) => {
                  setLoginPassword (e.target.value);
               }}
            /> 
            <Typography>Hint: admin123</Typography>
            <br/>
            <button onClick={login} >Login</button>
         </div>
         <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose}>
            <Alert severity={ alertMessage.severity } sx={{width: "100%"}} > 
            { alertMessage.message } 
            </Alert>
         </Snackbar> 
      </div>
    );
}
 
export default Login;