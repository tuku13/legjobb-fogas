const requireOption = require('../requireOption');

/**
 * Megnézi, hogy a felhasználó be van-e jelentkezve
 * ha be van jelentkezve, akkor tovább hív
 * ha nincs, akkor átirányít a főoldalra
 * @param objectRepository object repository
 * */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        if(req.session.logged_in === 'undefined' || req.session.logged_in !== true ) {
            res.locals.logged_in = false;
            return res.redirect('/');
        }
        res.locals.logged_in = true;
        next();
    };
};