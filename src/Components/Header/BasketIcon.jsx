import React from "react";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

function Basket() {
    const navigate = useNavigate();
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