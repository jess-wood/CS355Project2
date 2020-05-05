const ManController = new (require('../controllers/ManController'))();
const manufacturerRouter = require('koa-router')({
    prefix: '/manufacturer'
});

manufacturerRouter.get('/', ManController.manufacturers);
manufacturerRouter.get('/:manufacturer', ManController.manufacturer);
manufacturerRouter.post('/', ManController.addManufacturer, ManController.manufacturers);
manufacturerRouter.put('/:manufacturer', ManController.updateManufacturer, ManController.manufacturer);
manufacturerRouter.delete('/:manufacturer', ManController.deleteManufacturer, ManController.manufacturers);

module.exports = manufacturerRouter;