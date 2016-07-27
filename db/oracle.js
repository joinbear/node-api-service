const oracledb = require('oracledb');
const co       = require('co');
/**
 * oracle connection
 */
class OracleDb {
	/**
	 * [constructor]
	 * @param  {Object} config [connection]
	 * @return {[type]}        [description]
	 */
	constructor( config = {
		user          : "username",
	  password      : "password",
	  connectString : "connection ip"
	}) {
		this.dbConfig = config;
	}
	/**
	 * [execute]
	 * @param  {[type]}   sql      [sql]
	 * @param  {[type]}   data     [find more infomation in https://github.com/oracle/node-oracledb/]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
  executeAsyn(sql,bindParams,connection) {
  	return new Promise((resolve, reject)=> {
      connection.execute(sql, bindParams, (err, result)=> {
        if (err) {
          console.error(err.message);
          reject(err);
        }
        resolve(result.rows);
      });
    });
  }
  /**
   * [execute]
   * @param  {[type]} sql        [sql]
   * @param  {[type]} bindParams [default {}]
   * @return {[type]}            [description]
   */
  execute(sql,bindParams) {
		const { connection , executeAsyn , dbConfig } = this;
		console.log('the sql is :------->'+sql);
  	return co(function *() {
			const conn   = yield connection(dbConfig);
			const result = yield executeAsyn(sql, bindParams , conn);
			conn.release();
	    return result;
		}).catch((error)=>{
			console.log(error);
		});
  }
  // connect db return a promise
  connection(config) {
  	return new Promise((resolve, reject)=>{
      oracledb.getConnection(config,(err, connection)=> {
        if (err) {
          console.error(err.message);
          reject(err);
        }
        resolve(connection);
      });
    });
  }
}

module.exports = OracleDb;