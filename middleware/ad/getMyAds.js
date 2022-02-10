const requireOption = require('../requireOption');

/**
 * Adatbázisból betölti a bejelentkezett felhasználó hirdetéseit
 * @param objectRepository object repository
 * @result res.locals.ads
 * */
module.exports = (objectRepository) => {
    const AdModel =  requireOption(objectRepository, 'AdModel');

    return (req, res, next) => {
        AdModel
            .find({})
            .populate({path: '_advertiser',  match: {_id : req.session.logged_in_user_id}})
            .exec(
            (err, ads) => {
                if(err) {
                    return next(err);
                }
                res.locals.ads = ads.filter(ad => ad._advertiser !== null);
                return next();
            }
        );
    };
};