// import middlewares
const express       = require('express');
const path          = require('path');
const raml2html     = require('raml2html');
const config        = require('./config/');
const ParamHandler  = config.ParamHandler;
const ErrorHandler  = config.ErrorHandler;
const Filter        = config.Filter;
const RouterHandler = config.RouterHandler;

// init middlewares 
const app           = new express();
const param         = new ParamHandler(app);
const error         = new ErrorHandler(app);
const filter        = new Filter(app);
const routes        = new RouterHandler(app);
// the service will auto mount router in the appoint path. you can add more as you like.
const websitePath   = path.resolve(__dirname,'./apps/website/actions/');
// api doc router
const template      = raml2html.getDefaultConfig();


//---------params config -----------
param.init();

//---------- filter -------------------
filter.init();

//---------- mount routers -------------
// the mout router is /website/{actions.js}
routes.mount(websitePath,'website');

//---------- api document --------------
app.use('/api-doc/:api',(req,res)=>{
	// console.log(process.cwd() + '/document/'+ req.params.api +'.raml');
	// console.log(configWithDefaultTemplates);
	// source can either be a filename, url, file contents (string) or parsed RAML object
	raml2html.render(process.cwd() + '/document/'+ req.params.api +'.raml', template).then((result)=> {
		res.end(result);
	  // Save the result to a file or do something else with the result
	}, (error)=> {
	  // Output error
	  res.end(error.toString());
	});
});


//--------- handle error ---------------
error.init();

module.exports = app;