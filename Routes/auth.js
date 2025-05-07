const express = require('express')
const { handleUserSignUp, handleUserLogin, handleForgotPassword, handleResetPasswordCheck, handleResetPassword} = require('../Controllers/user')
const router = express.Router()

router.post('/', handleUserSignUp)
router.post('/login', handleUserLogin)
router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/')
})
router.post("/forgot-password", handleForgotPassword)

router.get("/reset-password/:id/:token", handleResetPasswordCheck);

router.post("/reset-password/:id/:token", handleResetPassword);
module.exports = router
