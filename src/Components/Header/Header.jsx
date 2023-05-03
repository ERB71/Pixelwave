import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import logo from "./PixelWave.png"

function Header() {
  return (
    <AppBar position="static" style={{backgroundColor: "white"}}>
      <Toolbar>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/home">
            <img src = { logo } alt = "PixelWave Logo" style={{ maxWidth: "100%", maxHeight: "100px" }}/>
          </Link>
          <Typography color = {"blue"} fontSize={"4vw"} fontWeight={"bold"} lineHeight={"100%"} style={{ maxWidth: "500px"}}>FOOTBALL MERCHANDISING</Typography>
        </div>
      </Toolbar>
      <Navbar />
    </AppBar>
  );
}

export default Header;
