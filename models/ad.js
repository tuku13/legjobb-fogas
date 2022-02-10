const Schema = require('mongoose').Schema;
const db = require('../config/db.js');

const Ad = db.model('Ad', {
    title: String,
    description: String,
    address: String,
    price: Number,
    _advertiser: {
        type: Schema.Types.ObjectId,
        ref: 'Advertiser'
    },
    image: String
});

module.exports = Ad;