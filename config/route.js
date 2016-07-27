const requireDirectory  = require('require-directory');

/**
 * Router Mount Handler
 */
class RouterHandler {

	constructor(app) {

		this.app = app;

	}

	/**
	 * [mount router mount]
	 * @param  {String} path   [the path you want to mount]
	 * @param  {String} preset [the pre path you want to set example：/ekp/user/,the ekp was the preset,the param default value was null]
	 * @return {[type]}        [description]
	 */
	mount(path, preset = '') {

		const { app } = this;
		const routes  = requireDirectory(module,path);
	  const pre = preset ? preset + '/' : '';
	  for (let route in routes) {

	    var path = '';
	    if(typeof routes[route] == 'object') {

	      mount(route , pre + route + '/');

	    }else {

	      path = '/' + pre + '' + route;
	      console.log('the path is :'+path);
	      app.use(path,routes[route]);

	    }
	  }

	}

}

module.exports = RouterHandler;