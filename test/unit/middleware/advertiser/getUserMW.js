const expect = require('chai').expect;
const getUserMW = require('../../../../middleware/advertiser/getUserMW');

describe('getUser middleware', () => {
    it('should set res.locals.advertiser and res.locals.user with an advertiser object from db', done =>{
        const mw = getUserMW({
            AdvertiserModel : {
                findOne : (userId, cb) => {
                    expect(userId).to.be.eql({_id: '123'});
                    cb(null, 'mock user');
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({
            session : {
                logged_in_user_id : '123'
            }
        },resMock, (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({advertiser: 'mock user', user: 'mock user'});
            done();
        });
    });
    it('should set res.locals.advertiser and res.locals.user with an advertiser object from db even if session.logged_in_user_id is not defined.', done =>{
        const mw = getUserMW({
            AdvertiserModel : {
                findOne : (userId, cb) => {
                    expect(userId).to.be.eql({_id: '123'});
                    cb(null, 'mock user');
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({
            params : {
                user_id : '123'
            },
            session : {}
        },resMock, (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({advertiser: 'mock user', user: 'mock user'});
            done();
        });
    })
    it('should call next with db error', done =>{
        const mw = getUserMW({
            AdvertiserModel : {
                findOne : (userId, cb) => {
                    expect(userId).to.be.eql({_id: '123'});
                    cb('db error', null);
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({
            session : {
                logged_in_user_id : '123'
            }
        },resMock, (err) => {
            expect(err).to.be.eql('db error');
            done();
        });
    });
    it('should call next when advertiser is not found in db', done =>{
        const mw = getUserMW({
            AdvertiserModel : {
                findOne : (userId, cb) => {
                    expect(userId).to.be.eql({_id: '123'});
                    cb(undefined, null);
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw(
            {
            session : {
                logged_in_user_id : '123'
                }
            },
            resMock, (err) => {
            expect(err).to.be.eql('no advertiser');
            done();
        });
    });
});