const express = require('express')
const { resetPassword } = require('../../controllers/auth.controller')
const route = express.Router()

route.post("/resendPassword", resetPassword)

module.exports = route
