const path              = require('path');
const express           = require('express');
const favicon           = require('serve-favicon');
const cookieParser      = require('cookie-parser');
const bodyParser        = require('body-parser');
const logger            = require('morgan');
const multer            = require('multer');
const fs                = require('fs-extra');
const res_api           = require('res.api');
const config            = require('./config');
const exphbs            = require('express-handlebars');
const compression       = require('compression');
const HandlerbarsHelper = require('../lib/tmp-helper');
const CommonLib         = require('../lib/common-lib');
const common            = new CommonLib();

/**
 * set view , static source , parser 
 */
class ParamHandler {
	constructor(app) {
		this.app = app;
	}
	init() {
		this.setCompress();
		//this.setView();
		this.setStatic();
		this.setUpload();
		this.setParser();
		this.setLogs();
		this.setRestful();
		console.log('finish config');
	}
	setCompress() {
		const { app } = this;
		//set compress filter
		app.use(compression({filter: (req, res)=>{
			if (req.headers['x-no-compression']) {
		    // don't compress responses with this request header
		    return false
		  }
		  // fallback to standard filter function
		  return compression.filter(req, res)
		}}));
	}
	setView() {
		const { app } = this;
		const laydir     = config.tplPath.substr(1);
		const partialdir = config.tplPath.substr(1) + '/partials';
		// 设置视图路径
		app.set('views', path.join(config.rootPath,config.tplPath));

		//配置handlerbar为模板引擎
		app.engine('html', exphbs({
		  layoutsDir: laydir,//模板路径
		  partialsDir: partialdir,//特殊模板
		  defaultLayout: 'layouts/layout',//主体
		  extname: '.html',//后缀
		  helpers: HandlerbarsHelper//模板解析扩展
		}));

		//设置handlerbar为模板解析引擎
		app.set('view engine', 'html');
	}

	setStatic() {
		const { app } = this;
		// 静态资源的路径
		app.use(express.static(path.join(config.rootPath, 'public')));
		app.use(express.static(path.join(config.rootPath, 'angular')));
	}

	setUpload() {
		const { app } = this;
		// image upload
		// app.use(multer({
		//   dest: './public/upload',
		//   //rename image
		//   rename: function (fileoldname, filename) {
		//     return filename;
		//   }
		// }));
	}

	setLogs() {
		const { app } = this;
		const accessFilePath = path.join(config.rootPath,config.logPath,'access.log');
		try {
		  fs.ensureFileSync(accessFilePath);
		  console.log("file create success!");
		  const accessLog = fs.createWriteStream(accessFilePath,{flags : 'a'});
		  app.use(logger('dev'));
			app.use(logger({stream : accessLog}));
		} catch (err) {
		  console.error(err)
		}	  
	}
	setParser() {
		const { app } = this;
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(cookieParser());
		
		//session
		// app.use(session({
		//   secret: config.cookieSecret,
		//   key: config.db,//cookie name
		//   cookie: {maxAge: 1000 * 60 * 60 * 8 * 1},//8小时
		//   store: new MongoStore({
		//     db: config.db,
		//     host: config.host,
		//     port: config.port
		//   })
		// }));

	}
	setRestful(){
		const { app } = this;
		app.use(res_api);

		//add lib to the locals
		app.locals.common = common;
	}
}


module.exports = ParamHandler;
