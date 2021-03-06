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
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        default: Date.now()
    },
    messages: [
        {
                name: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    required: true
                },
                phone: {
                    type: Number,
                    required: true
                },
                message: {
                    type: String,
                    //required: true
                },
        }
    ],
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
        this.cpassword = await bcrypt.hash(this.cpassword,12);
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


//store contact message in model
userSchema.methods.addMessage = async function(name, email, phone, message)
{
    try {
        this.messages= this.messages.concat({name, email, phone, message});
        await this.save();
        return this.messages;
    }catch(e)
    {
        console.log(e);
    }
}



const User = mongoose.model('user', userSchema);

module.exports = User;