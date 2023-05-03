import Header from "../Components/Header/Header"
import Carousel from "../Components/Carousel/Carousel";
import Footer from "../Components/Footer/Footer";
import "../Components/Footer/Footer.css"
import { Typography } from "@mui/material";

function HomePage(){
    return(
        <div>
            <Header />
            <body id = "body">
                <Carousel />
                <Typography> Shop Shirts </Typography>
            </body>
            <Footer/>
        </div>
    );
}

export default HomePage;