const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class LunchController {
    constructor() {
        console.log('Lunch Controller Initialized!');
    }
    
    //gets all lunches
    async lunches(ctx) {
        console.log('Controller HIT: LunchController::lunches');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM lunch';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.lunch: ${err}`);
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

    //gets a lunch
    async lunch(ctx) {
        console.log('Controller HIT: LunchController::lunch');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM lunch WHERE student = ?;';
            const lun = ctx.params.lunch;
            
            chpConnection.query({
                sql: query,
                values: [lun]
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

    // add a new lunch
    async addLunch(ctx, next) {
        console.log('Controller HIT: LunchController::addLunch');
       return new Promise((resolve, reject) => {
           const newLun = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO lunch(student, stu_order, cheese_za, pep_za, daily, PBJ, grilled_cheese) VALUES (?, ?, ?, ?, ?, ?, ?);',
               values: [newLun.student, newLun.stu_order, newLun.cheese_za, newLun.pep_za, newLun.daily, newLun.PBJ, newLun.grilled_cheese]
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

    // Update a lunch
    async updateLunch(ctx, next) {
        console.log('Controller HIT: LunchController::updateLunch');
        return new Promise((resolve, reject) => {
            const lun = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE lunch 
                    SET 
                        stu_order = ?,
                        cheese_za = ?,
                        pep_za = ?,
                        daily = ?,
                        PBJ = ?,
                        grilled_cheese = ?
                    WHERE student = ?
                    `,
                values: [lun.stu_order, lun.cheese_za, lun.pep_za, lun.daily, lun.PBJ, lun.grilled_cheese, ctx.params.lunch]
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

    //deletes a lunch
    async deleteLunch(ctx, next) {
        console.log('Controller HIT: LunchController::deleteLunch');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM lunch WHERE stu_order = ?;`,
                values: [ctx.params.lunch]
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
module.exports = LunchController;