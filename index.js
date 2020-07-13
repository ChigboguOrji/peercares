require('dotenv').config()
const path = require('path')
const http = require('http')
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const PORT = process.env.PORT || 8080

const routes = require('./contents/contents.routes')

const server = express()

// configure middlewares
server.use(compression())
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(express.static(path.join(__dirname + '/public')))
server.set('views', path.join(__dirname + '/views'))
server.set('view engine', 'pug')

// set local variables
server.locals.appName = 'Share It'

// set logging only on dev
if (process.env.NODE_ENV !== 'production' || 'test')
	server.use(morgan('dev'))

// route paths
server.use('/contents/v1', routes)

server.use((req, res, next) => {
	const err = new Error('Not Found')
	err.statusCode = 404
	next(err)
})

server.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500
	res.render('404', {
		message: err.message,
		code: statusCode,
	})
})

if (require.main === module) {
	http
		.createServer(server)
		.listen(PORT, console.log('server running on %d', PORT))
} else {
	module.exports = server
}
