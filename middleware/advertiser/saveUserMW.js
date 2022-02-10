const requireOption = require('../requireOption');

/**
 * Ha létezik a res.locals.user, akkor módosítja egyébként létrehozza a POST paraméterben kapott felhasználót
 * majd továbbít a /profile oldalra
 * @param objectRepository object repository
 *
 * */
module.exports = (objectRepository) => {
    const AdvertiserModel = requireOption(objectRepository, 'AdvertiserModel');
    return (req, res, next) => {
        if((typeof req.body.name === 'undefined') ||
            (typeof req.body.password === 'undefined') ||
            (typeof req.body.password_again === 'undefined') ||
            (typeof req.body.email === 'undefined') ||
            (typeof req.body.phone_number === 'undefined')) {
            return next();
        }

        if(typeof res.locals.user === 'undefined') {
            res.locals.user = new AdvertiserModel();
        }

        if(req.body.password !== req.body.password_again) {
            res.locals.err = '2 jelszo nem egyezik';
            return res.redirect('/');
        }

        AdvertiserModel.findOne({email: req.body.email }, (err, alreadyRegisteredUser) => {
            if(err) {
                return next(err);
            }
            if(alreadyRegisteredUser !== null) {
                return next('Ezzel az email címmel már regisztráltak!');
            } else {
                res.locals.user.name = req.body.name;
                res.locals.user.password = req.body.password;
                res.locals.user.email = req.body.email;
                res.locals.user.phone_number = req.body.phone_number;

                res.locals.user.save(err => {
                    if(err) {
                        console.log(err);
                    }
                    if(req.session.logged_in) {
                        res.redirect('/my_ads');
                    } else {
                        res.redirect('/login');
                    }
                });
            }
        });
    };
};