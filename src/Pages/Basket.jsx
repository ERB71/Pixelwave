import { React } from "react"
import Header from "../Components/Header/Header";
import BasketContent from "../Components/Basket/Basket"
import Footer from "../Components/Footer/Footer";
import "../Components/Footer/Footer.css"


function Basket(){
    return(
        <div>
            <Header />
            <BasketContent />
            <Footer />
        </div>
    )
}
export default Basket;