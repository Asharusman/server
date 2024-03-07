const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt'); 
const db = require("../db")
const { v4: uuidv4 } = require('uuid');
const authTokenRequired = require('../middleware/authTokenRequired');
require('dotenv').config()
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const twilio = require('twilio');
// const { validationResult } = require('express-validator');
function generateRequestId() {
    return uuidv4();
}
router.post('/signup',async(req,res)=>{  
    const requestId = generateRequestId();
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        const profilePic = req.body.profilePic;
        const mobileNumber = req.body.mobileNumber;
        const dateOfBirth = req.body.dateOfBirth;
        const gender = req.body.gender;
        const height = req.body.height;
        const weight = req.body.weight;


        let exist = await db.User.findOne({ where: { email: email } })
        const hash_password = await bcrypt.hash(password, 10);

        const obj = {
            firstName: firstName,
            lastName:lastName, 
            email: email, 
            password: hash_password,
            profilePic:profilePic,
            mobileNumber:mobileNumber,
            dateOfBirth:dateOfBirth,
            gender:gender,
            height:height,
            weight:weight
        }
        if (exist) {
        
            const date = new Date 
            let response = {
                status: "error",
                code:409,
                message:'User Already Exist',
                timestamp:date,
                request_id:requestId

            }
            res.status(409).json(response)

        }
       else{
        if (!firstName ||!lastName || !email || !password ||!profilePic  ||!mobileNumber ||!dateOfBirth ||!gender ||!height ||!weight ) {
            const date = new Date 
            let response = {
                status: "error",
                code:422,
                message:'Enter All Values',
                timestamp:date,
                request_id:requestId

            }
            res.status(422).json(response)
        }
        else if (password.length < 8) {
            const date = new Date 
            let response = {
                status: "error",
                code:401,
                message:'Password cannot be less than 8 characters',
                timestamp:date,
                request_id:requestId

            }
            res.status(401).json(response)
        }
        else {
            let data = await db.User.create(obj)

            let response = {
                status: "success",
                data: data.dataValues,
            }
            res.status(200).json(response)
        }
    }
    }
    catch (err) {
        const date = new Date 
        let response = {
            status: "error",
            code:500,
            message:'Internal Server Error',
            timestamp:date,
            request_id:requestId

        }
        res.status(500).send(response)
    }
})

router.get('/getUserData/:id',authTokenRequired,async(req,res)=>{  
    const requestId = generateRequestId();
    try {
        const userID = req.params.id;

        let userData = await db.User.findOne({ where: { id: userID } })
        
            console.log('userData >> ',userData?.dataValues);
        if (userData){
            let response = {
                status: "success",
                data: userData?.dataValues,
            }
            res.status(200).json(response)
        }
        else{
            const date = new Date 
            let response = {
                status: "error",
                code:404,
                message:'Not Found',
                timestamp:date,
                request_id:requestId
    
            }
            res.status(404).send(response)
        }
    
    }
    catch (err) {
        const date = new Date 
        let response = {
            status: "error",
            code:500,
            message:'Internal Server Error',
            timestamp:date,
            request_id:requestId

        }
        res.status(500).send(response)
    }
})

router.put('/updateUserData/:id',authTokenRequired,async(req,res)=>{  
    const requestId = generateRequestId();
    try {
        const userID = req.params.id;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        const profilePic = req.body.profilePic;
        const mobileNumber = req.body.mobileNumber;
        const dateOfBirth = req.body.dateOfBirth;
        const gender = req.body.gender;
        const height = req.body.height;
        const weight = req.body.weight;

        
        let exist = await db.User.findOne({ where: { id: userID } })
        const hash_password = await bcrypt.hash(password, 10);

        const obj = {
            firstName: firstName,
            lastName:lastName, 
            email: email, 
            password: hash_password,
            profilePic:profilePic,
            mobileNumber:mobileNumber,
            dateOfBirth:dateOfBirth,
            gender:gender,
            height:height,
            weight:weight
        }
       
        if (!firstName ||!lastName || !email || !password ||!profilePic  ||!mobileNumber ||!dateOfBirth ||!gender ||!height ||!weight ) {
            const date = new Date 
            let response = {
                status: "error",
                code:422,
                message:'Enter All Values',
                timestamp:date,
                request_id:requestId

            }
            res.status(422).json(response)
        }
        else if (password.length < 8) {
            const date = new Date 
            let response = {
                status: "error",
                code:401,
                message:'Password cannot be less than 8 characters',
                timestamp:date,
                request_id:requestId

            }
            res.status(401).json(response)
        }
        else {
            // console.log(obj);
            if (exist){
                let data = await db.User.update(obj,{ where: { id: userID } })

                let response = {
                    status: "success",
                }
                res.status(200).json(response)
            }
            else{
                const date = new Date 
                let response = {
                    status: "error",
                    code:404,
                    message:'Not Found',
                    timestamp:date,
                    request_id:requestId
        
                }
                res.status(404).send(response)
            }
        }
    }
    
    catch (err) {
        const date = new Date 
        let response = {
            status: "error",
            code:500,
            message:'Internal Server Error',
            timestamp:date,
            request_id:requestId

        }
        res.status(500).send(response)
    }
})



router.delete('/deleteUserData/:id',authTokenRequired,async(req,res)=>{  
    const requestId = generateRequestId();
    try {
       
        const userID = req.params.id;

        let exist = await db.User.findOne({ where: { id: userID } })
        if (exist){
             db.User.destroy({ where: { id: userID } })
            let response = {
                status: "success"
            }
            res.status(200).json(response)
        }
        else{
            const date = new Date 
            let response = {
                status: "error",
                code:404,
                message:'Not Found',
                timestamp:date,
                request_id:requestId
    
            }
            res.status(404).send(response)
        }
    }
    catch (err) {
        const date = new Date 
        let response = {
            status: "error",
            code:500,
            message:'Internal Server Error',
            timestamp:date,
            request_id:requestId

        }
        res.status(500).send(response)
    }
})

router.post('/signin',async(req,res)=>{
    const requestId = generateRequestId();
    try{
        
    const{email,password}=req.body;
    if(!email || !password){
        
        const date = new Date 
            let response = {
                status: "error",
                code:422,
                message:'Enter All Values',
                timestamp:date,
                request_id:requestId

            }
            res.status(422).json(response)
    }
    else{
    const savedUser = await db.User.findOne({where:{email:email}})
    if(!savedUser){
        const date = new Date 
            let response = {
                status: "error",
                code:422,
                message:'invalid credentials',
                timestamp:date,
                request_id:requestId

            }
            res.status(422).json(response)
    }
    else{
        bcrypt.compare(password,savedUser.password,(err,result)=>{
            if(result){
                const token = jwt.sign({_id:savedUser._id},process.env.jwt_secret, { expiresIn: '2h' });
                let response = {
                    status: "success",
                    data:{
                        token:token
                    }
                }
                res.status(200).json(response)
            }
            else{
                const date = new Date 
                let response = {
                    status: "error",
                    code:422,
                    message:'invalid credentials',
                    timestamp:date,
                    request_id:requestId
    
                }
                res.status(422).json(response)
            }
        })
    }
}
    }
    catch(err){
        const date = new Date 
        let response = {
            status: "error",
            code:500,
            message:'Internal Server Error',
            timestamp:date,
            request_id:requestId

        }
        res.status(500).send(response)
    }
})



// // Google OAuth configuration

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK_URL
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // Use profile information to create or authenticate user in your database
//     // You can use `profile.emails[0].value` for the email address
//     // Save user data to your database and generate a token
//     // Call done() with the user object or an error
//   }
// ));

// // Facebook OAuth configuration

// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: process.env.FACEBOOK_CALLBACK_URL
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // Similar to Google authentication, use profile information to create or authenticate user
//     // Save user data to your database and generate a token
//     // Call done() with the user object or an error
//   }
// ));

// // Initialize passport and set up session management

// router.use(passport.initialize());
// router.use(passport.session());

// // ... (your existing code)

// // Route for Google authentication
// router.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// router.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect or respond with a token
//     res.redirect('/');
//   }
// );

// // Route for Facebook authentication
// router.get('/auth/facebook',
//   passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
// );

// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect or respond with a token
//     res.redirect('/');
//   }
// );

// // Route for mobile number with OTP (using Twilio)
// router.post('/auth/mobile', async (req, res) => {
//   const { mobileNumber } = req.body;
//   const otp = generateOTP(); // Implement a function to generate OTP

//   // Send OTP to the user's mobile number using Twilio
//   const twilioClient = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
//   try {
//     await twilioClient.messages.create({
//       to: mobileNumber,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       body: `Your OTP for authentication is: ${otp}`
//     });
//     res.status(200).json({ message: 'OTP sent successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to send OTP' });
//   }
// });

module.exports = router ;