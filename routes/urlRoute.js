const express= require('express');
const { redirectURL, shortenURL } = require('../controller/handlerUrl');
const router= express.Router();
// POST route for sending original lengthy url
router.post('/shorten',shortenURL );
// GET route for redirecting to the original url through a generated short url
router.get('/:shortCode', redirectURL);

module.exports= router;