const { nanoid } = require('nanoid')
const URL = require('../Models/schemas');

async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if(!body.url)
        return res.status(400).send('URL is required');
    const shortId = nanoid(8)
    // console.log("Short ID: ", shortId);
    await URL.create({
        shortUrl: shortId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })

    return res.render('home',{
        id: shortId,
    })
}

async function handleRedirectShortUrl(req, res) {
    const shortId = req.params.shortUrl;
    const urlToBeRedirected = await URL.findOneAndUpdate({
        shortUrl: shortId,
    },{
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    })
    res.redirect(urlToBeRedirected.redirectUrl)
}

async function handleAnalyticsRoute(req, res) {
    const shortId = req.params.shortUrl;
    const result = await URL.findOne({
        shortUrl: shortId,
    })
    return res.json({ totalClicks: result.visitHistory.length})
}

module.exports = {
    handleGenerateShortUrl,
    handleRedirectShortUrl,
    handleAnalyticsRoute,
};
