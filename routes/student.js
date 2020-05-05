const StudentController = new (require('../controllers/StudentController'))();
const studentRouter = require('koa-router')({
    prefix: '/student'
});

studentRouter.get('/', StudentController.students);
studentRouter.get('/:student', StudentController.student);
studentRouter.post('/', StudentController.addStudent, StudentController.students);
studentRouter.put('/:student', StudentController.updateStudent, StudentController.student);
studentRouter.delete('/:student', StudentController.deleteStudent, StudentController.students);

module.exports = studentRouter;