import React from "react";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

//Logic to Create The Icon for the basket that will be used to connect to the basket page
function Basket() {
    const navigate = useNavigate();
    //This function will ensure the user is redirected to their basket when they press the basket button 
    const redirect = async () => {    
        navigate('/basket')
    }

    return(
        <Button
          sx={{
            backgroundColor: 'white',
            color: 'blue',
            "&:hover": {
              color: 'red',
            },
            "& .MuiSvgIcon-root": {
              fontSize: '6vw'
            }
          }}
          onClick={redirect}
        >
          <ShoppingCartIcon />
        </Button>
    )
}
export default Basket;