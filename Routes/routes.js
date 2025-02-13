const express = require('express');
const { handleGenerateShortUrl,
    handleRedirectShortUrl, handleAnalyticsRoute } = require('../Controllers/handlers')
const router = express.Router();


router.post('/', handleGenerateShortUrl);

router.get('/:shortUrl', handleRedirectShortUrl)

router.get('/analytics/:shortUrl', handleAnalyticsRoute);
module.exports = router;