const mysql = require('mysql');
const co    = require('co');
/**
 * mysql connect
 */
class MysqlDb {
	/**
	 * [constructor]
	 * @param  {Object} config [db connection params]
	 * @return {[type]}        [description]
	 */
	constructor(config = {  
			host            : 'localhost',
      user            : 'db username',
      password        : 'db password',
      database        : 'db name',
      connectionLimit : 1
    }) {
    this.pool = mysql.createPool(config);
  }
  executeAsyn(conn,sql) {
    return new Promise((resolve,reject)=>{
      const query = conn.query(sql,(err, rows, fields)=>{
        if(err){
          console.error(err);
          reject(err);
        }
        resolve(rows);
        conn.release();
      });
      console.log('the query sql is------->'+query.sql);
    })
  }
  /**
   * [select ]
   * @param  {[type]}   sql      [your sql]
   * @return {[type]}            [description]
   */
  select(sql) {

    const { connection , pool , executeAsyn } = this;
    return co(function *(){
      const conn   = yield connection(pool);
      const result = yield executeAsyn(conn,sql);
      return result;
    }).catch((error)=>{
      console.log(error);
    });

  }
  connection(pool) {

    return new Promise((resolve, reject)=>{
      pool.getConnection((err, connection)=> {
        if (err) {
          console.error(err.message);
          reject(err);
        }
        resolve(connection);
      });
    });

  }
  /**
   * [delete]
   * @param  {[type]}   sql      []
   * @return {[type]}            [description]
   */
  delete(sql) {
    this.select(sql);
  }
  /**
   * [insert]
   * @param  {[type]}   table      [table name]
   * @param  {[type]}   conditions [conditions]
   * @return {[type]}              [description]
   */
  insert(table,conditions) {
    const { connection , pool } = this;
    return co(function *(){
      const conn   = yield connection(pool);
      const result = yield new Promise((resolve,reject)=>{
        const query = conn.query('INSERT INTO '+table+' SET ?',conditions,(err, rows, fields)=>{
          if(err){
            console.error(err);
            reject(err);
          }
          resolve(rows);
          conn.release();
        });
        console.log(query.sql);
      });
      return result;
    }).catch((error)=>{
      console.log(error);
    });  
  }
}

module.exports =  MysqlDb;