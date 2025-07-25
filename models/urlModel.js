const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalURL: {
        type: String
    },
    shortCode:{
        type:String
    },
    shortURL:{
        type:String
    },
    noOfVisits:{
        type:Number,
        default:0
    }
});

const url = mongoose.model('url', urlSchema);
module.exports = url;
