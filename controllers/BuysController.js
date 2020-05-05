const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class BuysController {
    constructor() {
        console.log('Buys Controller Initialized!');
    }
    
    //gets all manufacturers that schools buy from
    async buys(ctx) {
        console.log('Controller HIT: BuysController::buys');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM buys';
            
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

    //gets a single manufacturer that the school buys from
    async buy(ctx) {
        console.log('Controller HIT: BuysController::buy');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM buys WHERE school = ?;';
            const buy = ctx.params.buys;
            
            chpConnection.query({
                sql: query,
                values: [buy]
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

    // add a new school/manufacturer relationship
    async addBuys(ctx, next) {
        console.log('Controller HIT: BuysController::addBuys');
       return new Promise((resolve, reject) => {
           const newBuy = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO buys(school, manufacturer) VALUES (?, ?);',
               values: [newBuy.school, newBuy.manufacturer]
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
    async updateBuys(ctx, next) {
        console.log('Controller HIT: BuysController::updateBuys');
        return new Promise((resolve, reject) => {
            const buy = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE buys 
                    SET 
                        manufacturer = ?
                    WHERE school = ?
                    `,
                values: [buy.manufacturer, ctx.params.buys]
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

    //deletes a relationship
    async deleteBuys(ctx, next) {
        console.log('Controller HIT: BuysController::deleteBuys');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM buys WHERE school = ?;`,
                values: [ctx.params.buys]
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
module.exports = BuysController;