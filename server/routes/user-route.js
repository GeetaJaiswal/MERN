const express = require("express");
const router = express.Router();
const User = require('../schema/user-schema');
const bcrypt = require('bcrypt');

//user registration
router.post('/register', async(req,res) => {
    try {
        
        const { name, email, contact, password, cpassword, location } = req.body;

        if(!name || !email || !contact || !password || !cpassword || !location)
        {
            return res.status(204).json({
                error: "Please fill all the fields"
            })
        }
    
        if(password != cpassword)
        {
            return res.status(404).json({
                error: "Passwords are not same "
            })
        }

        const emailExists = await User.findOne({email:email});
        if(emailExists)
        {
            return res.status(403).json({
                error: "User already exists"
            })
        }
        else
        {
            const user = new User({
                name:name,
                email:email,
                contact:contact,
                password:password,
                location:location,
            });
            
            //bcrypt password hashing

            const userRegistered = await user.save();
            if(userRegistered)
            {
                return res.status(200).json({
                    message: "user registered successfully"
                })
            }
            else
            {
                return res.status(500).json({
                    error: "failed to register"
                })
            }
        }

    }
    catch(e) {
        res.status(500).json(`Error while user registration ${e}`);
    }
})



//login
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password)
        {
            return res.status(204).json({
                error: "fill both the fields"
            })
        }

        const emailExists = await User.findOne({email:email});
        // console.log(emailExists);

        // hashing matching
        if(emailExists)
        {
            const isMatch = await bcrypt.compare(password, emailExists.password);
            // jwt token step1
            const token = await emailExists.generateAuthToken();
            // console.log(token);
            
            // saving into cookie step3
            res.cookie("jwt",token, {
                expires: new Date(Date.now()+11343545455),
                httpOnly:true //http protocol
            });

            if(!isMatch)
            {
                return res.status(400).json({
                    error: "Invalid Details"
                })
            }
            else
            {
                return res.status(200).json({
                    message: "Login Successfully"
                })
            }
        }
        else
        {
            return res.status(403).json({
                error: "user not registered yet"
            }) 
        }
        

    } catch(e){
        console.log(`while login ${e}`);
    }
})

module.exports = router;