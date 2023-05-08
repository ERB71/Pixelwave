import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import logo from "./PixelWave.png"
import Logout from "./Logout";

function Header() {
  const emailAddress = localStorage.getItem('email');
  return (
    <AppBar position="static" style={{backgroundColor: "white"}}>
      <Toolbar style = {{padding: "5px"}}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/home">
            <img src = { logo } alt = "PixelWave Logo" style={{ maxWidth: "100%", maxHeight: "100px" }}/>
          </Link>
          <Typography color = {"blue"} fontSize={"4vw"} fontWeight={"bold"} lineHeight={"100%"}>FOOTBALL MERCHANDISING</Typography>
          <Typography color = {"blue"} fontSize={"2vw"} lineHeight={"100%"}> Logged in as: {emailAddress}</Typography>
          <Logout />
        </div>
      </Toolbar>
      <Navbar />
    </AppBar>
  );
}

export default Header;
