const LunchController = new (require('../controllers/LunchController'))();
const lunchRouter = require('koa-router')({
    prefix: '/lunch'
});

lunchRouter.get('/', LunchController.lunches);
lunchRouter.get('/:lunch', LunchController.lunch);
lunchRouter.post('/', LunchController.addLunch, LunchController.lunches);
lunchRouter.put('/:lunch', LunchController.updateLunch, LunchController.lunch);
lunchRouter.delete('/:lunch', LunchController.deleteLunch, LunchController.lunches);

module.exports = lunchRouter;