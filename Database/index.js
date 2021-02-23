const express = require('express')
const mongodb = require('mongodb')
var dbb

module.exports = {
    connect: () => {
        mongodb.connect(process.env.DATABASE, (err,db)=>{
            if(err) throw err;
            console.log('db connected ')
            dbb = db.db('testing_DB');
        })
    },
    collection: (collection)=>{
        return  dbb?.collection(collection) 
    }
}