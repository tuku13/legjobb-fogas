const db = require('../config/db.js');

const Advertiser = db.model('Advertiser', {
    name: String,
    email: String,
    password: String,
    phone_number: String
});

module.exports = Advertiser;