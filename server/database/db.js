const mongoose = require("mongoose");
const DB = process.env.DATABASE;
console.log("dlknfknk"+  DB);
mongoose.connect("mongodb+srv://geeta:geeta123@cluster0.ilhtn.mongodb.net/Blog?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log(`no connection, error is ${e}`);
})
