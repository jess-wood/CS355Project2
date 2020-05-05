const NoLunchController = new (require('../controllers/NoLunchController'))();
const nolunchRouter = require('koa-router')({
    prefix: '/nolunch'
});

nolunchRouter.get('/', NoLunchController.nolunch);

module.exports = nolunchRouter;