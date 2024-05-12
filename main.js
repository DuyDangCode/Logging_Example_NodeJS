'use strict'
const express = require('express')
const logger = require('./winston.log')
const { v4: uuid4 } = require('uuid')

const app = express()
const PORT = 8080

app.use((req, res, next) => {
  const requestId = req.headers['x-request-id']
  req.requestId = requestId ? requestId : uuid4()
  logger.log('input params', {
    context: req.path,
    requestId: req.requestId,
    metadata: req.method === 'post' ? req.body : req.query,
  })
  next()
})

app.get('/', (req, res, next) => {
  console.log('Hello this is server')
  logger.log('oke', {
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
  logger.error(error.message, {
    context: req.path,
    requestId: req.requestId,
    metadata: req.method === 'post' ? req.body : req.query,
  })
  res.send('fail')
})
app.listen(PORT, () => {
  console.log('Server is runing at ', PORT)
})
