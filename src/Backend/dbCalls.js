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

app.get("/getAllProducts", (req, res) => {
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


app.get("/getShirts", (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const query = "SELECT * from Products where categories like '%Shirts%' AND tempStockLevel > 0";

    dbConnection.query(query, (err, data) => {
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

app.get("/getBoots", (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const query = "SELECT * from Products where categories like '%Boots%' AND tempStockLevel > 0";

    dbConnection.query(query, (err, data) => {
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

    let query = `SELECT IFNULL(quantity, 0) AS quantity FROM basket WHERE userId = ? AND productId = ?`;
    let queryParams = [userId, productId]

    dbConnection.query(query, queryParams, (err, data) => {
        if (err){
            res.status(400).send(err)
        }
        else{ 
            if (data.length === 0){
                let insertQuery = `INSERT INTO basket (userId, productId, quantity) VALUES (?, ?, ?)`;
                let insertParams = [userId, productId, quantity]
                dbConnection.query(insertQuery, insertParams, (err, data) => {
                    if (err){
                        res.status(400).send(err)
                    }
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
                let newQuantity = data[0].quantity + quantity;
                let updateQuery = `UPDATE basket SET quantity = ? WHERE userId = ? AND productId = ?`;
                let updateParams = [newQuantity, userId, productId];
                dbConnection.query(updateQuery, updateParams, (err, data) => {
                    if (err){
                        res.status(400).send(err);
                    } else {
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

app.get('/admin/getTransactionHistory', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    let query = 'SELECT * from transactionhistory';

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