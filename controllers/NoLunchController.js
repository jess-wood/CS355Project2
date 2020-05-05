const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class NoLunchController {
    constructor() {
        console.log('No Lunch Controller Initialized!');
    }

        //calls view
        async nolunch(ctx) {
            console.log('Controller HIT: NoLunchController::noLunch');
            return new Promise((resolve, reject) => {
                const query = 'SELECT * FROM no_lunch';
                
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
    }
    module.exports = NoLunchController;