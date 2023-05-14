import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

//This function contains all of the logic to handle the logging out process
function Logout() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  //This function removes all items from browser related to the current session, and redirects the user back to logic page
  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    setIsLoggingOut(false);
    navigate('/');
  }

  return (
    <Button variant = "contained" sx={{ backgroundColor: 'blue', color: 'white', border: "1px solid red", fontSize: "2vw",   
    "&:hover": { backgroundColor: 'red', border: "1px solid blue"}}}
    onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? 'Logging out...' : 'Logout'}
    </Button>
  );
}
export default Logout;
