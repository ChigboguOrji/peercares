const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categories = ['blog', 'article', 'book', 'uncategorized']

const ContentSchema = new Schema(
	{
		sharerName: {
			type: String,
			required: function () {
				return this.sharerName
			},
		},

		contentTitle: {
			type: String,
			required: function () {
				return this.contentTitle
			},
		},

		contentUrl: {
			type: String,
			required: function () {
				return this.contentUrl
			},
		},

		contentCategory: {
			type: String,
			enum: categories,
			lowercase:true,
			required: function () {
				return this.contentCategory
			},
			validate: function (string) {
				return (
					!categories.includes(string) ||
					string.toLowerCase().indexOf(categories) === -1
				)
			},
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Contents', ContentSchema, 'contents')
