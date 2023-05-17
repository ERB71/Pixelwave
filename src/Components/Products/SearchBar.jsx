import React from 'react';
import { TextField } from '@mui/material';

//Function used to create the search box used on the products pages
function SearchBar({ value, onChange }) {
    const handleInputChange = (event) => {
      onChange(event.target.value);
    };
  
    return (
      <div>
        <TextField
          label="Search"
          value={value}
          onChange={handleInputChange}
        />
      </div>
    );
}
export default SearchBar;  