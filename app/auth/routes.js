const express = require('express')
const router = express.Router()
const {sendVerificationaEmail, verifyCode , signUp , logIn} = require('./controllers')
const {validateSignUp} = require('./middlewares') 
const {upload} =require('./utils')
router.post('/api/auth/sendmail',sendVerificationaEmail )
router.post('/api/auth/verifycode', verifyCode )

router.post('/api/auth/signup',upload.single('company_logo'),validateSignUp ,signUp )
router.post('/api/auth/login' ,logIn )

module.exports = router  