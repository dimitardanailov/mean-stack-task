'use strict'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

require('./lib/cron')
const db = require('./lib/db')
const dbEmailIsUnque = require('./lib/db/emailIsUnique')
const databaseHasArtManager = require('./lib/db/databaseHasArtManager')

const app = express()
app.use(cors())

app.use(bodyParser.json())

app.get('/', (_, res) => {
  res.status(200).send('Hello, world!').end()
})

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

app.post('/users', async (req, res) => {
  const user = req.body

  const emailIsUnique = await dbEmailIsUnque(user.email)
  if (!emailIsUnique) {
    res.status(403).send('The current email is used by another user!')
  }

  if (user.role === 'art_manager') {
    const companyHasArtManager = await databaseHasArtManager()

    if (companyHasArtManager) {
      res
        .status(403)
        .send('The current company has a general manager(art manager)')
    }
  }

  db.get('users').push(user).write()

  res.json({user: user})
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

app.delete('/users', async (req, res) => {
  const {email} = req.body

  db.get('users').remove({email: email}).write()

  res.status(200)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log('Hello world by mean stack server')
  console.log('Press Ctrl+C to quit.')
})

module.exports = app
