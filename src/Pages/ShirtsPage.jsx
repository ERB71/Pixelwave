import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import Header from "../Components/Header/Header"
import SearchBar from "../Components/Products/SearchBar";
import { ShirtsFilterPanel } from "../Components/Products/FilterPanel";
import Footer from "../Components/Footer/Footer";

function ShirtsListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ categories: "", colours: "" });
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    let query = await axios.get("http://localhost:3001/getShirts", {
      params: {
        searchTerm: searchTerm,
        categories: filters.categories,
        colours: filters.colours
      }
    });
    setProducts(query.data);
  };

  useEffect(() => {
    getProducts();
  }, [searchTerm, filters]);

  return (
    <div>
      <Header />
      <br />
      <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{border: "2px solid red" }}>
        <Grid item xs={12} style={{ height: "10%", borderBottom: "2px solid red" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "2px" }}>
            <div style={{ marginLeft: "5%" }}>
              <Typography color={"blue"} fontSize={"3vw"} fontWeight={"bold"} style={{ textAlign: "left" }}> Shop Shirts </Typography>
            </div>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <div style={{ marginRight: "10%" }}>
              <Typography color={"blue"} fontSize={"2vw"} width={"fit-content"} lineHeight={"1"} borderBottom={"1px solid blue"}> Filters </Typography>
              <ShirtsFilterPanel filters={filters} onChange={setFilters} />
            </div>
          </div>
        </Grid>
        {products.length === 0 ? (
          <Grid item xs={12} style={{ justifyContent: "center", display: "flex" }}>
            <Typography color={"blue"} fontSize={"2vw"} style={{ textAlign: "center" }}>No Items Found Matching the Provided Filters</Typography>
          </Grid>
        ) : (
          products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Link to={`/product/${product.productId}`} style={{ textDecoration: 'none' }}>
              <Card 
                 sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  margin: "1px",
                  border: "1px solid blue"
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: "300px",
                    objectFit: "contain",
                  }}
                  image={product.image}
                  alt={product.name}
                />
                <CardContent style={{ flex: 1 }}>
                  <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h1" fontSize={"20pt"} maxWidth={"80%"}>
                      {product.name}
                    </Typography>
                    <Typography variant="h1" fontSize={"20pt"}>
                      £{product.price}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
              </Link>
            </Grid>
          ))
        )}
      </Grid>
      <Footer />
    </div>
  );
}
export default ShirtsListing;
