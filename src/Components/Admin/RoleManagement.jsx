import React, { useEffect, useState } from "react";
import { Alert, Button, Grid, Snackbar, Typography } from "@mui/material";
import { Delete } from '@material-ui/icons';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import axios from "axios";

function RoleManagement() {
    //Variable that determining if there are any users to display
    const [userData, setUserData] = useState([]);
    const [alertMessage, setAlertMessage] = useState({ severity: "success", message: "Placeholder" });
    const [alertOpen, setAlertOpen] = useState(false);

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
           return;
        }
        setAlertOpen(false)
    }

    const getGeneralUsers = async () => {
        //Query to get all non-admin users
        const userQuery = await axios.get(`http://localhost:3001/admin/getGeneralUsers`);
        setUserData(userQuery.data);
    }
    useEffect(() => {
        getGeneralUsers();
    }, []);


    const promoteUser = async (id) => {
        try{
            //Query to update a user's role to admin
            await axios.post(`http://localhost:3001/admin/upgradeUser`, {
                userID: id
            });
            setAlertMessage({ severity: "success", message: "User Upgraded to Admin" });
            getGeneralUsers();
        }
        catch{
            setAlertMessage({ severity: "error", message: "Issue Encountered While Upgrading User"})
        }
        setAlertOpen(true);
    }

    const deleteUser = async (id) => {
        try{
            //query to delete a user
            await axios.post(`http://localhost:3001/admin/deleteUser`, {
                userID: id
            });
            setAlertMessage({ severity: "success", message: "User Deleted" });
            getGeneralUsers();
        }
        catch{
            setAlertMessage({ severity: "error", message: "Issue Encountered While Deleting User"})
        }
        setAlertOpen(true);
    }


    //Depending on the value of userData, either a list of non-admin users are displayed, or a message is shown explaining that there are no users to display
    return(
        <div>
            <Typography variant="h1" fontSize={"3vw"} textAlign={"center"} backgroundColor={"blue"} color={"white"} border={"2px solid red"}> Role Management </Typography>
            {userData.length > 0 ? (
                <>
                    <Grid container width = "98%" margin="1%">
                        <Grid item xs={12} >
                            <Grid container justifyContent="space-between" borderBottom = "1px solid blue">
                                <Grid item xs={10} borderRight ={"1px solid blue"}>
                                    <Typography variant="h1" fontSize={"3vw"} align="center">Email Address</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h1" fontSize={"3vw"} align="center">Options</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                
                        {userData.map((user) => (   
                            <Grid item xs={12} key={user.id}>
                                <Grid container justifyContent="space-between">
                                    <Grid item xs={10} display = "flex" justifyContent = "center" alignItems = "center" borderRight ={"1px solid blue"}>
                                        <Typography variant="h1" fontSize={"3vw"} >{user.emailAddress}</Typography>
                                    </Grid>
                                    <Grid item xs={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <div>
                                            <Button sx={{ backgroundColor: 'white', color: 'blue', minWidth: "0px", 
                                                "& .MuiSvgIcon-root": { fontSize: '2rem'}
                                                }}
                                                onClick={() => promoteUser(user.userId)}
                                                >
                                                <UpgradeIcon />
                                            </Button>

                                            <Button sx={{ backgroundColor: 'white', color: 'red', minWidth: "0px",
                                                "& .MuiSvgIcon-root": { fontSize: '2rem'}
                                                }}
                                                onClick={() => deleteUser(user.userId)}
                                                >
                                                <Delete />
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
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
                <Typography variant="h1" fontSize={"2vw"} align="center" margin={"1%"}> No Non-Admin Users Found To Display </Typography>
            )}
        </div>
    )
}
export default RoleManagement;