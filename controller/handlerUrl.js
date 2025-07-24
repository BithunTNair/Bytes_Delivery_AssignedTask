const URL = require('../models/urlModel');
const { nanoid } = require('nanoid');
const saveURL = async (req, res) => {
    const { longURL } = req.body;
    try {
        const shortCode = nanoid(4);
        const shortUrl = `http://localhost:5000/${shortCode}`
        const data = URL({
            longURL: longURL,
            shortCode: shortCode,
            shortURL: shortUrl

        });
        await data.save();
        return res.status(201).json({ message: 'URL has been saved', shortUrl });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const redirectUrl = async (req, res) => {
    const { shortCode } = req.params;
    try {
        if (!shortCode) {
            return res.status(400).json({ message: 'shortCode not found' });
        }
        const document = await URL.findOne({ shortCode });
        const longUrl = document.longURL
        return res.redirect(longUrl);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { saveURL, redirectUrl }