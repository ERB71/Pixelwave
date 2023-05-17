import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config({ path: "./DEV.env" });

const app = express();
app.use(express.json());
const port = process.env.DATABASE_PORT;

app.use(
    cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
    })
);

//Query that will create a new user when they select the 'register' option on the login page
app.post('/user/register', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })
    
    const emailAddress = req.query.emailAddress;
    const plaintextPassword = req.query.password;

    bcrypt.hash(plaintextPassword, 10, function(err, hashedPassword) {
        if (err) {
          res.status(500).send(err);
        } 
        else {
            let query = `INSERT INTO user (emailAddress, hashedPassword) VALUES (?, ?)`;
            let queryParams = [emailAddress, hashedPassword];
    
            dbConnection.query(query, queryParams, (err, data) => {
                if (err){
                    res.status(400).send(err)
                }
                else{
                    console.log(data)
                    res.status(201).send(data)
                }
                dbConnection.end()
            });
        }
    });
});

//Query that determines if the credentials provided in the login boxes correspond with an user stored in the database
app.get('/user/login', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const emailAddress = req.query.emailAddress;
    const password = req.query.password;

    let query = `SELECT hashedPassword FROM user WHERE emailAddress = ?`;
    let queryParams = [emailAddress];
    
    dbConnection.query(query, queryParams, (err, data) => {
        if (err){
            res.status(404).send(err)
        }
        else if (data.length === 0){
            res.status(404).send("No Users Found")
        }
        else{
            const hashedPassword = data[0].hashedPassword;
            //hashing the password with bcrypt and comparing the value with the one stored in the database for the user with the email address provided
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else if (!result) {
                    res.status(401).send("Password Incorrect");
                } else {
                    res.status(200).send("Login Successful");
                }
            });
        }
        dbConnection.end()
    });
});

//Query to retrieve all products that are in stock and belong to the shirts category 
app.get("/getShirts", (req, res) => {
    const searchTerm = req.query.searchTerm || "";
    const categories = req.query.categories || "";
    const colours = req.query.colours || "";
  
    const dbConnection = mysql2.createPool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
    });
  
    //Base query to retrieve all shirts in stock
    let query = "SELECT * from Products WHERE categories LIKE '%Shirts%' AND categories LIKE ? AND tempStockLevel > 0";
    
    //conditional that determines if the users have applied and additional category filter, which is added to the query if they have
    let params = [`%${categories}%`];
  
    //conditional that determines if the users have searched for anything, which is added to the query if they have
    if (searchTerm !== "") {
      query += " AND name LIKE ?";
      params.push(`%${searchTerm}%`);
    }
  
    //conditional that determines if the users have applied a colour filter, which is added to the query if they have
    if (colours !== "") {
      query += " AND colours LIKE ?";
      params.push(`%${colours}%`);
    }
  
    dbConnection.query(query, params, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
      dbConnection.end();
    });
});

//Query to retrieve all products that are in stock and belong to the boots category 
app.get("/getBoots", (req, res) => {
    const searchTerm = req.query.searchTerm || "";
    const categories = req.query.categories || "";
    const colours = req.query.colours || "";
  
    const dbConnection = mysql2.createPool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
    });
  
    //Base query to retrieve all boots in stock
    let query = "SELECT * from Products WHERE categories LIKE '%Boots' AND categories LIKE ? AND tempStockLevel > 0";
        
    //conditional that determines if the users have applied and additional category filter, which is added to the query if they have
    let params = [`%${categories}%`];

    //conditional that determines if the users have searched for anything, which is added to the query if they have
    if (searchTerm !== "") {
    query += " AND name LIKE ?";
    params.push(`%${searchTerm}%`);
    }

    //conditional that determines if the users have applied a colour filter, which is added to the query if they have
    if (colours !== "") {
    query += " AND colours LIKE ?";
    params.push(`%${colours}%`);
    }
    
    dbConnection.query(query, params, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
      dbConnection.end();
    });
});

//Query to retrieve a specific product when it is clicked on from the corresponding item page 
app.get("/getSpecificProduct/:id", (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })
    
    const query = "SELECT * from Products where productID = ?";
    const queryParams = [req.params.id];
    
    dbConnection.query(query, queryParams, (err, data) => {
        if (err){
            res.status(404).send(err);
        }
        else{
            console.log(data);
            res.status(200).send(data);
        }
        dbConnection.end();
    });
});

//Query to retrieve the userID of an account based upon the email address provided (which is stored in the browser's local sotrage on the front end)
app.get('/user/getUserId', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })
    let query = `SELECT userId FROM user WHERE emailAddress = ?`;
    let queryParam = req.query.emailAddress;

    dbConnection.query(query, queryParam, (err, data) => {
        if (err){
            res.status(404).send(err);
        }
        else{
            console.log(data);
            res.status(200).send(data);
        }
        dbConnection.end();
    })
});

//Query to retrieve the role (general or admin) of an account based upon the email address provided
app.get('/user/getRole', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })
    let query = `SELECT role FROM user WHERE emailAddress = ?`;
    let queryParam = req.query.emailAddress;

    dbConnection.query(query, queryParam, (err, data) => {
        if (err){
            res.status(404).send(err);
        }
        else{
            console.log(data);
            res.status(200).send(data);
        }
        dbConnection.end();
    })
});

//Query to get the temporary stock level of an item
app.get('/getTempStockLevel', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    let query = 'SELECT tempStockLevel FROM products WHERE productId = ?';
    let queryParam = req.query.productId;

    dbConnection.query(query, queryParam, (err, data) => {
        if (err){
            res.status(404).send(err);
        }
        else{
            console.log("tempStockLevel:", data);
            res.status(200).send(data);
        }
        dbConnection.end();
    })
})

//Query to retrieve the basket of a user
app.get('/basket/getBasket', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    let query = `SELECT productId, quantity FROM basket WHERE userId = ?`;
    let queryParams = req.query.userId;

    dbConnection.query(query, queryParams, (err, data) => {
        if (err){
            res.status(500).send(err);
        }
        else if (data.length === 0){
            res.status(404).send()
        }
        else{
            console.log(data)
            res.status(200).send(data)
        }
        dbConnection.end();
    });
});

//Query that updates a user's basket
app.post('/basket/updateBasket', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const userId = req.body["userID"];
    const productId = req.body["productID"]
    const quantity = req.body["quantity"]

    //This query checks to see whether the product already exists in the users basket
    let query = `SELECT IFNULL(quantity, 0) AS quantity FROM basket WHERE userId = ? AND productId = ?`;
    let queryParams = [userId, productId]

    dbConnection.query(query, queryParams, (err, data) => {
        if (err){
            res.status(400).send(err)
        }
        else{ 
            //If the product isn't already in the basket, it is inserted into it
            if (data.length === 0){
                let insertQuery = `INSERT INTO basket (userId, productId, quantity) VALUES (?, ?, ?)`;
                let insertParams = [userId, productId, quantity]
                dbConnection.query(insertQuery, insertParams, (err, data) => {
                    if (err){
                        res.status(400).send(err)
                    }
                    //Check to see if there is the maximum number already in the basket
                    else{
                        let currentStockLevel = `SELECT stockLevel FROM products WHERE productId = ${productId}`;
                        dbConnection.query(currentStockLevel, (err, data) => {
                        if (err) {
                            res.status(400).send(err)
                        } 
                        else {
                            let stockLevel = data[0].stockLevel;
                            let newStockLevel = stockLevel - quantity;
                            let updateStockLevelQuery = `UPDATE products SET tempStockLevel = ${newStockLevel} where productId = ${productId}`;
                            dbConnection.query(updateStockLevelQuery, (err, data) => {
                                if (err) {
                                    res.status(400).send(err)
                                } 
                                else {
                                    console.log(data)
                                    res.status(201).send(data)
                                }
                            })
                        }});
                    }
                })
            }
            else{
                //If the product is already in the basket, the quantity value is updated 
                let newQuantity = data[0].quantity + quantity;
                let updateQuery = `UPDATE basket SET quantity = ? WHERE userId = ? AND productId = ?`;
                let updateParams = [newQuantity, userId, productId];
                dbConnection.query(updateQuery, updateParams, (err, data) => {
                    if (err){
                        res.status(400).send(err);
                    } 
                    //Check to see if there is the maximum number already in the basket
                    else {
                        let currentStockLevelQuery = `SELECT stockLevel FROM products WHERE productId = ${productId}`;
                        dbConnection.query(currentStockLevelQuery, (err, currentStockLevelData) => {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                let currentStockLevel = currentStockLevelData[0].stockLevel;
                                let newStockLevel = currentStockLevel - newQuantity;
                                let updateStockLevelQuery = `UPDATE products SET tempStockLevel = ${newStockLevel} where productId = ${productId}`;
                                dbConnection.query(updateStockLevelQuery, (err, data) => {
                                    if (err) {
                                        res.status(400).send(err);
                                    } else {
                                        console.log(data);
                                        res.status(202).send(data);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
});

//Query to reduce the quantity of the referenced item in a user's basket by 1
app.post('/basket/reduceCount', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const userId = req.body["userID"];
    const productId = req.body["productID"]
    let quantity = req.body["quantity"]

    let currentStockLevelQuery = `SELECT stockLevel FROM products WHERE productId = ${productId}`;
    dbConnection.query(currentStockLevelQuery, (err, currentStockLevelData) => {
        let currentStockLevel = currentStockLevelData[0].stockLevel;
        if (err){
            res.status(500).send(err)
        }
        else{
            if (currentStockLevel <= quantity) {
                quantity = currentStockLevel;
                let updateQuery = `UPDATE basket SET quantity = ? WHERE userId = ? AND productId = ?`;
                let updateParams = [quantity, userId, productId];

                dbConnection.query(updateQuery, updateParams, (err, data) => {
                    if (err){
                        res.status(400).send(err);
                    } else {
                        let currentStockLevelQuery = `SELECT tempStockLevel FROM products WHERE productId = ${productId}`;
                        dbConnection.query(currentStockLevelQuery, (err, currentStockLevelData) => {
                            let currentTempStockLevel = currentStockLevelData[0].tempStockLevel;
                            if (err) {
                            res.status(400).send(err);
                            } else {
                                let updateStockLevelQuery = `UPDATE products SET tempStockLevel = ${currentTempStockLevel} where productId = ${productId}`;
                                dbConnection.query(updateStockLevelQuery, (err, data) => {
                                    if (err) {
                                        res.status(400).send(err);
                                    } else {
                                        console.log(data);
                                        res.status(200).send(currentStockLevelData);
                                    }
                                });
                            }
                        });
                    }
                });
            }
            else{
                    
                let updateQuery = `UPDATE basket SET quantity = ? WHERE userId = ? AND productId = ?`;
                let updateParams = [quantity, userId, productId];

                dbConnection.query(updateQuery, updateParams, (err, data) => {
                    if (err){
                        res.status(400).send(err);
                    } else {
                        let currentStockLevelQuery = `SELECT tempStockLevel FROM products WHERE productId = ${productId}`;
                        dbConnection.query(currentStockLevelQuery, (err, currentStockLevelData) => {
                            let currentTempStockLevel = currentStockLevelData[0].tempStockLevel;
                            if (err) {
                            res.status(400).send(err);
                            } else {
                                let newStockLevel = currentTempStockLevel + 1;
                                let updateStockLevelQuery = `UPDATE products SET tempStockLevel = ${newStockLevel} where productId = ${productId}`;
                                dbConnection.query(updateStockLevelQuery, (err, data) => {
                                    if (err) {
                                        res.status(400).send(err);
                                    } else {
                                        console.log(data);
                                        res.status(200).send(currentStockLevelData);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
});

//Query to increase the quantity of the referenced item in a user's basket by 1 (up to the maximum allowed, which is detereined by the tempStockLevel of the referenced product)
app.post('/basket/increaseCount', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const userId = req.body["userID"];
    const productId = req.body["productID"]
    const quantity = req.body["quantity"]

    console.log(productId)

    let updateQuery = `UPDATE basket SET quantity = ? WHERE userId = ? AND productId = ?`;
    let updateParams = [quantity, userId, productId];

    dbConnection.query(updateQuery, updateParams, (err, data) => {
        if (err){
            res.status(400).send(err);
        } else {
            let currentStockLevelQuery = `SELECT tempStockLevel FROM products WHERE productId = ${productId}`;
            dbConnection.query(currentStockLevelQuery, (err, currentStockLevelData) => {
                let currentStockLevel = currentStockLevelData[0].tempStockLevel;
                if (err) {
                    res.status(400).send(err);
                } else if (currentStockLevel < 1) {
                    res.status(200).send(currentStockLevelData)
                }
                else{
                    let newStockLevel = currentStockLevel - 1
                    let updateStockLevelQuery = `UPDATE products SET tempStockLevel = ${newStockLevel} where productId = ${productId}`;
                    dbConnection.query(updateStockLevelQuery, (err, data) => {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            console.log(data);
                            res.status(200).send(currentStockLevelData);
                        }
                    });
                }
            });
        }
    });
});

//Query to remove an item from a user's item
app.post('/basket/deleteBasketItem', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const userId = req.body["userID"];
    const productId = req.body["productID"]

    let basketQuery = `delete from basket where userId = ${userId} and productId = ${productId}`;
    dbConnection.query(basketQuery, (err, data) => {
        if (err){
            res.status(500).send(err);
        }
        else{
            let currentStockLevelQuery = `SELECT stockLevel FROM products WHERE productId = ${productId}`;
            dbConnection.query(currentStockLevelQuery, (err, currentStockLevelData) => {
                if (err){
                    res.status(500).send(err);
                }
                else{
                    let currentStockLevel = currentStockLevelData[0].stockLevel;

                    let productsQuery = `update products set tempStockLevel = ${currentStockLevel} where productId = ${productId}`
                    dbConnection.query(productsQuery, (err, data) => {
                        if (err){
                            res.status(500).send(err);
                        }
                        else{
                            res.status(200).send(data)
                        }
                    });
                }
            });
        }
    });
});

//Query to retrieve all products stored in the database so that they be displayed on the admin page
app.get("/admin/getAllProducts", (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const query = "SELECT * from Products";

    dbConnection.query(query, (err, data) => {
        if (err){
            res.status(404).send(err);
        }
        else{
            console.log(data);
            res.status(200).send(data);
        }
    });
});

//Query to update the quantity of the referenced product by 1
app.post('/inventory/updateInventoryQuantity', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const stockLevel = req.body["quantity"]
    const tempStockLevel = req.body["tempQuantity"]
    const productId = req.body["productID"]

    let inventoryQuery = `update products set stockLevel = ?, tempStockLevel = ? where productId = ?`;
    let queryParams = [stockLevel, tempStockLevel, productId]
    dbConnection.query(inventoryQuery, queryParams, (err, data) => {
        if (err){
            res.status(500).send(err);
        }
        else{
            let newQuantity = stockLevel - tempStockLevel;
            let basketQuery = `update basket set quantity = ? where productId = ?`;
            let queryParams = [newQuantity, productId]
            dbConnection.query(basketQuery, queryParams, (err, data) => {
                if (err){
                    res.status(500).send(err);
                }
                else{
                    res.status(200).send(data)   
                }
            });
        }
    });
});

//Query to remove a product from the product table
app.post('/inventory/deleteInventoryItem', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const productId = req.body["productID"]

    let basketQuery = `delete from products where productId = ${productId}`;
    dbConnection.query(basketQuery, (err, data) => {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.status(204).send(data)   
        }
    });
});

//Query to update the transaction history when a user checks out 
app.post('/updateTransactionHistory', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const userId = req.body["userID"]
    const total = req.body["total"]
    const productIds = req.body["productIDs"]

    let query = `Insert INTO transactionhistory (userId, total) values (?, ?)`;
    let queryParams = [userId, total];

    dbConnection.query(query, queryParams, (err, data) => {
        if (err){
            res.status(404).send(err);
        }
        else{
            productIds.forEach((productId) => {
                let stockLevelQuery = `SELECT stockLevel FROM products WHERE productId = ${productId}`;
                dbConnection.query(stockLevelQuery, (err, stockLevelData) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    let currentStockLevel = stockLevelData[0].stockLevel;
                    let quantityQuery = `SELECT quantity FROM basket WHERE productId = ${productId} and userId = ${userId}`
                    dbConnection.query(quantityQuery, (err, quantityData) => {
                        if (err) {
                            res.status(500).send(err);
                        }
                        else{
                            const quantity = quantityData[0].quantity; 
                            const newStockLevel = currentStockLevel - quantity;
                            let productsQuery = `UPDATE products SET stockLevel = ${newStockLevel} WHERE productId = ${productId}`;
                            dbConnection.query(productsQuery, (err, data) => {
                                if (err) {
                                    res.status(500).send(err);
                                } 
                                else {
                                    let basketQuery = `delete from basket where userId = ${userId}`;
                                    dbConnection.query(basketQuery, (err, data) => {
                                        if (err){
                                            res.status(500).send(err)
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
                });
            });
            res.status(200).send(data);
        }
    })
})

//Query to retrieve the transaction history of the application
app.get('/admin/getTransactionHistory', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    let query = `SELECT userId, total, DATE_FORMAT(transactionDate, '%d/%m/%Y %H:%i') as transactionDate from transactionhistory`;

    dbConnection.query(query, (err, data) => {
        if (err){
            res.status(404).send(err);
        }
        else{
            res.status(200).send(data);
        }
        dbConnection.end();
    })
})

//Query to retrieve a user's email address from their userId, for use in generating the transactionHistory
app.get('/admin/getUserEmail', (req, res) => {
    const dbConnection = mysql2.createPool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
    });
  
    const userId = req.query.userId;
    const query = `SELECT emailAddress FROM user WHERE userId = ${userId}`;
  
    dbConnection.query(query, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        if (data.length > 0) {
          res.status(200).send(data[0]);
        } else {
          res.status(404).send("User not found");
        }
      }
      dbConnection.end();
    });
});  


//Query to retrieve all non-admin users
app.get('/admin/getGeneralUsers', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    let query = `SELECT userId, emailAddress from user where role = 'General'`;

    dbConnection.query(query, (err, data) => {
        if (err){
            res.status(404).send(err);
        }
        else{
            res.status(200).send(data);
        }
        dbConnection.end();
    })
})

//Query to upgrade user to the role of admin
app.post('/admin/upgradeUser', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const userId = req.body["userID"] 

    let query = `update user set role = 'admin' where userId = ?`;
    let queryParam = userId;

    dbConnection.query(query, queryParam, (err, data) => {
        if (err){
            res.status(404).send(err);
        }
        else{
            res.status(200).send(data);
        }
        dbConnection.end();
    })
})

//Query to delete user
app.post('/admin/deleteUser', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const userId = req.body["userID"] 

    //Deletes any basket items the user has
    const basketQuery = `delete from basket where userId = ?`;
    const queryParam = userId;

    dbConnection.query(basketQuery, queryParam, (err, data) => {
        if (err){
            res.status(404).send(err);
        }
        else{
            //Deletes user
            const userQuery = `delete from user where userId = ?`;
            dbConnection.query(userQuery, queryParam, (err, data) => {
                if (err){
                    res.status(404).send(err);
                }
                else{
                    res.status(200).send(data);
                }
            });
        }
    })
})

//Query to create an admin account at application startup to ensure that one always exists
app.post('/user/createAdmin', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })
    
    const emailAddress = "admin@Pixelwave.com";
    const plaintextPassword = "admin123";
    const role = "admin"

    bcrypt.hash(plaintextPassword, 10, function(err, hashedPassword) {
        if (err) {
          res.status(500).send(err);
        } 
        else {
            let query = `INSERT Ignore INTO user (emailAddress, hashedPassword, role) VALUES (?, ?, ?)`;
            let queryParams = [emailAddress, hashedPassword, role];
    
            dbConnection.query(query, queryParams, (err, data) => {
                if (err){
                    res.status(400).send(err)
                }
                else{
                    console.log(data)
                    res.status(201).send(data)
                }
                dbConnection.end()
            });
        }
    });
});


app.listen(port, () => {
    console.log("Express Server Listening on Port ", port);
});