const express = require('express')
const route = express.Router()
const users = require("./user.service")

route.use("/users", users)

module.exports = route