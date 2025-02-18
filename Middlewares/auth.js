const { getUser } = require("../services/auth")

// Authentication
function checkForAuthentication (req, res, next) {
    const userToken = req.cookies?.token
    req.user = null

    if(!userToken)
        return next()

    const user = getUser(userToken)
    req.user = user
    return next()
}

// Authorization
function allowAccesTo(roles = []){
    return function(req, res, next){
        if(!req.user)
            return res.redirect('/login')
        if (!roles.includes(req.user.role)) {
            res.status(403).set("Content-Type", "text/html");
            return res.send("<h1 style='color: red'>You are Unauthorized!</h1>");
        }
        return next()
    }
}

module.exports = {
    checkForAuthentication,
    allowAccesTo
}
