const mysql = require('mysql');
const config = require('config');

class Connector {

    constructor() {
        this.pool = mysql.createPool({
            connectionLimit: this.DB_CONNECTION_LIMIT,
            waitForConnections: this.DB_CONNECTION_WAIT,
            acquireTimeout: this.DB_CONNECTION_TIMEOUT,
            host: this.DB_HOST,
            port: this.DB_PORT,
            user: this.DB_USER,
            password: this.DB_PASSWORD,
            database: this.DB_NAME
        });

        this.registerEvent();
    }

    registerEvent() {
        this.pool.on('connection', (connection) => console.log(`New connection stablished with server on thread #${connection.threadId}`));
        this.pool.on('release', function (connection) { console.log(`Connection on thread #${connection.threadId} has been released`); });
    }

    get DB_CONNECTION_LIMIT() { return config.get('db.connection.limit') || 10; }
    get DB_CONNECTION_WAIT() { return config.get('db.connection.wait') || true; }
    get DB_CONNECTION_TIMEOUT() { return config.get('db.connection.timeout') || 1000; }
    get DB_HOST() { return config.get('db.host') || 'localhost'; }
    get DB_PORT() { return config.get('db.port') || 3306; }
    get DB_USER() { return config.get('db.user') || 'root'; }
    get DB_PASSWORD() { return config.get('db.password') || ''; }
    get DB_NAME() { return config.get('db.database') || 'dbserver'; }
    // get pool() { return this.pool; }
    // set pool(val) { this.pool = val; }

}

module.exports = new Connector();