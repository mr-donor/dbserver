const Connector = require('./connector');

module.exports = class Mysql {

    /**
     * 執行 MYSQL 語句 
     *
     * @param {query, params} SQL 語句及對應的參數 
     * @param connection 交易模式下執行語句傳入的指定連線
     * @returns Promise
     * 
     */
	static async query({query, params}, connection = null) {
		let transactions = false;
		if (connection === null) {
			connection = await this.connect();
			transactions = true;
		} else {

			connection = await this.beginTransaction();
		}

		return new Promise((succeed, fail) => {
	        connection.query(query, params, (err, rows) => {
	        	if (transactions) connection.release();
	        	if (err) {
	                return fail(err);
	            }
	            return succeed(rows);
	        });
		});

	}

    /**
     * 取得連線池的 MYSQL 連線 
     *
     * @returns connection 
     * 
     */
    static connect() {
        return new Promise((succeed, fail) => {
            Connector.pool.getConnection((err, connection) => {
                if (err) {
                    return fail(err);
                }
                connection.config.queryFormat = (query, values) => {
					if (!values) return query;
					return query.replace(/\:(\w+)/g, function (txt, key) {
						if (values.hasOwnProperty(key)) {
							return this.escape(values[key]);
						}
						return txt;
					}.bind(connection));
				};
                return succeed(connection);
            });
        });
    }

    /**
     * 連線中建立交易模式 (Begins a new transaction in a connection)
	 *
     * @param connection 交易模式下欲提交的指定連線
     * @returns Promise 
     * 
     */
	static beginTransaction(connection) {
        return new Promise((succeed, fail) => {
            connection.beginTransaction(err => {
                if (err) {
                    return fail(err);
                }
                return succeed(connection);
            });
        });
    }

    /**
     * 從連線中的交易提交資料 (Commits a transaction)
	 *
     * @param connection 交易模式下欲提交的指定連線
     * @returns Promise 
     * 
     */
    static commit(connection) {
        return new Promise((succeed, fail) => {
            try {
                connection.commit(err => { 
                    if (err) { 
                        return connection.rollback(connection, err);
                    }

                    return succeed();
                })
            } catch (e) {
                return fail(e);
            } finally {
                connection.release();
            }

        });

    }

    /**
     * 從連線中的交易復原資料 (Rollbacks a transaction)
	 *
     * @param connection 交易模式下欲回復的指定連線
     * @returns Promise 
     * 
     */
    static rollback(connection) {
        return new Promise((succeed, fail) => {
            try {
                connection.rollback(() => succeed());
            } catch (e) {
                return fail(e);
            } finally {
                connection.release();
            }
        });
    }
}