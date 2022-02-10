const requireOption = require('../requireOption');

/**
 * Ellenőrzi a felhasználó jelszavát (POST)
 * ha helyes a jelszó, akkor létrehoz egy sessiönt és beállítja felhasználó id-t majd
 * visszairányít a főoldalra
 * @param objectRepository object repository
 * */
module.exports = (objectRepository) => {
    const AdvertiserModel = requireOption(objectRepository, 'AdvertiserModel');

    return (req, res, next) => {
        if(typeof req.body.password === 'undefined') {
            res.locals.error = 'Nincs jelszó megadva!';
            return res.redirect('/login');
        }

        AdvertiserModel.findOne({email: req.body.email}).then(user => {
            if(user === null) {
                res.locals.error = 'Nincs ilyen felhasználó';
                return res.redirect('/login');
            }

            if(req.body.forgotten_password !== undefined) {
                console.log(`--------------------------------------------------------`);
                console.log(`[Password Service] '${user.email}' elfelejtett jelszava: '${user.password}'`);
                console.log(`--------------------------------------------------------`);
            }

            if(user.password === req.body.password) {
                req.session.logged_in = true;
                req.session.logged_in_user_id = user._id;
            } else {
                res.locals.error = 'Hibás jelszó';
            }
            return req.session.save(err => {
                if(err) {
                    res.locals.error = err;
                }
                res.redirect('/my_ads');
            });
        });

    };
};