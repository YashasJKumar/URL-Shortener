const User = require("../Models/users")
const {v4: uuidv4} = require('uuid')

const {getUser, setUser} = require("../services/auth")


async function handleUserSignUp(req,res){
    const {name, email, password} = req.body
    await User.create({name, email, password})
    return res.redirect('/')
}

async function handleUserLogin(req,res){
    const {email, password} = req.body
    const user = await User.findOne({email, password})
    if(!user)
        return res.render('login',{
            error: 'Invalid Credentials'
        })
    const userToken = setUser(user)
    res.cookie("token", userToken)
    return res.redirect('/')
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}
