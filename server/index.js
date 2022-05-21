const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

mongoose.connect('mongodb://localhost/emulator_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('connected to the database')
})

const routes = require('./routes/routes')

app = express()

app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: ['http://localhost']
}))

app.use(express.json())

app.use('/api', routes)

app.listen(8000)
