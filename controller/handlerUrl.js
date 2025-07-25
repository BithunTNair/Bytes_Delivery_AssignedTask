const URLs = require('../models/urlModel');
const { nanoid } = require('nanoid');
// check the entered URL is valid or not
const isValidURL = (url) => {
    try {
        new URL(url)
        return true;
    } catch (error) {
        return false
    }
}

const shortenURL = async (req, res) => {
    const { originalURL } = req.body;

    try {
        if (!isValidURL(originalURL)) {

            return res.status(400).json({ message: 'The entered url is not valid' });
        }
        // create a short code using nanoid
        const shortCode = nanoid(4);
        const shortUrl = `http://localhost:5000/${shortCode}`
        // save the document
        const data = URLs({
            originalURL: originalURL,
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

const redirectURL = async (req, res) => {
    const { shortCode } = req.params;
    try {
        if (!shortCode) {
            return res.status(404).json({ message: 'shortCode not found' });
        }
        // get the document which matches the shortCode
        const document = await URLs.findOne({ shortCode });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        const originalUrl = document.originalURL;
        // Increment noOfVisits
        document.noOfVisits += 1;
        await document.save();
        // redirects to the original url
        return res.redirect(originalUrl);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { shortenURL, redirectURL }