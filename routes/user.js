const express=require('express')
const { loginController, registerController, googleController,} = require('../controllers/UserController')
const passport = require('passport')


const router= express.Router()

// user login
router.post('/login',loginController)

// user register
router.post('/register',registerController)


// Google login
router.post('/google',passport.authenticate('google',{scope:['Profile','email']})
)

router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/login'}),googleController)




module.exports=router