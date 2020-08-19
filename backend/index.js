'use strict'

import express from 'express'
import cors from 'cors'

import './lib/cron'
import db from './lib/db'
import dbEmailIsUnque from './lib/db/emailIsUnique'
import databaseHasArtManager from './lib/db/databaseHasArtManager'

const app = express()
app.use(cors())

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
  const emailIsUnique = await dbEmailIsUnque(email)

  res.json({
    emailIsUnique,
  })
})

app.get('/users/role-art-manager-is-available', async (_, res) => {
  const dbHasArtManager = await databaseHasArtManager()

  res.json({
    dbHasArtManager,
  })
})

app.post('/user', async (req, res) => {
  const {firstName, lastName, email, role} = req.body

  const dbRecordIsValid = dbEmailIsUnque(email) && artistRoleIsUnque()

  if (!dbRecordIsValid) {
    res.status(403).send('Email or Role data are invalid')
  }

  const user = {
    firstName,
    lastName,
    email,
    role,
  }

  db.get('users').push(user).write()

  res.json({user})
})

app.put('/user', async (req, res) => {
  const {firstName, email} = req.body

  db.get('users').find({email: email}).assign({firstName: firstName}).write()

  const user = {
    firstName,
    email,
  }

  res.json({user})
})

app.delete('/user', async (req, res) => {
  const {email} = req.body

  db.get('users').remove({email: email}).write()

  res.status(200)
})

app.get('/', (_, res) => {
  res.status(200).send('Hello, world!').end()
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log('Hello world by mean stack server')
  console.log('Press Ctrl+C to quit.')
})

module.exports = app
