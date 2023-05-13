import React, { useEffect, useState } from "react";
import { Alert, Grid, Card, CardContent, CardMedia, Snackbar, Typography, Button } from "@mui/material";
import { Add, Delete, Remove } from '@material-ui/icons';
import axios from "axios";

function InventoryManagement() {
    const [inventoryData, setInventoryData] = useState(null);
    const [updatedProducts, setUpdatedProducts] = useState([]);
    const [alertMessage, setAlertMessage] = useState({ severity: "success", message: "Placeholder" });
    const [alertOpen, setAlertOpen] = useState(false);

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
           return;
        }
        setAlertOpen(false)
    }

    const getInventory = async () => {
    try {    
        const inventoryQuery = await axios.get(`http://localhost:3001/getAllProducts`);
        const inventory = inventoryQuery.data;

        const updatedProducts = [];
    
        for (let i = 0; i < inventory.length; i++) {
            const item = inventory[i];
            const productId = item.productID;
            const quantity = item.stockLevel;
    
            try {
                // make a request to retrieve the product details
                const productQuery = await axios.get(`http://localhost:3001/getSpecificProduct/${productId}`);
                const product = productQuery.data[0];
        
                // push the updated product to the temporary array (temp array needed as it was causing each item to display twice)
                updatedProducts.push({
                    ...product,
                    quantity,
                    productId
                });
            }
            catch (error) {
                console.log("Inventory Could Not Be Retrieved", error);
            }
        }
        setUpdatedProducts(updatedProducts);
        setInventoryData(inventoryQuery.data);
    } 
    catch (error) {
        console.log(error);
    }
    };
    useEffect(() => {
        getInventory();
    }, []);

    const decrementProductAmount = async (id, quantity) => {
        try{
            console.log(id)
            const tempStockLevelQuery = await axios.get(`http://localhost:3001/getTempStockLevel?productId=${id}`);
            let tempStockLevel = tempStockLevelQuery.data[0].tempStockLevel;
            //logic to ensure tha tempStockLevel doesn't become negative
            if (tempStockLevel == 0){
                tempStockLevel ++;
            }

            await axios.post(`http://localhost:3001/inventory/updateInventoryQuantity`, {
                quantity: (quantity - 1),
                tempQuantity: (tempStockLevel - 1),
                productID: id
            });

            setAlertMessage({ severity: "success", message: "Inventory Updated" });
            getInventory();
            setAlertOpen(true);
        } catch {
            setAlertMessage({ severity: "error", message: "Error Updating Inventory"})
        };
    };


    const incrementProductAmount = async (id, quantity) => {
        try{
            console.log(id)
            const tempStockLevelQuery = await axios.get(`http://localhost:3001/getTempStockLevel?productId=${id}`);
            let tempStockLevel = tempStockLevelQuery.data[0].tempStockLevel;

            await axios.post(`http://localhost:3001/inventory/updateInventoryQuantity`, {
                quantity: (quantity + 1),
                tempQuantity: (tempStockLevel + 1),
                productID: id
            });

            setAlertMessage({ severity: "success", message: "Inventory Updated" });
            getInventory();
            setAlertOpen(true);
        } catch {
            setAlertMessage({ severity: "error", message: "Error Updating Inventory"})
        };
    }


    const deleteProduct = async (id) => {
        try{
            await axios.post(`http://localhost:3001/inventory/deleteInventoryItem`, {
                productID: id,
            })
            setAlertMessage({ severity: "success", message: "Product Deleted From Inventory" });
            getInventory();
            
        } catch {
            setAlertMessage({ severity: "error", message: "Error Updating Inventory"})
        };
        setAlertOpen(true);
    }

    return(
        <div>
            {inventoryData ? (
                <>
                <Grid marginTop={"1%"}>
                    <Typography variant="h1" fontSize={"3vw"} textAlign={"center"} backgroundColor={"blue"} color={"white"} border={"2px solid red"}> Manage Inventory </Typography>                    
                    {updatedProducts.map((product) => (   
                    <Grid item key={product.id} xs={12} sm={6} md={4} margin = {"1%"} border={"2px solid red"}>
                        <Card sx={{ variant: "outlined", display: "flex", overflow: "hidden", width: "100%" }}>
                            <CardMedia
                                component="img"
                                sx={{
                                width: "20%",
                                objectFit: "contain",
                                }}
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent sx={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-end", textAlign: "right"}}>
                                <Typography variant="h1" fontSize={"3vw"} textAlign={"Right"}>
                                {product.name}
                                </Typography>
                                <Typography variant="h1" fontSize={"2vw"} textAlign={"Right"}>
                                {product.colours}
                                </Typography>
                                <Typography variant="h1" fontSize={"2vw"} textAlign={"Right"}>
                                {product.categories}
                                </Typography>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Button sx={{ backgroundColor: 'white', color: 'blue', minWidth: "0px", 
                                        "& .MuiSvgIcon-root": { fontSize: '1.5rem'}
                                        }}
                                        onClick={() => decrementProductAmount(product.productId, product.quantity)}
                                        >
                                        <Remove />
                                    </Button>

                                    <Typography variant="h1" fontSize={"2.5vw"} textAlign={"Right"}>
                                        {product.quantity}
                                    </Typography>

                                    <Button sx={{ backgroundColor: 'white', color: 'blue', minWidth: "0px",
                                        "& .MuiSvgIcon-root": { fontSize: '1.5rem'}
                                        }}
                                        onClick={() => incrementProductAmount(product.productId, product.quantity)}
                                        >
                                        <Add />
                                    </Button>
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Typography variant="h1" fontSize={"2vw"} textAlign={"Right"}>
                                        Delete
                                    </Typography>
                                    <Button sx={{ backgroundColor: 'white', color: 'blue', minWidth: "0px", 
                                        "& .MuiSvgIcon-root": { fontSize: '1.5rem'}
                                        }}
                                        onClick={() => deleteProduct(product.productId)}
                                        >
                                        <Delete />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    ))}
                    <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose}>
                        <Alert severity={ alertMessage.severity } sx={{width: "100%"}} > 
                        { alertMessage.message } 
                        </Alert>
                    </Snackbar> 
                </Grid>
            </>
            ) : (
                <Typography color={"blue"} display={"flex"} fontSize={"2vw"} lineHeight={"100%"} justifyContent={"center"}> Inventory is Empty </Typography>
        )}
    </div>
  );
}
export default InventoryManagement;