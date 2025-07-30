const express = require('express')
const route = express.Router()
const users = require("./user.service")
const auth = require("./auth.service")

route.use("/users", users)
route.use("/forgotPassword", auth)

module.exports = route