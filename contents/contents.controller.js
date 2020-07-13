const { encodeId, decodeId } = require('../utils/string-shortner')
module.exports = {
	// GET
	// home page
	getHome: (req, res, next) => {
		res.render('index')
	},

	// GET
	// form page
	getFormPage: (req, res, next) => {
		res.render('form')
	},

	//	POST
	// add new resource
	postAddNewResource: (req, res, next) => {
		res.send('Post to add new resource')
	},

	// GET
	// resoources list
	getAllResource: (req, res, next) => {
		res.render('resources', { title: 'Resources' })
	},
}
