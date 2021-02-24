const { ObjectID } = require("mongodb")
const db = require("../../Database/index")
var col= db.collection('moment')

exports.AddMoment =(req,res,next)=>{
    console.log(req.files)
    console.log(req.body)
    const coll= db.collection('moment')
    const myObj ={
        title:req.body.title,
        tag:req.body.tag,
        files:[]
    }
    req.files.map((e,i)=>myObj.files.push({fileName:'file:///F:/development/Backend/testing-app-backend/tmp/'+e.filename,path:e.path}))
    coll.insert(myObj,(err,data)=>{
        res.status(200).json({data:data,message:'Moment Added successfully ..'})
    })
}

exports.GetMomentList =(req,res,next)=>{
    const coll = db.collection('moment')
    coll.find({}).toArray((err,data)=>{
        res.status(200).json(data)
    })
}

exports.UpdateMoment=(req,res,next)=>{
    const coll = db.collection('moment')
    const myObj ={
        title:req.body.title,
        tag:req.body.tag,
        files:[]
    }
    req.files.map((e,i)=>myObj.files.push({fileName:e.filename,path:e.path}))
    const condition = {_id:ObjectID(req.params.id)}
    coll.updateOne(condition, {$set:myObj},(err,data)=>{
        res.status(200).json({data:data, message:'Moment Update successfully..'})
    })
}

exports.DeleteMoment=(req,res,next)=>{
    const col = db.collection('moment')
    col.deleteOne({_id:ObjectID(req.params.id)},(err,data)=>{
        res.status(200).json({data:data, message:'Moment Delete successfully ..'})
    })
}