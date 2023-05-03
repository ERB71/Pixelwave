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

app.get("/getShirts", (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const query = "SELECT * from Products where categories like '%Shirts%' AND StockLevel > 0";

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

    const query = "SELECT * from Products where categories like '%Boots%' AND StockLevel > 0";

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

app.get('/basket/getBasket', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    let query = 'SELECT * FROM basket_items WHERE user_id = ?';
    let queryParams = req.params.userId;

    dbConnection.query(query, queryParams, (err, data) => {
        if (err){
            res.status(404).send(err);
        }
        else{
            console.log(data)
            res.status(200).send(data)
        }
        dbConnection.end();
    });
 });



app.post('/basket/addItem', (req, res) => {
const dbConnection = mysql2.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
})

const userId = req.body["userId"];
const productId = req.body["productId"]
const quantity = req.body["quantity"]

let query = `INSERT INTO basket (userId, productId, quantity) VALUES (?, ?, ?)`;
let queryParams = [userId, productId, quantity]

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
})

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


app.post('/user/createAdmin', (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })
    
    const emailAddress = "admin@localhost";
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