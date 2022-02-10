/**
 * @source github minta házi
 * Megszünteti a sessiönt
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        res.locals.logged_in = false;
        req.session.destroy(err => {
            res.locals.logged_in = false;
            res.redirect('/');
        });
    };
};