const express = require('express');
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

// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({limit:'10mb'}));

app.use(authRoutes);

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

