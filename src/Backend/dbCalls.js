import express from "express";
import cors from "cors";
import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config({ path: "./DEV.env" });

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.DATABASE_PORT;


app.get("/getProducts", (req, res) => {
    const dbConnection = mysql2.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const query = "SELECT * from Products where StockLevel > 0";

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



app.listen(port, () => {
    console.log("Express Server Listening on Port ", port);
})