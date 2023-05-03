import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer";

function BootsListing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
        let query = await axios.get("http://localhost:3001/getBoots");
        setProducts(query.data);
        }
        getProducts();
  }, []);

    return (
      <div>
        <Header />
        <br />
        <Typography color={"blue"} fontSize={"3vw"} fontWeight={"bold"} style={{ textAlign: "center" }}> BOOTS </Typography>
        <br />
        <Grid container rowSpacing={{xs: 1, sm: 2, md: 3}} columnSpacing={{ xs: 1, sm: 2, md: 3 }} border={"2px solid red"}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Link to={`/product/${product.productID}`} style={{ textDecoration: 'none' }}>
                <Card 
                sx = {{
                  variant: "outlined",
                  height: "400px"
                }}
                >
                  <CardMedia
                    component="img"
                    sx = {{
                      height: "300px",
                      objectFit: "contain"
                    }}
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

export default BootsListing;
