const renderMW = require('../middleware/renderMW');
const sessionNavbarMW = require('../middleware/sessionNavbarMW.js');

const authMW = require('../middleware/auth/authMW.js');
const inverseAuthMW = require('../middleware/auth/inverseAuthMW.js');
const checkPasswordMW = require('../middleware/auth/checkPasswordMW');
const logoutMW = require('../middleware/auth/logoutMW');

const getUserMW = require('../middleware/advertiser/getUserMW.js');
const saveUserMW = require('../middleware/advertiser/saveUserMW.js');

const getAdMW = require('../middleware/ad/getAdMW.js');
const getAdsMW = require('../middleware/ad/getAdListMW');
const getMyAdsMW = require('../middleware/ad/getMyAds');
const saveAdMW = require('../middleware/ad/saveAdMW.js');
const deleteAdMW = require('../middleware/ad/deleteAdMW.js');

const AdvertiserModel = require('../models/advertiser.js');
const AdModel = require('../models/ad.js');

module.exports = app => {
    const objRepo = {
        AdModel: AdModel,
        AdvertiserModel: AdvertiserModel
    };

    app.use((err, req, res, next) =>{
        res.end('Problem...');
        console.log(err);
    });

    // elérhetőve teszi az ejs includeok számára, hogy be van-e jelentkezve a felhasználó
    // ezért a felső sávban a megfelelő gombok jelennek meg:
    // bejelentkezett felhasználó esetén: Hirdetéseim, Profil, Kilépés
    // nem bejelentkezett felhasználó esetén: Regisztráció, Bejelentkezés
    app.use(sessionNavbarMW);

    app.get('/register',
        inverseAuthMW(objRepo),
        renderMW(objRepo, 'register'));

    app.post('/register',
        saveUserMW(objRepo),
        checkPasswordMW(objRepo));

    app.get('/login',
        inverseAuthMW(objRepo),
        renderMW(objRepo, 'login'));

    app.post('/login',
        checkPasswordMW(objRepo));

    app.get('/profile',
        authMW(objRepo),
        getUserMW(objRepo),
        renderMW(objRepo, 'profile'));

    app.post('/profile',
        authMW(objRepo),
        getUserMW(objRepo),
        saveUserMW(objRepo));

    app.get('/ads/:ad_id/edit',
        authMW(objRepo),
        getAdMW(objRepo),
        renderMW(objRepo, 'edit'));

    app.post('/ads/:ad_id/edit',
        authMW(objRepo),
        getAdMW(objRepo),
        saveAdMW(objRepo));

    app.get('/ads/:ad_id/delete',
        authMW(objRepo),
        getAdMW(objRepo),
        deleteAdMW(objRepo));

    app.get('/ads/:ad_id',
        getAdMW(objRepo),
        renderMW(objRepo, 'details'));

    app.get('/my_ads',
        authMW(objRepo),
        getMyAdsMW(objRepo),
        renderMW(objRepo, 'my_ads'));

    app.post('/new',
        authMW(objRepo),
        saveAdMW(objRepo));

    app.get('/new',
        authMW(objRepo),
        renderMW(objRepo, 'new'));

    app.use('/logout', logoutMW(objRepo));

    app.use('/',
        getAdsMW(objRepo),
        renderMW(objRepo, 'index'));
};