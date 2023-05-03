import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer";

function ProductListing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
        let query = await axios.get("http://localhost:3001/getProducts");
        setProducts(query.data);
        }
        getProducts();
  }, []);

    return (
      <div>
        <Header />
        <h2>Products</h2>
        <Grid container rowSpacing={{xs: 1, sm: 2, md: 3}} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Link to={`/product/${product.productID}`} style={{ textDecoration: 'none' }}>
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
              </Link>
            </Grid>
          ))}
        </Grid>
         <Footer />
      </div>
    );
}

export default ProductListing;
