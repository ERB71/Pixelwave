import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";


function TransactionHistory(){
    const [historyData, setHistoryData] = useState([]);

    const getTransactionHistory = async () => {
        const historyQuery = await axios.get(`http://localhost:3001/admin/getTransactionHistory`);
        const history = historyQuery.data;
        setHistoryData(history);
    }
    useEffect(() => {
        getTransactionHistory();
    }, []);
   
    return(
        <div>
            <Typography variant="h1" fontSize={"3vw"} textAlign={"center"} backgroundColor={"blue"} color={"white"} border={"2px solid red"}> Transaction History </Typography>
            {historyData.length > 0 ? (
                <>
                    <Grid container width = "98%" margin="1%">
                        <Grid item xs={12} >
                            <Grid container justifyContent="space-between" borderBottom = "1px solid blue">
                                <Grid item xs={4}>
                                    <Typography variant="h1" fontSize={"3vw"} align="center">Transaction ID</Typography>
                                </Grid>
                                <Grid item xs={4} borderLeft = "1px solid blue" borderRight ={"1px solid blue"}>
                                    <Typography variant="h1" fontSize={"3vw"} align="center">User ID</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h1" fontSize={"3vw"} align="center">Total</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                
                        {historyData.map((transaction) => (   
                            <Grid item xs={12} key={transaction.id}>
                                <Grid container justifyContent="space-between">
                                <Grid item xs={4} >
                                    <Typography variant="h1" fontSize={"3vw"} align="center">{transaction.transactionId}</Typography>
                                </Grid>
                                <Grid item xs={4} borderLeft = "1px solid blue" borderRight ={"1px solid blue"}>
                                    <Typography variant="h1" fontSize={"3vw"} align="center">{transaction.userId}</Typography>
                                </Grid>
                                <Grid item xs={4} >
                                    <Typography variant="h1" fontSize={"3vw"} align="center">£{transaction.total.toFixed(2)}</Typography>
                                </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </>
            ) : (
                <Typography variant="h1" fontSize={"2vw"} align="center" margin={"1%"}> No Transaction History To Display </Typography>
            )}
        </div>
    )
}
export default TransactionHistory;