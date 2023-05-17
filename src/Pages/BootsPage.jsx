import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import Header from "../Components/Header/Header"
import SearchBar from "../Components/Products/SearchBar";
import { BootsFilterPanel } from "../Components/Products/FilterPanel";
import Footer from "../Components/Footer/Footer";
import { height } from "@mui/system";

function BootsListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ categories: "", colours: "" });
  const [products, setProducts] = useState([])

  //query to retrieve all products matching the parameters provided
  const getProducts = async () => {
    let query = await axios.get("http://localhost:3001/getBoots", {
      params: {
        searchTerm: searchTerm,
        categories: filters.categories,
        colours: filters.colours
      }
    });
    setProducts(query.data);
  }  
  useEffect(() => {
    getProducts();
  }, [searchTerm, filters]);

  return (
    <div>
      <Header />
      <br />
      <Typography color={"blue"} fontSize={"3vw"} fontWeight={"bold"} style={{ textAlign: "center" }}> BOOTS </Typography>
      <br />
      
      <Grid container rowSpacing={{xs: 1, sm: 2, md: 3}} columnSpacing={{ xs: 1, sm: 2, md: 3 }} border={"2px solid red"}>  
      <Grid item xs={12} style = {{ height: "10%" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <div style={{ marginLeft: "5%" }}>
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
            <div style={{ marginRight: "10%" }}>
              <Typography color={"blue"} fontSize={"2vw"} width = {"fit-content"} lineHeight = {"1"} borderBottom={"1px solid blue"}> Filters </Typography>
              <BootsFilterPanel filters={filters} onChange={setFilters} />
            </div>
          </div>
        </Grid>
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
