const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");
app.use(cors());

const userRoute = require('./routes/userRoute');
app.use(express.json());


mongoose.connect(process.env.URL)
.then(()=>{
    console.log("db Connected");
})
.catch((error)=>{
    console.log(error);
})

app.use(userRoute);

app.listen(process.env.PORT,()=>{
    console.log("Server Started");
})