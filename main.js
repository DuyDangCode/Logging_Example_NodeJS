'use strict'
const express = require('express')
const { v4: uuid4 } = require('uuid')
const MainLogger = require('./logger')
const winstonLog = require('./winston.log')
const discordLog = require('./discord.log')
require('dotenv').config()

const app = express()
const PORT = 8080
const mainLogger = new MainLogger()
mainLogger.add(winstonLog)
mainLogger.add(discordLog)
// mainLogger.remove(discordLog)

app.use((req, res, next) => {
  const requestId = req.headers['x-request-id']
  req.requestId = requestId ? requestId : uuid4()
  mainLogger.log('input params', {
    context: req.path,
    requestId: req.requestId,
    metadata: req.method === 'post' ? req.body : req.query,
  })
  next()
})

app.get('/', (req, res, next) => {
  mainLogger.log('oke', {
    context: req.path,
    requestId: req.requestId,
    metadata: 'Oke',
  })
  res.send('Oke')
})

app.get('/error', (req, res, next) => {
  throw new Error('loi roi nha')
})

app.use((error, req, res, next) => {
  mainLogger.error(error.message, {
    context: req.path,
    requestId: req.requestId,
    metadata: req.method === 'post' ? req.body : req.query,
  })
  res.send('fail')
})
app.listen(PORT, () => {
  console.log('Server is runing at ', PORT)
})
