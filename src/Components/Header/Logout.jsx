import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

function Logout() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    setIsLoggingOut(false);
    navigate('/');
  }

  return (
    <Button variant = "contained" sx={{ backgroundColor: 'blue', color: 'white', border: "1px solid red",   
    "&:hover": { backgroundColor: 'red', border: "1px solid blue"}}}
    onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? 'Logging out...' : 'Logout'}
    </Button>
  );
}
export default Logout;
