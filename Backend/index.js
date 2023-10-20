import express  from "express";
import dotenv from "dotenv";

import stundetRoute from "./routes/studentRoute.js";
import adminRoute from "./routes/adminRoute.js";
import connectionDB from "./config/db.js";


const PORT = process.env.PORT || 4000

// read enviorment variables
dotenv.config();
const app = express();
// indicate we pass JSON files
app.use(express.json());
// conection with the DB
connectionDB();


// redirect all urls
app.use("/api/students", stundetRoute);
app.use("/api/admin", adminRoute);

app.listen(PORT, () => {
    console.log(`Funcionando en el puerto ${PORT}`);
});