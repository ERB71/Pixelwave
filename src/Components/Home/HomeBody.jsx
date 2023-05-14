import { Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import ImageGrid from "./ImageGrid";

//This function simply defines the main body content for the home page, including the buttons to link to other pages
function HomeBody(){
    return(
        <div style={{background:"white", borderLeft: "2px solid red", borderRight: "2px solid red"}}>
            <div id= "shirts" style={{background:"blue", paddingBottom: "5px", borderTop: "2px solid red", borderBottom: "2px solid red", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <Typography color = {"white"} fontSize={"2vw"} fontWeight={"bold"} style={{ maxWidth: "70%", textAlign: "center" }}>
                     The Biggest English And European Teams, As Well As Select National Teams Available Now
                </Typography>    
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Link to={"/shirts"}>
                        <Button variant = "contained" sx={{ backgroundColor: '#F00', color: 'white', border: "1px solid white",
                        "&:hover": { backgroundColor: "white", color: "blue", border: "1px solid red"}}}> Shop Shirts </Button>
                    </Link>
                </div>
            </div>
            <br />
            <br />
            <div id="boots" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: "10px"}}>
                <Typography color={"blue"} fontSize={"2.5vw"} fontWeight={"bold"} style={{ textAlign: "center" }}>
                    BOOTS
                </Typography>
                <Typography color={"blue"} fontSize={"2vw"} fontWeight={"bold"} style={{ maxWidth: "70%", textAlign: "center" }}>
                    Get Your Hands On The Boots Designed For The Best In The World And Elevate Your Game To The Next Level
                </Typography>
                <br />
                <ImageGrid />
                <br />
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Link to={"/boots"}>
                        <Button variant = "contained" sx={{ backgroundColor: 'blue', color: 'white', border: "1px solid red",   
                            "&:hover": { backgroundColor: 'red', border: "1px solid blue"}}}>Shop Boots</Button>
                    </Link>
                </div>
            </div>
        </div>

    )
}
export default HomeBody;
