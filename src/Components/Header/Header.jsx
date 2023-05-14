import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import logo from "./PixelWave.png"
import Logout from "./Logout";
import Basket from "./BasketIcon";

function Header() {
  const emailAddress = localStorage.getItem('email');
  return (
    <AppBar position="static" style={{backgroundColor: "white"}}>
      <Toolbar style = {{padding: "5px"}}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/home">
            <img src = { logo } alt = "PixelWave Logo" style={{ maxWidth: "100%", maxHeight: "100px" }}/>
          </Link>
          <Typography color = {"blue"} fontSize={"4vw"} fontWeight={"bold"} lineHeight={"100%"} width={"40%"}>FOOTBALL MERCHANDISING</Typography>
          <div style={{ width: "20%", display: "flex", flexDirection: "column", marginRight: "2px" }}>
            <Typography color = {"blue"} fontSize={"1vw"} lineHeight={"100%"} marginBottom={"3px"}> Logged in as: {emailAddress}</Typography>
            <Logout />
          </div>
          <Basket />
        </div>
      </Toolbar>
      <Navbar />
      <Typography style = {{ backgroundColor: "white", color: "red", fontSize: "2vw", textAlign: "center" }}> Free Delivery On Orders Over £50 </Typography>
    </AppBar>
  ); 
}

export default Header;
