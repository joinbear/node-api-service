const rek       = require('rekuire');
const CommonLib = rek('common-lib');
const MysqlDb   = rek('db').MysqlDb;
const co        = require('co');
const comLib    = new CommonLib();
const Db        = new MysqlDb();
/**
 * 
 */
class SevenActiveModel {

	/**
	 * [insertUser]
	 * @param  {[type]} user [user object]
	 * demo 
	 * const user = {
		  regin : "something",
		  subregin : "something",
		  trade_time : "2016-16-15",
		  custom_type: "something",
		  custom_name: "something",
		  custom_phone: "1381381438",
		  date : "2016-07-15"
	 * };
	 * @return {[type]}      [description]
	 */
	insertUser(user) {
		const userCheckSql = "SELECT count(*) as count from demo where custom_phone='"+user.custom_phone+"'";
		const dataExist = { code : 1, msg : '该数据已经存在' };
		return co(function *(){
			const result = yield Db.select(userCheckSql);
			if(result[0].count > 0){
				return dataExist;
			}else {
				return yield Db.insert('demo', user);
			}
		});
	}

	/**
	 * [selectUser select the data by date]
	 * @param  {[type]} date [like 2016-07-15]
	 * @return {[type]}      [description]
	 */
	selectUser(date) {
		const queryUserSql =  "SELECT * from demo where date='"+date+"'";
		return this.executeSql(queryUserSql);
	}

	executeSql(querySql) {

		return co(function *(){
			return yield Db.select(querySql);
		});

	}
}

module.exports = SevenActiveModel;