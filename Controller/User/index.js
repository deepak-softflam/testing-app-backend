const express = require('express')
const db = require('../../Database')
const jwt = require('jsonwebtoken')
const timestamp = require('time-stamp');

exports.login=(req,res, next)=>{
  const coll = db.collection('user')
  const query = {email:req.body.email , password:req.body.password}
  coll.findOne({email:req.body.email ,password:req.body.password},(err,data)=>{
   const token = jwt.sign({email:req.body.email, password:req.body.password}, process.env.PRIVATEKEY, {expiresIn:'10m'}) 
    const tokenColl = db.collection('token')
    const myObj = {token: token, timestamp:timestamp('YYYY/MM/DD:mm:ss')}
    tokenColl.insert(myObj ,(err,data)=>{
    })
    res.status(200).json({data:data,assessToekn:token})
  })
}

exports.userList = (req, res, next) => {
   const bb=db.collection('user')
   bb.find({}).toArray((err,data)=>{
      res.status(200).json({
                message:'user working',
                status:data        
      })
   })
  };

  exports.addUser =(req,res,next)=>{
    const bb=db.collection('user')
    const myObj={
      fname:req.body.fname,
      lname:req.body.lname,
      mobile:req.body.mobile,
      email:req.body.email,
      city:req.body.city,
      password:req.body.password,
      status:'',
      timestamp:timestamp('YYYY/MM/DD:mm:ss')
    }
      bb.insert(myObj,(err,data)=>{
        res.json({
          message:'User Added',
          data:data
        })
      })
  }

  exports.logout=(res,req,next)=>{

  }