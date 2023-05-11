import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";


function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [alertMessage, setAlertMessage] = useState({ severity: "success", message: "Placeholder" });
  const [alertOpen, setAlertOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [quantityOptions, setQuantityOptions] = useState([]);

  const navigate = useNavigate();

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  useEffect(() => {
    const getProduct = async () => {
      const query = await axios.get(`http://localhost:3001/getSpecificProduct/${id}`);
      setProduct(query.data);
    };
    getProduct();
  }, [id]);

  const getTempStockLevel = async () => {
    try {
      const quantityLimitQuery = await axios.get(`http://localhost:3001/getTempStockLevel?productId=${id}`);
      const quantityLimit = quantityLimitQuery.data[0].tempStockLevel;
      const quantityOptions = Array.from({ length: quantityLimit }, (_, index) => index + 1);
  
      if (quantityLimit < 1) {
        navigate(-1)
        setAlertMessage({ severity: "info", message: "Item is Sold Out, Redirecting to Previous Page" });
        setAlertOpen(true);
      }
      return quantityOptions;
    } catch {
      setAlertMessage({ severity: "error", message: "Error Retrieving Inventory Numbers. Please Try Again"});
      setAlertOpen(true);
    }
  };
  
  useEffect(() => {
    const fetchTempStockLevel = async () => {
      try {
        const quantityOptions = await getTempStockLevel(id);
        setQuantity(quantityOptions[0]);
        setQuantityOptions(quantityOptions);
      } catch (error) {
        setAlertMessage({ severity: "error", message: error.message });
        setAlertOpen(true);
      }
    };
    fetchTempStockLevel();
  }, [id]);
  
  const updateBasket = async () => {
    try {
      const userIdQuery = await axios.get(`http://localhost:3001/user/getUserId?emailAddress=${localStorage.getItem("email")}`);
      const userId = userIdQuery.data[0].userId;
      await axios.post(`http://localhost:3001/basket/updateBasket`, {
        userID: userId,
        productID: id,
        quantity: quantity,
      });
      setAlertMessage({ severity: "success", message: "Item Added To Basket" });
    } catch {
      setAlertMessage({ severity: "error", message: "Error Adding Item To Basket. Please Try Again" });
    }
  
    try {
      const quantityOptions = await getTempStockLevel(id);
      setQuantityOptions(quantityOptions);
    } catch (error) {
      setAlertMessage({ severity: "error", message: error.message });
      setAlertOpen(true);
    }
  
    setAlertOpen(true);
  };
  

  while (!product || Object.keys(product).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <Grid>
        {product.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  variant: "outlined",
                  display: "flex",
                  overflow: "visible"
                }} >

                <CardMedia 
                  component="img"
                  sx = {{
                    width: "45%",
                    objectFit: "fit"
                  }}
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx = {{display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <Typography variant="h1" fontSize={"4vw"} textAlign={'Right'}>
                    {product.name}
                  </Typography>
                  <br />
                  <Typography variant="h1" fontSize={"2vw"} textAlign={'Right'}>
                    {product.categories}
                  </Typography>
                  <Typography variant="h1" fontSize={"2vw"} textAlign={'Right'}>
                    {product.colours}
                  </Typography>
                  <Typography variant="h1" fontSize={"3vw"} textAlign={'Right'}>
                    £{product.price}
                  </Typography>
                  <br />
                  <div style = {{display: "flex"}}>
                    <Typography color = {"blue"} display = {"flex"} fontSize={"2vw"} lineHeight = {"100%"} alignItems={"center"} paddingRight = {"1px"}> Quantity</Typography>
                    <select style={{height: "100%", border: "1px solid blue", color: "blue", marginRight: "10px"}} value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
                      {quantityOptions.map((option) => (
                          <option key={option} value={option}>
                          {option}
                          </option>
                      ))}
                    </select>
                    <Button variant = "contained" sx={{ backgroundColor: 'blue', color: 'white', border: "1px solid red",   
                    "&:hover": { backgroundColor: 'red', border: "1px solid blue"}}}
                    onClick={updateBasket}>Add To Basket</Button>
                  </div>
                </CardContent>
              </Card>
              <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose}>
                <Alert severity={ alertMessage.severity } sx={{width: "100%"}} > 
                { alertMessage.message } 
                </Alert>
            </Snackbar> 
          </Grid>
        ))}
      </Grid>
      <Footer />
    </div>
  )
}
export default ProductDetail;
