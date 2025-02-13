const express = require("express");
const URL = require("../Models/schemas")
const router = express.Router();

router.get("/", async (req, res) => {
    if(!req.user)
        return res.redirect('/login')
    const urls = await URL.find({ createdBy: req.user._id})
    return res.render('home', {urls: urls})
})

router.get('/sign-up', (req, res) => {
    return res.render('sign-up')
})

router.get('/login', (req, res) => {
    return res.render('login')
})

module.exports = router;