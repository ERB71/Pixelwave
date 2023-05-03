import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import axios from "axios";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";


function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

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
      <Grid xs = {4}>
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
                    heigh: "45%",
                    width: "45%",
                    objectFit: "contain"
                  }}
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h1" fontSize={"4vw"} textAlign={'Right'}>
                    {product.name}
                  </Typography>
                  <Typography variant="h1" fontSize={"3vw"} textAlign={'Right'}>
                    £{product.price}
                  </Typography>
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
