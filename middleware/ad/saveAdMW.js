const requireOption = require('../requireOption');

/**
 * Ha létezik a res.locals.ad, akkor módosítja egyébként létrehozza a POST paraméterben kapott hirdetést
 * majd továbbít a /my_ads oldalra
 * @param objectRepository object repository
 *
 * */

module.exports = (objectRepository) => {
    const AdModel =  requireOption(objectRepository, 'AdModel');
    const AdvertiserModel = requireOption(objectRepository, 'AdvertiserModel');
    return (req, res, next) => {
        if( (typeof req.body.title === 'undefined' ||
            (typeof req.body.description === 'undefined')||
            (typeof req.body.address === 'undefined')||
            (typeof req.body.price === 'undefined')) ){
            return next();
        }

        let isNew = false;
        if(typeof res.locals.ad === 'undefined') {
            isNew = true;
            res.locals.ad = new AdModel();
        }

        AdvertiserModel.findOne({_id : req.session.logged_in_user_id }).then(advertiser => {
            if(req.files !== null && typeof req.files.image !== 'undefined') {
                const file = req.files.image;
                const uploadPath  = './static/images/' + file.name;

                res.locals.ad.title = req.body.title;
                res.locals.ad.description = req.body.description;
                res.locals.ad.address = req.body.address;
                res.locals.ad.price = req.body.price;
                res.locals.ad.image = '/images/' + file.name;
                res.locals.ad._advertiser = advertiser;

                file.mv(uploadPath).then(v => {
                    res.locals.ad.save(err => {
                        if(err) {
                            console.log(`hiba van: ${err}`);
                            return next(err);
                        }
                        return res.redirect('/my_ads');
                    });
                });
            } else {
                res.locals.ad.title = req.body.title;
                res.locals.ad.description = req.body.description;
                res.locals.ad.address = req.body.address;
                res.locals.ad.price = req.body.price;
                if(isNew) {
                    res.locals.ad.image = '/images/picture-placeholder.png';
                }
                res.locals.ad._advertiser = advertiser;

                res.locals.ad.save(err => {
                    if(err) {
                        console.log(`hiba van: ${err}`);
                        return next(err);
                    }
                    return res.redirect('/my_ads');
                });
            }


        });

    };
};