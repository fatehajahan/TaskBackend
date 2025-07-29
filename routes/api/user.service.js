const express = require('express')
const { userCtrl, login } = require('../../controllers/user.controller')
const route = express.Router()

route.post("/registration", userCtrl)
route.post("/login", login)

module.exports = route
