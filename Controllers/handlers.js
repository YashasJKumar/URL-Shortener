const { nanoid } = require('nanoid')
const URL = require('../Models/schemas');

async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if(!body.url)
        return res.status(400).send('URL is required');

    let shortId;
    let existing;

    // Keep generating new IDs until a unique one is found
    do {
        shortId = nanoid(8);
        existing = await URL.findOne({ shortUrl: shortId });
    } while (existing);

    // const shortId = nanoid(8)
    // console.log("Short ID: ", shortId);
    await URL.create({
        shortUrl: shortId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })

    const urls = await URL.find({ createdBy: req.user._id})

    return res.render('home',{
        id: shortId,
        urls: urls
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


module.exports = {
    handleGenerateShortUrl,
    handleRedirectShortUrl,
};