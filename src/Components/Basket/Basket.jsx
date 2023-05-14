import React, { useEffect, useState } from "react";
import { Alert, Box, Grid, Card, CardContent, CardMedia, Snackbar, Typography, Button } from "@mui/material";
import { Add, Delete, Remove } from '@material-ui/icons';
import axios from "axios";
import "./Basket.css"

function BasketContent() {
    const [basketData, setBasketData] = useState(null);
    const [updatedProducts, setUpdatedProducts] = useState([]);
    const [basketTotal, setBasketTotal] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(4.99);
    const [orderTotal, setOrderTotal] = useState(0);

    const [alertMessage, setAlertMessage] = useState({ severity: "success", message: "Placeholder" });
    const [alertOpen, setAlertOpen] = useState(false);

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setAlertOpen(false)
    }

    //Query to retrieve the contents of the user's basket
    const getBasket = async () => {
        try {
            const userIdQuery = await axios.get(
                `http://localhost:3001/user/getUserId?emailAddress=${localStorage.getItem("email")}`
            );
            const userId = userIdQuery.data[0].userId;

            //This query gets the basket contents for the corresponding user
            const basketQuery = await axios.get(`http://localhost:3001/basket/getBasket?userId=${userId}`);
            const basketItems = basketQuery.data;
        
            const updatedProducts = [];
            let basketTotal = 0;
        
            //This loop is then used to convert each productId retrieved into an actual product to be displayed
            for (let i = 0; i < basketItems.length; i++) {
                const item = basketItems[i];
                const productId = item.productId;
                const quantity = item.quantity;
        
                try {
                    //  make a request to retrieve the product details
                    const productQuery = await axios.get(`http://localhost:3001/getSpecificProduct/${productId}`);
                    const product = productQuery.data[0];
            
                    // calculate the updated price
                    const totalPrice = product.price * quantity;
            
                    // push the updated product to the temporary array (temp array needed as it was causing each item to display twice)
                    updatedProducts.push({
                        ...product,
                        quantity,
                        productId
                    });
            
                    // add the price of this item to the basketTotal
                    basketTotal += totalPrice;
                }
                catch (error) {
                    console.log("Basket Could Not Be Retrieved", error);
                }
            }
            setUpdatedProducts(updatedProducts);
            setBasketData(basketQuery.data);

            // update the basketTotal state after all products have been processed
            setBasketTotal(basketTotal.toFixed(2));
            determineDeliveryCost(basketTotal)
        } 
        catch (error) {
        if (error.response.status === 404) {
            console.log("Basket is Empty");
        } else {
            console.log(error);
        }
        }
    };
    useEffect(() => {
        getBasket();
    }, []);


    //Function to reduce the number of items in the basket
    const decrementBasketItem = async (id, quantity) => {
        try {
            const userIdQuery = await axios.get(
                `http://localhost:3001/user/getUserId?emailAddress=${localStorage.getItem("email")}`
            );
            const userId = userIdQuery.data[0].userId;
            //This query is the one that reduces the quantity. On the backend, there is a check that is perfomred if the quantity reaches 0. If this occurs, the tem is removed from the basket
            await axios.post(`http://localhost:3001/basket/reduceCount`, {
                userID: userId,
                productID: id,
                quantity: (quantity - 1),
            });
            setAlertMessage({ severity: "success", message: "Basket Updated" });
            getBasket();
            setAlertOpen(true);
        } catch {
            setAlertMessage({ severity: "error", message: "Error Updating Basket"})
            setAlertOpen(true);
        }
    };

    //Function to increase the quantity of an item in a user's basket by one
    const incrementBasketItem = async (id, quantity) => {
        try{
            const userIdQuery = await axios.get(
                `http://localhost:3001/user/getUserId?emailAddress=${localStorage.getItem("email")}`
            );
            const userId = userIdQuery.data[0].userId;
            const updatedQuantity = quantity + 1;
            const updateQuery = await axios.post(`http://localhost:3001/basket/increaseCount`, {
                userID: userId,
                productID: id,
                quantity: updatedQuantity,
            });
            let stockLevel = updateQuery.data[0].tempStockLevel;
            console.log(stockLevel);

            //Based uponthe response of the query, the basket quantity is either incremented, or - if the maximum number is already included - the quantity is reduced again and the user has the reason for this explained
            if (stockLevel === 0) {
                decrementBasketItem(id, updatedQuantity);
                setAlertMessage({ severity: "info", message: "Maximum Number of Items Already in Basket" });
            } else {
                setAlertMessage({ severity: "success", message: "Basket Updated" });
                getBasket();
                setAlertOpen(true);
            }
        } catch {
            setAlertMessage({ severity: "error", message: "Error Updating Basket"})
        };
    }

    //Function which removes an item from a users basket
    const deleteBasketItem = async (id) => {
        try{
            //Queryto retrieve the user's ID using the email address stored in browser storage
            const userIdQuery = await axios.get(
                `http://localhost:3001/user/getUserId?emailAddress=${localStorage.getItem("email")}`
            );
            const userId = userIdQuery.data[0].userId;
            //Query to remove the item the correct user's item basket
            await axios.post(`http://localhost:3001/basket/deleteBasketItem`, {
                userID: userId,
                productID: id,
            });
            setAlertMessage({ severity: "success", message: "Item Successfully Removed From Basket" });
            getBasket();
            
        } catch {
            setAlertMessage({ severity: "error", message: "Error Updating Basket"})
        };
    }

    //Function that determines the delivery cost based upon the basket's value
    const determineDeliveryCost = async(basketTotal) => {
        let newDeliveryFee = 4.99
        if (basketTotal > 49.99){
            newDeliveryFee = 0
        }
        setDeliveryFee(newDeliveryFee);
        setOrderTotal((basketTotal + newDeliveryFee).toFixed(2));
    };
    useEffect(() => {
        getBasket();
    }, []);

    return (
        <div>
        {basketData ? (
            <>
                <Typography color={"blue"} display={"flex"} fontSize={"3vw"} marginLeft={"1%"} marginTop={"1%"}> Your Basket </Typography>
                <Box sx={{ display: "flex", marginBottom: "5px"}}>
                    <Grid item xs={8} width={"65%"} sx={{ display: "flex", flexWrap: "wrap", "& > *": { m: 1 } }}>
                        {updatedProducts.map((product) => (   
                        <Grid item key={product.id} xs={12} sm={6} md={4} marginTop = {"1.6%"}  marginLeft = {"1%"} border={"2px solid red"}>
                            <Card sx={{ variant: "outlined", display: "flex", overflow: "hidden", width: "100%" }}>
                            <CardMedia
                                component="img"
                                sx={{
                                width: "40%",
                                objectFit: "fill",
                                }}
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                <Typography variant="h1" fontSize={"3vw"} textAlign={"Right"}>
                                {product.name}
                                </Typography>
                                <Typography variant="h1" fontSize={"2vw"} textAlign={"Right"}>
                                {product.colours}
                                </Typography>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Button sx={{ backgroundColor: 'white', color: 'blue', minWidth: "0px", 
                                        "& .MuiSvgIcon-root": { fontSize: '1.5rem'}
                                        }}
                                        onClick={() => decrementBasketItem(product.productId, product.quantity)}
                                        >
                                        <Remove />
                                    </Button>

                                    <Typography variant="h1" fontSize={"2.5vw"} textAlign={"Right"}>
                                        {product.quantity}
                                    </Typography>

                                    <Button sx={{ backgroundColor: 'white', color: 'blue', minWidth: "0px",
                                        "& .MuiSvgIcon-root": { fontSize: '1.5rem'}
                                        }}
                                        onClick={() => incrementBasketItem(product.productId, product.quantity)}
                                        >
                                        <Add />
                                    </Button>

                                    <Button sx={{ backgroundColor: 'white', color: 'blue', minWidth: "0px", 
                                        "& .MuiSvgIcon-root": { fontSize: '1.5rem'}
                                        }}
                                        onClick={() => deleteBasketItem(product.productId)}
                                        >
                                        <Delete />
                                    </Button>
                                </div>
                                <br />
                                <Typography variant="h1" fontSize={"2.5vw"} textAlign={"Right"}>
                                Total Price: £{(product.quantity * product.price).toFixed(2)}
                                </Typography>
                                <br />
                            </CardContent>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>

                    <Grid item xs={4} height={"fit-content"} width={"35%"} margin={"1%"} border={"2px solid blue"} >
                        <Typography variant="h1" fontSize={"3.5vw"} textAlign={"center"}>
                            Order Summary
                        </Typography>
                        <div style={{ display: "flex", justifyContent: "space-between", margin: "3%" }}>
                            <Typography variant="h1" fontSize={"2.5vw"}>
                                Item Total:
                            </Typography>
                            <Typography variant="h1" fontSize={"2.5vw"} textAlign={"right"}>
                                £{basketTotal}
                            </Typography>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", margin: "3%" }}>
                            <Typography variant="h1" fontSize={"2.5vw"}>
                                Delivery Fee:
                            </Typography>
                            <Typography variant="h1" fontSize={"2.5vw"} textAlign={"right"}>
                                £{deliveryFee}
                            </Typography>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", margin: "3%", paddingTop: "3px", borderTop: "1px dashed blue"}}>
                            <Typography variant="h1" fontSize={"2.5vw"} >
                                You Pay:
                            </Typography>
                            <Typography variant="h1" fontSize={"2.5vw"} textAlign={"right"}>
                                £{orderTotal}
                            </Typography>
                        </div>
                        <br />
                        <div style={{ display: "flex", justifyContent: "center", margin: "1%" }}>
                            <Button variant = "contained" sx={{ width: "75%", backgroundColor: 'blue', color: 'white', border: "1px solid red",   
                            "&:hover": { backgroundColor: 'red', border: "1px solid blue"}}}
                            > Checkout </Button>
                        </div>
                    </Grid>
                </Box>
                <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose}>
                    <Alert severity={ alertMessage.severity } sx={{width: "100%"}} > 
                    { alertMessage.message } 
                    </Alert>
                </Snackbar> 
            </>
        ) : (
            <Typography color={"blue"} display={"flex"} fontSize={"2vw"} lineHeight={"100%"} justifyContent={"center"}> Your Basket is Empty </Typography>
        )}
    </div>
  );
}

export default BasketContent;