const Mysql = require('./mysql');
const sql = require('../util/sql')

module.exports = class Database {
    static get PRIMARY_KEY() {
        return "user_id";
    }

    static async find(id) {
        return (await Mysql.query({
            query: `SELECT * FROM db_user WHERE ${this.PRIMARY_KEY} = :${this.PRIMARY_KEY} LIMIT 1;`,
            params: {
            	[this.PRIMARY_KEY]: id
            }
        })).shift()
    }

}