const requireOption = require('../requireOption');

/**
 * Adatbázisból betölt a ':ad_id'-hez tartozó hirdetést
 * @param objectRepository object repository
 * @result res.locals.ad
 * */
module.exports = (objectRepository) => {
    const AdModel =  requireOption(objectRepository, 'AdModel');
    const AdvertiserModel = requireOption(objectRepository, 'AdvertiserModel');

    return (req, res, next) => {
        AdModel.findOne({_id: req.params.ad_id}).then(ad => {
            AdvertiserModel.findOne({_id: ad._advertiser}).then(advertiser => {
                //delete advertiser.password
                ad.advertiser = advertiser;
                res.locals.ad = ad;
                return next();
            });
        });
    };
};