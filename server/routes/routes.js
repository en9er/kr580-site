const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/login', async (req, res) => {
  if (req.body.login !== process.env.admin_login) {
    return res.status(404).send({
      message: 'user not found'
    })
  }
  if (req.body.password !== process.env.admin_password) {
    return res.status(400).send({
      message: 'invalid credentials'
    })
  }

  const token = jwt.sign({_id: process.env.admin_id}, "secret")

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  })

  res.send({
    message: 'success'
  })
})

router.post('/logout', (req, res) => {
  res.cookie('jwt', '', {maxAge: 0})

  res.send({
    message: 'success'
  })
})

module.exports = router;
