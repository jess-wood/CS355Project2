const SchoolController = new (require('../controllers/SchoolController'))();
const schoolRouter = require('koa-router')({
    prefix: '/school'
});

schoolRouter.get('/', SchoolController.schools);
schoolRouter.get('/:school', SchoolController.school);
schoolRouter.post('/', SchoolController.addSchool, SchoolController.schools);
schoolRouter.put('/:school', SchoolController.updateSchool, SchoolController.school);
schoolRouter.delete('/:school', SchoolController.deleteSchool, SchoolController.schools);

module.exports = schoolRouter;