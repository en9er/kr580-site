const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const routes = require('./routes/routes')

app = express()

app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: ['http://localhost', 'http://localhost:4200']
}))
require('dotenv').config();
app.use(express.json())

app.use('/api', routes)

app.listen(8000)
console.log("server is listening on http://localhost:8000")
