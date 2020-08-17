'use strict'

import express from 'express'
import db from './lib/db'

const app = express()

app.get('/v1', (_, res) => {
  res.status(200).send('v1 is up and running').end()
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
