import Header from "../Components/Header/Header"
import Carousel from "../Components/Home/Carousel";
import HomeBody from "../Components/Home/HomeBody";
import Footer from "../Components/Footer/Footer";
import "../Components/Footer/Footer.css"

function HomePage(){
    return(
        <div>
            <Header />
            <body id = "body">
                <Carousel />
                <HomeBody />
            </body>
            <Footer/>
        </div>
    );
}

export default HomePage;