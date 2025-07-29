const express = require('express')
const route = express.Router()

const apiRoute = require("./api")
const baseUrl = "/api/v1"

route.use(baseUrl, apiRoute)
module.exports = route