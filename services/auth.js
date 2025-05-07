// const sessionIdToUserMap = new Map()
//
// function setUser(id, user) {
//     sessionIdToUserMap.set(id, user)
// }
//
// function getUser(id) {
//     return sessionIdToUserMap.get(id)
// }
const jwt = require("jsonwebtoken");
// const SECRET = process.env.SECRET;
const SECRET = "I-am-a-fan-of-Airbus"

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role
    }, SECRET)
}

function getUser(token){
    if(!token)
        return null;
    try{
        return jwt.verify(token, SECRET);
    }
    catch(err){
        return null;
    }
}

module.exports = {
    getUser, setUser
}