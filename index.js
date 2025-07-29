require('dotenv').config()
const express = require('express')
const dbConnection = require('./config/db.config')
const cors = require("cors");
const route = require('./routes')
const app = express()
const port = 3000
dbConnection()

app.use(cors());
app.use(express.json())
app.use(route)

app.listen(port, () => {
    console.log("Backend is running")
})