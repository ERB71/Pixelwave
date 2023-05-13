import { React } from "react"
import Header from "../Components/Header/Header";
import InventoryManagement from "../Components/Admin/InventoryManagement"
import TransactionHistory from "../Components/Admin/TransactionHistory";
import Footer from "../Components/Footer/Footer";
import "../Components/Footer/Footer.css"


function AdminPage(){
    return(
        <div>
            <Header />
            <InventoryManagement />
            <TransactionHistory />
            <Footer />
        </div>
    )
}
export default AdminPage;