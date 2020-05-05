const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class SchoolController {
    constructor() {
        console.log('School Controller Initialized!');
    }
    
    //gets all schools
    async schools(ctx) {
        console.log('Controller HIT: SchoolController::schools');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM school';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.school: ${err}`);
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

    //gets a school
    async school(ctx) {
        console.log('Controller HIT: SchoolController::school');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM school WHERE ID = ?;';
            const sch = ctx.params.school;
            
            chpConnection.query({
                sql: query,
                values: [sch]
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

    // add a new school
    async addSchool(ctx, next) {
        console.log('Controller HIT: SchoolController::addSchool');
       return new Promise((resolve, reject) => {
           const newSch = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO school(ID, name, district, city) VALUES (?, ?, ?, ?);',
               values: [newSch.ID, newSch.name, newSch.district, newSch.city]
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

    // Update a school
    async updateSchool(ctx, next) {
        console.log('Controller HIT: SchoolController::updateSchool');
        return new Promise((resolve, reject) => {
            const sch = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE school 
                    SET 
                        name = ?,
                        district = ?,
                        city = ?
                    WHERE ID = ?
                    `,
                values: [sch.name, sch.district, sch.city, ctx.params.school]
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

    //deletes a school
    async deleteSchool(ctx, next) {
        console.log('Controller HIT: SchoolController::deleteSchool');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM school WHERE ID = ?;`,
                values: [ctx.params.school]
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
module.exports = SchoolController;