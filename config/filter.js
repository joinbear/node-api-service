/**
 * filter class
 */
class Filter {
	constructor(app) {
		this.app = app;
		this.staticReg = /\/ekp\//;
		this.init();
	}
	/**
	 * [init]
	 * @return {[type]} [description]
	 */
	init() {
		const { app , staticReg } = this;
		const that = this;
		app.use(function(req, res, next){
			const allow = staticReg.test(req.url);
			if(allow){
				console.log('i come in filter=======>'+req.url);
				that.filter(req, res, next);
			}else{
				next();
			}
		});
	}
	/**
	 * [filter do some filter]
	 * @return {[type]} [description]
	 */
	filter(req, res, next) {
		//console.log(req.headers);
		next();
	}
}


module.exports = Filter;