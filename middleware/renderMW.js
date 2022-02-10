const requireOption = require('./requireOption');

/**
 * Kirendereli a képernyőt template engine segítségével
 * @param objectRepository object repository
 * @param viewName renderelendő nézet neve
 * */
module.exports = (objectRepository, viewName) => {
    return (req, res, next) => {
        res.render(viewName, res.locals);
    };
};