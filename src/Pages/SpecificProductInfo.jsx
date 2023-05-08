import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import axios from "axios";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { height } from "@mui/system";


function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const [quantity, setQuantity] = useState(1);
  const quantityOptions = [1, 2, 3, 4, 5];

  useEffect(() => {
    const getProduct = async () => {
      let query = await axios.get(`http://localhost:3001/getSpecificProduct/${id}`);
      console.log(query.data)
      setProduct(query.data);
    }
    getProduct();
  }, [id]);

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
                  <div display = "flex">
                    <select style={{height: "100%", marginRight: "10px"}} value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
                      {quantityOptions.map((option) => (
                          <option key={option} value={option}>
                          Quantity: {option}
                          </option>
                      ))}
                    </select>
                    <Button variant = "contained" sx={{ backgroundColor: 'blue', color: 'white', border: "1px solid red",   
                    "&:hover": { backgroundColor: 'red', border: "1px solid blue"}}}>Add To Basket</Button>
                  </div>
                </CardContent>
              </Card>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </div>
  )
}
export default ProductDetail;
