import React, { useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { Link } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import logo from "./PixelWave.png"

function Header() {
  return (
    <AppBar position="static" style={{backgroundColor: "white"}}>
      <Toolbar>
        <Link to="/home">
          <img src = { logo } alt = "PixelWave Logo" width = {"40%"}/>
        </Link>
      </Toolbar>
      <Navbar />
    </AppBar>
  );
}

export default Header;
