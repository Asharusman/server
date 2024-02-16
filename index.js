const express = require('express');
const session = require('express-session');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const mysql = require('mysql')
require('./db')
require('./model/User')
// require('./model/Image')
app.use(bodyParser.json());
const cors = require("cors");
const authRoutes = require('./routes/authRoutes')
const facebookAuthRoutes = require('./routes/facebookAuth')
const googleAuthRoutes = require('./routes/googleAuth')

const passport = require('passport');
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({limit:'10mb'}));

app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

app.use(authRoutes);
app.use('/auth/facebook', facebookAuthRoutes);
app.use('/auth/google', googleAuthRoutes);
// const con =mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'nodemysql'
// })

// con.connect((err)=>{
// if (err){
//     console.log('err in my sql connection >> ',err)
// }
// console.log('connected')
// })

app.get('/',(req,res) =>{
    res.send('req.user')
    console.log(req.user)

});

app.get('/',(req,res) =>{
    res.send('req.user')
    console.log(req.user)

});

app.listen(port , ()=>
    console.log('server runs on port')
);

