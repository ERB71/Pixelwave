import { Typography } from "@mui/material";
import { borderBottom, borderColor, display } from "@mui/system";
import { Link } from 'react-router-dom';

function HomeBody(){
    return(
        <div style={{background:"white", borderLeft: "2px solid red", borderRight: "2px solid red"}}>
            <div id= "shirts" style={{background:"blue", paddingBottom: "5px", borderBottom: "2px solid red"}}>
                <Typography color = {"white"} fontSize={"2vw"} fontWeight={"bold"} display = {"flex"} justifyContent={"center"}> The Biggest English and European Teams, as well as select National Teams available now</Typography>    
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Link to={"/shirts"}>
                        <button> Shop Shirts </button>
                    </Link>
                </div>
            </div>
            <br />
            <br />
            <div id="boots" style={{ paddingBottom: "5px", borderBottom: "2px solid red", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <Typography color={"blue"} fontSize={"3vw"} fontWeight={"bold"} style={{ textAlign: "center" }}>
                    Boots
                </Typography>
                <Typography color={"blue"} fontSize={"2vw"} fontWeight={"bold"} style={{ maxWidth: "750px", textAlign: "center" }}>
                    Get your hands on the boots designed for the best in the world and elevate your game to the next level
                </Typography>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Link to={"/boots"}>
                    <button>Shop Boots</button>
                    </Link>
                </div>
            </div>






        </div>

    )
}
export default HomeBody;
