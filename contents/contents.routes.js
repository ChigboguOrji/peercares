const express = require('express')
const router = express.Router()

const controller = require('./contents.controller')

router.get('/', controller.getHome)

router.get('/new-resource', controller.getFormPage)

router.post('/new-resource', controller.postAddNewResource)

router.get('/all-resource', controller.getAllResource)

module.exports = router
