const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/apsvtg');

module.exports = mongoose;