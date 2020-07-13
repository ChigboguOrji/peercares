const Contents = require('./contents.model')

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
	postAddNewResource: async (req, res, next) => {
		const content = new Contents({ ...req.body })
		content.save(function (err, saved) {
			console.log(err)
			if (err) return next(err)
		})
		console.log('saved')
		res.send('form')
	},

	// GET
	// resoources list
	getAllResource: (req, res, next) => {
		res.render('resources', { title: 'Resources' })
	},
}
