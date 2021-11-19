const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        default: Date.now()
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
})

//password hashing
userSchema.pre("save", async function(next){
    if(this.isModified("password"))
    {
        // console.log(this.password);
        this.password = await bcrypt.hash(this.password,12);
        // console.log(this.password);
    }
    next();
})


//jwt auth step2
userSchema.methods.generateAuthToken = async function()
{
    try{
        const Token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({
            token:Token
        });
        await this.save();
        return Token;
    }catch(e){
        console.log(e);;
    }
}


const User = mongoose.model('user', userSchema);

module.exports = User;