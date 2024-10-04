const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectToDb = require('./config/db');
const JWT = require('jsonwebtoken')

// import express from 'express';
// import cores from 'cors';
// import dotenv from 'dotenv';
// import connectToDb from './config/db.js';
// import JWT from 'jsonwebtoken'

//dotenv config
dotenv.config(); 

//db connect
connectToDb();

//REST ovj
const app = express();

//middelwares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//runs on localhost
app.use("/api/v1/auth", require("./routes/authRoutes"))
app.use("/api/v1/user", require("./routes/userRoutes"))
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"))

app.get("/", (req, res) =>{
    return res.status(200).send("<h1> Welcome</h1>");
});
//runs on port
const port = process.env.PORT || 3000;

//listen when the server has started
app.listen(port, () =>{
    console.log(`server running on port ${port}`);
});