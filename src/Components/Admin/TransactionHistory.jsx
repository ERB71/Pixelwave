import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";

function TransactionHistory(){
    //Variable that determining if there is a transaction history to display
    const [historyData, setHistoryData] = useState([]);

    const getTransactionHistory = async () => {
        try {
          // Query to get transaction history
          const historyQuery = await axios.get(`http://localhost:3001/admin/getTransactionHistory`);
      
          // Iterate through the history data and fetch email addresses for each userId
          const historyData = historyQuery.data;
          for (const transaction of historyData) {
            const userId = transaction.userId;
            const emailQuery = await axios.get(`http://localhost:3001/admin/getUserEmail?userId=${userId}`);
            transaction.email = emailQuery.data.emailAddress;
          }
      
          setHistoryData(historyData);
        } catch (error) {
          console.error(error);
        }
      }      
    useEffect(() => {
        getTransactionHistory();
    }, []);
   
    //Depending on the value of historyData, either the transaction history is displayed, or a message is shown explaining that there are no transactions to display
    return(
        <div>
            <Typography variant="h1" fontSize={"3vw"} textAlign={"center"} backgroundColor={"blue"} color={"white"} border={"2px solid red"}> Transaction History </Typography>
            {historyData.length > 0 ? (
                <>
                    <Grid container width = "98%" margin="1%">
                        <Grid item xs={12} >
                            <Grid container justifyContent="space-between" borderBottom = "1px solid blue">
                                <Grid item xs={6}>
                                    <Typography variant="h1" fontSize={"3vw"} align="center">User</Typography>
                                </Grid>
                                <Grid item xs={3} borderLeft = "1px solid blue" borderRight ={"1px solid blue"}>
                                    <Typography variant="h1" fontSize={"3vw"} align="center">Total</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h1" fontSize={"3vw"} align="center">Date</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                
                        {historyData.map((transaction) => (   
                            <Grid item xs={12} key={transaction.id}>
                                <Grid container justifyContent="space-between">
                                    <Grid item xs={6} >
                                        <Typography variant="h1" fontSize={"3vw"} align="center">{transaction.email}</Typography>
                                    </Grid>
                                    <Grid item xs={3} borderLeft = "1px solid blue" borderRight ={"1px solid blue"}>
                                        <Typography variant="h1" fontSize={"3vw"} align="center">£{transaction.total.toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Typography variant="h1" fontSize={"3vw"} align="center">{transaction.transactionDate}</Typography>
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