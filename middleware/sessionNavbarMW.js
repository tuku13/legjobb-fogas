const requireOption = require('./requireOption');

module.exports = (req, res, next) => {
        //console.log('hlkjlkjhlkjlklj');
        res.locals.logged_in = req.session.logged_in;
        //res.locals.logged_in = true;
        return next();
    };