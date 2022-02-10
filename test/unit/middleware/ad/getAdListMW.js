const expect = require('chai').expect;
const getAdListMW = require('../../../../middleware/ad/getAdListMW');

describe('getAdList middleware', () => {
    it('should set res.locals.ads with list of all ads from db', done =>{
        const mw = getAdListMW({
            AdModel : {
                find : (filterObject, cb) => {
                    expect(filterObject).to.be.eql({});
                    cb(null, [
                        {_id: 1, title: 'title1'},
                        {_id: 2, title: 'title2'},
                        {_id: 3, title: 'title3'}
                    ]);
                }
            }
        });

        const reqMock = {
            query : {}
        };

        const resMock = {
            locals: {}
        };

        mw(reqMock, resMock, err => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals.ads.length).to.be.eql(3);
            expect(resMock.locals.ads).to.be.eql([
                {_id: 1, title: 'title1'},
                {_id: 2, title: 'title2'},
                {_id: 3, title: 'title3'}
            ]);
            done();
        });
    });
    it('should call next with \'no ad\' error ', done =>{
        const mw = getAdListMW({
            AdModel : {
                find : (filterObject, cb) => {
                    expect(filterObject).to.be.eql({});
                    cb(null);
                }
            }
        });

        const reqMock = {
            query : {}
        };

        const resMock = {
            locals: {}
        };

        mw(reqMock, resMock, err => {
            expect(err).not.to.be.eql(undefined);
            expect(err).to.be.eql('no ad');
            done();
        });
    });
    it('should call next with db error ', done =>{
        const mw = getAdListMW({
            AdModel : {
                find : (filterObject, cb) => {
                    expect(filterObject).to.be.eql({});
                    cb('db error', undefined);
                }
            }
        });

        const reqMock = {
            query : {}
        };

        const resMock = {
            locals: {}
        };

        mw(reqMock, resMock, err => {
            expect(err).not.to.be.eql(undefined);
            expect(err).not.to.be.eql('no ad');
            expect(err).to.be.eql('db error');
            done();
        });
    });
    it('should set res.locals.ads with list of ads that contain :searchParam query param in their title with ', done =>{
        const mw = getAdListMW({
            AdModel : {
                find : (filterObject, cb) => {
                    expect(filterObject).to.be.eql({title : {$regex : 'searchParam'}});
                    cb(null, [
                        {_id: 1, title: 'title1 searchParam'},
                        {_id: 4, title: 'searchParam title3'},
                        {_id: 5, title: 'titsearchParamle3'}
                    ]);
                }
            }
        });

        const reqMock = {
            query : {
                search : 'searchParam'
            }
        };

        const resMock = {
            locals: {}
        };

        mw(reqMock, resMock, err => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals.ads.length).to.be.eql(3);
            expect(resMock.locals.ads).to.be.eql([
                {_id: 1, title: 'title1 searchParam'},
                {_id: 4, title: 'searchParam title3'},
                {_id: 5, title: 'titsearchParamle3'}
            ]);
            done();
        });
    });
    it('should call next with db error when :searchParam query param is set', done =>{
        const mw = getAdListMW({
            AdModel : {
                find : (filterObject, cb) => {
                    expect(filterObject).to.be.eql({title : {$regex : 'searchParam'}});
                    cb('db error', [
                        {_id: 1, title: 'title1 searchParam'},
                        {_id: 4, title: 'searchParam title3'},
                        {_id: 5, title: 'titsearchParamle3'}
                    ]);
                }
            }
        });

        const reqMock = {
            query : {
                search : 'searchParam'
            }
        };

        const resMock = {
            locals: {}
        };

        mw(reqMock, resMock, err => {
            expect(err).not.to.be.eql(undefined);
            expect(err).to.be.eql('db error');
            expect(resMock.locals.ads).to.be.eql(undefined);
            done();
        });
    });
    it('should call next with \'no ad\' error when :searchParam query param is set', done =>{
        const mw = getAdListMW({
            AdModel : {
                find : (filterObject, cb) => {
                    expect(filterObject).to.be.eql({title : {$regex : 'searchParam'}});
                    cb(null);
                }
            }
        });

        const reqMock = {
            query : {
                search : 'searchParam'
            }
        };

        const resMock = {
            locals: {}
        };

        mw(reqMock, resMock, err => {
            expect(err).not.to.be.eql(undefined);
            expect(err).not.to.be.eql('db error');
            expect(err).to.be.eql('no ad');
            expect(resMock.locals.ads).to.be.eql(undefined);
            done();
        });
    });
});