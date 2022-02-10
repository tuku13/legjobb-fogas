const requireOption = require('../requireOption');

/**
 * Ha létezik a res.locals.ad, akkor törli az ahhoz tartozó hirdetést
 * majd továbbít a /my_ads oldalra
 * @param objectRepository object repository
 *
 * */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        if(typeof res.locals.ad === 'undefined') {
            return next();
        }

        res.locals.ad.remove(err => {
            if(err) {
                return next(err);
            }
            return res.redirect('/my_ads');
        });
    };
};