const express = require('express');
const { handleGenerateShortUrl,
    handleRedirectShortUrl } = require('../Controllers/handlers')
const router = express.Router();


router.post('/', handleGenerateShortUrl);

router.get('/:shortUrl', handleRedirectShortUrl)

module.exports = router;
