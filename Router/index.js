var express = require('express')
var router = express.Router()
const user = require('../Controller/User')
const moment = require('../Controller/Moment')
const multer= require('multer')
const auth = require('../Auth/auth')

// initialize multer storage path 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'tmp')
    },
    filename: function (req, file, cb) {
      console.log(file)
      cb(null, file.originalname )
    }
  })
   
  var upload = multer({ storage: storage })

// login api route
router.post('/login',user.login)
router.post('/newUser', user.addUser)

// moment api route 
router.post('/addMoment',auth,upload.array('img','12') ,moment.AddMoment)
router.get('/getMomentList',auth,moment.GetMomentList)
router.put('/updateMoment/:id',auth,upload.array('img','12'),moment.UpdateMoment)
router.delete('/deleteMoment/:id',auth,moment.DeleteMoment)


//other
router.post('/addUser',user.addUser)

module.exports = router ;