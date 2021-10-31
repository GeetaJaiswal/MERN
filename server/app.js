const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');


dotenv.config({path: './config.env'});

require('./db/conn');

app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT;

app.use(require('./router/auth'));

app.listen(PORT,()=>
console.log(`server running at Port ${PORT}`));
