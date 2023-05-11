import { React, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState()

  useEffect(() => {
    //Query to determine user's role, as this will determin whether they have access to the admin page
    const getRole = async () => {
      try {
        const userIdQuery = await axios.get(`http://localhost:3001/user/getRole?emailAddress=${localStorage.getItem("email")}`);
        setRole(userIdQuery.data[0].role);
      }
      catch (error){
        console.log("Error Retrieving Role", error);
        //redirects user to login page if they are not logged in
        navigate(-1);
      }
    }
    getRole()
  }, []);

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/shirts" className="nav-link">
            Shirts
          </a>
        </li>
        <li className="nav-item">
          <a href="/boots" className="nav-link">
            Boots
          </a>
        </li>
        {role === "admin" && (
          <li className="nav-item">
            <a href="/admin" className="nav-link">
              Admin
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
  
  export default Navbar;
  
  
  
  
  
  