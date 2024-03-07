const jwt = require('jsonwebtoken');
const { User } = require('../db');
// const mongoose = require('mongoose');
// const User = mongoose.model('User');

const { v4: uuidv4 } = require('uuid');
function generateRequestId() {
    return uuidv4();
}
module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    const requestId = generateRequestId();
    // console.log(authorization);
    if(!authorization){
        return res.status(401).send({error:"user must be logged in ,key not given"}) 
    }
    const token = authorization.replace("Bearer ","")
    // console.log(to
    
    jwt.verify(token,process.env.jwt_secret,async(error,payload) =>
    {
        if(error){
            const date = new Date 
            let response = {
                status: "error",
                code:403,
                message:'Not Authorized',
                timestamp:date,
                request_id:requestId
    
            }
            return res.status(403).send(response)
        }

        const {_id} = payload
        User.findOne(_id).then(userdata => {
            req.user = userdata
            next();
        }

        )
    })

}