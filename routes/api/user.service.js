const express = require('express')
const { userCtrl, login, allUserListsCtrl } = require('../../controllers/user.controller')
const route = express.Router()

route.post("/registration", userCtrl)
route.post("/login", login)
route.get("/allUsers", allUserListsCtrl)

module.exports = route
