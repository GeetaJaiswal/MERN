const express =  require("express");
const app = express();
const db = require("./database/db");
const Router = require("./routes/route");
const userRouter = require("./routes/user-route");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});
require('./database/db');
app.use(express.json());

const port =  process.env.PORT;
app.set('environment', "development");

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

// app.use(bodyParser.json({extended:true}));
// app.use(bodyParser.urlencoded({extended:true}));

app.use(Router);
app.use(userRouter);

app.listen(port, ()=>{
    console.log(`server running at port ${port}`);
})
