const requireOption = require('../requireOption');

/**
 * Betölti a felhasználót :user_id alapján
 * @param objectRepository object repository
 * @result res.locals.user
 * */
module.exports = (objectRepository) => {
    const AdvertiserModel = requireOption(objectRepository, 'AdvertiserModel');

    return (req, res, next) => {
        const user_id = (req.session.logged_in_user_id !== undefined) ? req.session.logged_in_user_id : req.params.user_id;

        AdvertiserModel.findOne({_id: user_id} , (err, advertiser) => {
            if(err || !advertiser) {
                return next(err ? err : 'no advertiser');
            }
            res.locals.advertiser = advertiser;
            res.locals.user = advertiser;
            return next();
        });
    };
};