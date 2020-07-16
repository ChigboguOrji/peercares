require('dotenv').config()
const path = require('path')
const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const compression = require('compression')
const morgan = require('morgan')

const config = require('./config')
const PORT =
	process.env.NODE_ENV === 'production' ? process.env.PORT : config.PORT
const DB_URI =
	process.env.NODE_ENV === 'production' ? process.env.DB_URI : config.URI
const routes = require('./contents/contents.routes')

const server = express()

// connect to database
mongoose
	.connect(DB_URI, { ...config.OPTIONS })
	.then(() => console.log('Database connect success!'))
	.catch(err => console.log('Error connecting database! ::: ', err))

// configure middlewares
server.disable('x-powered-by')
server.use(compression())
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(express.static(path.join(__dirname + '/public')))
server.set('views', path.join(__dirname + '/views'))
server.set('view engine', 'pug')

// set local variables
server.locals.appName = 'Peer Cares'

// set logging only on dev
if (process.env.NODE_ENV !== 'production' || 'test')
	server.use(morgan('dev'))

// route paths
server.use('/', routes)
server.use('/contents/v1', routes)

server.use((req, res, next) => {
	const err = new Error('Not Found')
	err.statusCode = 404
	next(err)
})

server.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500
	let message =
		process.env.NODE_ENV === 'production'
			? 'Internal Server Error'
			: err.message
	res.render('404', {
		message: message,
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
