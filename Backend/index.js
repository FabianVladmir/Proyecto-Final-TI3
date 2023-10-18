import express  from "express";
import dotenv from "dotenv";


import connectionDB from "./config/db.js";


const PORT = process.env.PORT || 4000

// read enviorment variables
dotenv.config();
const app = express();

connectionDB();



app.use('/', (req,res) => {
    res.send("Hola pepepe");
});

app.listen(PORT, () => {
    console.log(`Funcionando en el puerto ${PORT}`);
});