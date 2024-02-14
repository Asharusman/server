const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt'); 
const db = require("../db")
require('dotenv').config()
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const twilio = require('twilio');
// const { validationResult } = require('express-validator');

router.post('/signup',async(req,res)=>{  

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
            res.status(401).json({ message: "User Already Exist" })

        }
       else{
        if (!firstName ||!lastName || !email || !password ||!profilePic  ||!mobileNumber ||!dateOfBirth ||!gender ||!height ||!weight ) {
           
            res.status(401).json({ message: "Enter All Values" })
        }
        else if (password.length < 8) {
            
            res.status(401).json({ message: "Password cannot be less than 8 characters" })
        }
        else {
            // console.log(obj);
            let data = await db.User.create(obj)

            let response = {
                message: "Successful",
                data: data.dataValues,
            }
            res.status(200).json(response)
        }
    }
    }
    catch (err) {
        res.status(500).send({error:"Internal Server Error"})
    }
})

router.get('/getUserData/:id',async(req,res)=>{  

    try {
        const userID = req.params.id;

        let userData = await db.User.findOne({ where: { id: userID } })
        
            // console.log('userData >> ',userData?.dataValues);

            let response = {
                message: "Successful",
                data: userData?.dataValues,
            }
            res.status(200).json(response)
        
    
    }
    catch (err) {
        // console.log('err >> ',err)
        res.status(500).send({error:"Internal Server Error"})
    }
})

router.put('/updateUserData/:id',async(req,res)=>{  

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
           
            res.status(401).json({ message: "Enter All Values" })
        }
        else if (password.length < 8) {
            
            res.status(401).json({ message: "Password cannot be less than 8 characters" })
        }
        else {
            // console.log(obj);
            
            let data = await db.User.update(obj,{ where: { id: userID } })

            let response = {
                message: "Successful",
                data: data.dataValues,
            }
            res.status(200).json(response)
        }
    }
    
    catch (err) {
        // console.log('err >> ',err)
        res.status(500).send({error:"Internal Server Error"})
    }
})



router.delete('/deleteUserData/:id',async(req,res)=>{  

    try {
       
        const userID = req.params.id;

        db.User.destroy({ where: { id: userID } })
       

            let response = {
                message: "Successfully Deleted",
            }
            res.status(200).json(response)
        
    }
    catch (err) {
        res.status(500).send({error:"Internal Server Error"})
    }
})

router.post('/signin',async(req,res)=>{
  
    console.log(req.body);
    
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(400).send({error:"Fill all fields"})
    }

    const savedUser = await db.User.findOne({email:email})
    if(!savedUser){
        return res.status(422).send({error:"inavlid credentials"})
    }
    try{
        bcrypt.compare(password,savedUser.password,(err,result)=>{
            if(result){
                const token = jwt.sign({_id:savedUser._id},process.env.jwt_secret, { expiresIn: '2h' });
                
                    res.send({token})
            }
            else{
                return res.status(422).send({error:"inavlid credentials"})
            }
        })
    }
    catch(err){
        res.status(500).send({error:"Internal Server Error"})
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