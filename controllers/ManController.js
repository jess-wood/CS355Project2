const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class ManController {
    constructor() {
        console.log('Manufacturer Controller Initialized!');
    }
    
    //gets all manufacturers
    async manufacturers(ctx) {
        console.log('Controller HIT: ManController::manufacturers');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM manufacturer';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.manufacturer: ${err}`);
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

    //gets a manufacturer
    async manufacturer(ctx) {
        console.log('Controller HIT: ManController::manufacturer');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM manufacturer WHERE man_ID = ?;';
            const man = ctx.params.manufacturer;
            
            chpConnection.query({
                sql: query,
                values: [man]
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

    // add a new manufacturer
    async addManufacturer(ctx, next) {
        console.log('Controller HIT: ManController::addManufacturer');
       return new Promise((resolve, reject) => {
           const newMan = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO manufacturer(man_ID, city) VALUES (?, ?);',
               values: [newMan.man_ID, newMan.city]
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

    // Update a manufacturer
    async updateManufacturer(ctx, next) {
        console.log('Controller HIT: ManController::updateManufacturer');
        return new Promise((resolve, reject) => {
            const man = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE manufacturer 
                    SET 
                        city = ?
                    WHERE man_ID = ?
                    `,
                values: [man.city, ctx.params.manufacturer]
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

    //deletes a manufacturer
    async deleteManufacturer(ctx, next) {
        console.log('Controller HIT: ManController::deleteManufacturer');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM manufacturer WHERE man_ID = ?;`,
                values: [ctx.params.manufacturer]
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
module.exports = ManController;