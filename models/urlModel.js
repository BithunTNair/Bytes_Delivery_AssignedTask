const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    longURL: {
        type: String
    },
    shortCode:{
        type:String
    },
    shortURL:{
        type:String
    }
});

const url = mongoose.model('url', urlSchema);
module.exports = url;
