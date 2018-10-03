const Router = require('express').Router()
const contact_router = require('./contact_router')

Router.use('/contact', contact_router)

module.exports = Router
