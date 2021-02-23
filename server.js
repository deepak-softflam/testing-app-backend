const express = require('express')
const app = express()
const bodyparser =require('body-parser')
const routers = require('./Router')
const dotenv= require('dotenv')
const db = require('./Database')
dotenv.config()

db.connect()
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use('/api',routers )

app.listen(process.env.PORT)