const express = require("express");
const URL = require("../Models/schemas")
const {allowAccesTo} = require("../Middlewares/auth");
const router = express.Router();

router.get("/",allowAccesTo(['NORMAL', 'ADMIN']), async (req, res) => {
    const urls = await URL.find({ createdBy: req.user._id})
    return res.render('home', {urls: urls})
})

router.get('/sign-up', (req, res) => {
    return res.render('sign-up')
})

router.get('/login', (req, res) => {
    return res.render('login')
})

router.get("/admin/dashboard", allowAccesTo(['ADMIN']), async (req, res) => {
    // ADMIN -> Can see all URL's
    const allUrls = await URL.find()
    return res.render('home', {urls: allUrls})
})

module.exports = router;
