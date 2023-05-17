import React from 'react';
import { Typography } from "@mui/material";


//Creating the filter panel component that is used on the boots products page
const BootsFilterPanel = ({ filters, onChange }) => {
  const handleCategoryChange = (event) => {
    onChange({ ...filters, categories: event.target.value });
  };

  const handleColourChange = (event) => {
    onChange({ ...filters, colours: event.target.value });
  };

  return (
    <div style ={{display: "flex", alignItems: "center"}}>
      <Typography color={"blue"} fontSize={"2vw"} marginRight={"2%"}>Colour</Typography>
      <select value={filters.colours} onChange={handleColourChange} style={{color: "blue", fontSize: "2vw", borderColor: "red", marginRight: "10%"}}>
        <option value="">All</option>
        <option value="Black">Black</option>
        <option value="Blue">Blue</option>
        <option value="Green">Green</option>
        <option value="Grey">Grey</option>
        <option value="Orange">Orange</option>
        <option value="Pink">Pink</option>
        <option value="Red">Red</option>
        <option value="White">White</option>
      </select>

      <Typography color={"blue"} fontSize={"2vw"} marginRight={"2%"}>Category</Typography>
      <select value={filters.categories} onChange={handleCategoryChange} style={{color: "blue", fontSize: "2vw", borderColor: "red"}}>
        <option value="">All</option>
        <option value="Adidas">Adidas</option>
        <option value="Firm Ground">Firm Ground</option>
        <option value="Laceless">Laceless</option>
        <option value="Multi Ground">Multi Ground</option>
        <option value="Nike">Nike</option>
      </select>
    </div>
  );
};


//Creating the filter panel component that is used on the shirts products page
const ShirtsFilterPanel = ({ filters, onChange }) => {
  const handleCategoryChange = (event) => {
    onChange({ ...filters, categories: event.target.value });
  };

  const handleColourChange = (event) => {
    onChange({ ...filters, colours: event.target.value });
  };

  return (
    <div style ={{display: "flex", alignItems: "center"}}>
      <Typography color={"blue"} fontSize={"2vw"} marginRight={"2%"}>Colour</Typography>
      <select value={filters.colours} onChange={handleColourChange} style={{color: "blue", fontSize: "2vw", borderColor: "red", marginRight: "10%"}}>
        <option value="">All</option>
        <option value="Black">Black</option>
        <option value="Blue">Blue</option>
        <option value="Bronze">Bronze</option>
        <option value="Burgundy">Burgundy</option>
        <option value="Green">Green</option>
        <option value="Grey">Grey</option>
        <option value="Orange">Orange</option>
        <option value="Pink">Pink</option>
        <option value="Red">Red</option>
        <option value="White">White</option>
        <option value="Yellow">Yellow</option>
      </select>

      <Typography color={"blue"} fontSize={"2vw"} marginRight={"2%"}>Brand</Typography>
      <select value={filters.categories} onChange={handleCategoryChange} style={{color: "blue", fontSize: "2vw", borderColor: "red"}}>
        <option value="">All</option>
        <option value="Adidas">Adidas</option>
        <option value="Macron">Macron</option>
        <option value="Nike">Nike</option>
        <option value="Puma">Puma</option> 
      </select>
    </div>
  );
};

export {BootsFilterPanel, ShirtsFilterPanel};
