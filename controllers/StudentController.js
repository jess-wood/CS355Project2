const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class StudentController {
    constructor() {
        console.log('Student Controller Initialized!');
    }
    
    //gets all students
    async students(ctx) {
        console.log('Controller HIT: StudentController::students');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM student';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.student: ${err}`);
                }
                
                ctx.body = res;
                ctx.status = 200;
                
                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = err;
        });
    }

    //gets a student
    async student(ctx) {
        console.log('Controller HIT: StudentController::student');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM student WHERE stu_ID = ?;';
            const st = ctx.params.student;
            
            chpConnection.query({
                sql: query,
                values: [st]
            }, (err, res) => {
                if(err) {
                    reject(err);
                } 

                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    // add a new student
    async addStudent(ctx, next) {
        console.log('Controller HIT: StudentController::addStudent');
       return new Promise((resolve, reject) => {
           const newSt = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO student(stu_ID, first_name, last_name, free_lunch) VALUES (?, ?, ?, ?);',
               values: [newSt.stu_ID, newSt.first_name, newSt.last_name, newSt.free_lunch]
           }, (err, res) => {
               if(err) {
                   reject(err);
               }

               resolve();
           });
           
       })
        .then(await next)
        .catch(err => {
           ctx.status = 500;
           ctx.body = {
               error: `Internal Server Error: ${err}`,
               status: 500
           };
       });
    }

    // Update a student
    async updateStudent(ctx, next) {
        console.log('Controller HIT: StudentController::updateStudent');
        return new Promise((resolve, reject) => {
            const st = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE student 
                    SET 
                        first_name = ?,
                        last_name = ?,
                        free_lunch = ?
                    WHERE stu_ID = ?
                    `,
                values: [st.first_name, st.last_name, st.free_lunch, ctx.params.student]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }

                resolve();
            });
        })
         .then(await next)
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    //deletes a student
    async deleteStudent(ctx, next) {
        console.log('Controller HIT: StudentController::deleteStudent');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM student WHERE stu_ID = ?;`,
                values: [ctx.params.student]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        })
        .then(await next)
        .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }
}

module.exports = StudentController;