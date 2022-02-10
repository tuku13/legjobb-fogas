const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'titok',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');

app.use(fileUpload({
    createParentPath: true
}));

app.use(express.static('static'));
app.disable('view cache');

// Route-ok betöltése
require('./route/routes.js')(app);

app.listen(3000, () => {
    console.log("Server started listening on: 3000");
});

