const mSQL = require('mysql');

const chpConnection = mSQL.createConnection({
    debug: false,
    host: '127.0.0.1',
    port: '3306',
    user: 'jwood_cs355sp20',
	password: 'wo5708162',
	database: 'jwood_cs355sp20'
});

module.exports = chpConnection;