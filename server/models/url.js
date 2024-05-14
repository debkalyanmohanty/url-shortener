const mongoose = require('mongoose');
const shortId = require('shortid')

const urlSchema = mongoose.Schema({
    long_url: {
        type: String,
        required: true
    },
    short_code: {
        type: String,
        required: true,
        default: shortId.generate
    },
    opened: {
        type: String,
        required: true,
        default: 0
    },
    ipAddress: {
        type: String , 
        required: true,
    },
    location: {
        type: Object,
        default: null
        // required: true
    }
})

module.exports = mongoose.model('Url' , urlSchema);