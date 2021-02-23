const db = require('../Database')
const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    //seting up collection value to mongodb 
    const col = db.collection('token')

    //geting auth token from request headers 
    token = req.headers.authorization.substring(7, req.headers.authorization.length);

    // checking jwt token is valid or not 
    jwt.verify(token, process.env.PRIVATEKEY,(err,status)=>{
        if(err) {
            res.status(401).json({message:'token Expire'})
            col.deleteOne({token:token} )
            
        }else{
            //decodeing token for get a user value 
            userCrd =  jwt.decode(token)
            
            //checking token is present in database or not 
            col.findOne({token:token},(err,data)=>{
                console.log('in find')
                if(data){
                    next()
                }else{
                    res.status(401).json({Message:'Unauthorized Acess'})
                }
            })  
        }
    });

}