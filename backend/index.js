'use strict'

import express from 'express'
import './lib/cron'
import db from './lib/db'

const app = express()

app.get('/v1', (_, res) => {
  res.status(200).send('v1 is up and running').end()
})

app.get('/users', async (_, res) => {
  const users = await db.get('users').value()

  res.json({
    users,
  })
})

app.get('/users/email-is-unique/:email', async (req, res) => {
  const {email} = req.params
  const emailIsUnique = await db.get('users').find({email: email}).value()

  if (typeof emailIsUnique === 'undefined') {
    res.json({
      emailIsUnique: false,
    })
  }

  res.json({
    emailIsUnique: emailIsUnique,
  })
})

app.get('/users/add', async (_, res, __) => {})

app.get('/', (_, res) => {
  res.status(200).send('Hello, world!').end()
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log('Hello world by mean stack server')
  console.log('Press Ctrl+C to quit.')
})

module.exports = app
