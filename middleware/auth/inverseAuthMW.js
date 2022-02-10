const requireOption = require('../requireOption');

/**
 * Megnézi, hogy a felhasználó be van-e jelentkezve
 * ha nincs akkor tovább engedi
 * ha be van bejelntkezve, akkor visszadob a főoldalra
 * @param objectRepository object repository
 * */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        if(typeof req.session.logged_in === 'undefined' || req.session.logged_in !== true ) {
            res.locals.logged_in = false;
            next();
        }
        res.locals.logged_in = true;
        return res.redirect('/');
    };
};