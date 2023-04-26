import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";

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
    <Grid container rowSpacing={{xs: 1, sm: 2, md: 3}} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {product.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card variant = "outlined">
              <CardMedia
                component="img"
                height="500"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography>
                  {product.name}
                </Typography>
                <Typography>
                  £{product.price}
                </Typography>
              </CardContent>
            </Card>
        </Grid>
      ))}
    </Grid>
  )
}
export default ProductDetail;
