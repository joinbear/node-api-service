const express          = require('express');
const co               = require('co');
const router           = express.Router();
const SevenActiveModel = require('../models/demo');
const sevenActiveModel = new SevenActiveModel();

//add data
//router.post('/user',(req,res)=> instantiate(req,res,sevenActiveModel.insertUser(req.body)) );

// add data
router.get('/user',(req,res)=> {
	const user = {
		regin : "some regin",
		subregin : "some subregin",
		trade_time : "2016-16-15",
		custom_type: "des",
		custom_name: "youname",
		custom_phone: "1381381438",
		date : "2016-07-15"
	};
	instantiate(req,res,sevenActiveModel.insertUser(user))
});

// get the data
router.get('/:date',(req,res)=> instantiate(req,res,sevenActiveModel.selectUser(req.params['date'])) )

/**
 * 
 * [instantiate initialize the model ]
 * @param  {[type]}   res [response]
 * @param  {Function} fn  [callback function]
 * @return {[type]}       [description]
 */
function instantiate(req,res,fn) {
	const errorHandler = req.app.locals.common.errorHandler;
	co(function *(){
		const result = yield fn;
		return res.api(result);
	}).catch(
	 (error)=>errorHandler(res,error)
	);
}

module.exports = router;