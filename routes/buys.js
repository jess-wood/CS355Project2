const BuysController = new (require('../controllers/BuysController'))();
const buysRouter = require('koa-router')({
    prefix: '/buys'
});

buysRouter.get('/', BuysController.buys);
buysRouter.get('/:buys', BuysController.buy);
buysRouter.post('/', BuysController.addBuys, BuysController.buys);
buysRouter.put('/:buys', BuysController.updateBuys, BuysController.buy);
buysRouter.delete('/:buys', BuysController.deleteBuys, BuysController.buys);

module.exports = buysRouter;