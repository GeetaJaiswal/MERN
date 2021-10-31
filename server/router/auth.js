const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");
const authentication = require('../middleware/authentication');

router.get('/', (req,res) => {
    res.send("Homepage");
})

router.get('/about', authentication, (req, res) => {
    // res.send("About");
    res.send(req.rootUser); //you can see in browsers network
})

router.get('/contact', (req, res) => {
    res.send("Contact");
})


// registeration
router.post('/register', async(req, res) => {
    // console.log(req.body);
    try {
        
        const { name, email, phone, work, password, cpassword } = req.body;

        if(!name || !email || !phone || !work || !password || !cpassword)
        {
            return res.status(204).json({
                error: "Please fill all the fields"
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
                phone:phone,
                work:work,
                password:password,
                cpassword:cpassword
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

    } catch(err) {
        console.log(err);
    }

});


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
            console.log(emailExists);

            // hashing matching
            if(emailExists)
            {
                const isMatch = await bcrypt.compare(password, emailExists.password);
                // jwt token step1
                const token = await emailExists.generateAuthToken();
                console.log(token);
                //saving into cookie step3
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
            console.log(e);
        }
})

//get userdata
router.get('/getData', authentication, (req,res) => {
    res.send(req.rootUser);
})



//save contact data
router.post('/contact', authentication, async (req, res) => {
    console.log(req.body);
    console.log("contact");
    try {
        
        const { name, email, phone, message } = req.body;

        if(!name || !email || !phone || !message)
        {
            return res.status(204).json({error:"Please fill all the fields"});
        }
    
        const userContact = await User.findOne({_id:req.userId});
        console.log(userContact);
        if(userContact)
        {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            console.log(userMessage);
            await userContact.save();
            res.status(201).json({message:"message sent successfully"});
        }

    } catch(err) {
        console.log(err);
    }

});


router.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.status(200).send("user logout");
})

module.exports = router;