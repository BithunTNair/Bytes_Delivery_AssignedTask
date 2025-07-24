const express= require('express');
const { saveURL, redirectUrl } = require('../controller/handlerUrl');
const router= express.Router();

router.post('/longurl',saveURL );

router.get('/shorturl/:shortCode', redirectUrl);
module.exports= router;