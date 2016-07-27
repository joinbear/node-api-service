const config = require('../config/config');

class CommonLibrary {
	constructor() {}
	/**
	 * [promise 使用promise包裹请求，返回promise]
	 * @param  {Function} fn [description]
	 * @return {[type]}      [description]
	 */
	promise(fn) {
		// yield any promise
  	const result = new Promise(function(resolve, reject) {
  		fn(resolve, reject);
  	});
  	return result;
	}
	errorHandler(error,res){
		res.api_error_status_msg = error.toString();
  	return res.api_error();
	}
	time() {
		const date = new Date();
		const time = {
			date                : date,
			year                : date.getFullYear(),
			month               : date.getFullYear() + "-" + (date.getMonth() + 1),
			day                 : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
			minute              : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
			date.getHours() + " :" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
		};
		return time;
	}
}
module.exports =  CommonLibrary;