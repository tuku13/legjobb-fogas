const requireOption = require('../requireOption');

/**
 * Adatbázisból betölti a hirdetéseket
 * @param objectRepository object repository
 * @result res.locals.ads
 * */
module.exports = (objectRepository) => {
    const AdModel =  requireOption(objectRepository, 'AdModel');
    return (req, res, next) => {

        if(req.query.search !== undefined) {
            AdModel.find({title : {$regex : req.query.search }} , (err, ads) => {
                if(err || !ads) {
                    return next(err ? err : 'no ad');
                }
                res.locals.ads = ads;
                return next();
            });
        } else {
            AdModel.find({} , (err, ads) => {
                if(err || !ads) {
                    return next(err ? err : 'no ad');
                }
                res.locals.ads = ads;
                return next();
            });
        }
    };
};