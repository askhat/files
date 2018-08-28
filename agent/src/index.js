import express from 'express'
import compression from 'compression'
import apicache from 'apicache'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import boolParser from 'express-query-boolean'
import cors from 'cors'
import ls from './lib/ls'
import wc from './lib/wc'
import { PORT } from './settings'


export const tmpZips = new Map

const app = express()
// FIXME
app.use(cors({ origin: (origin, cb) => cb(null, true) }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(boolParser())
app.use(compression())
app.use(apicache.middleware('5 minutes'))
app.use(morgan('dev'))

app.listen(PORT, () => console.info(`Agent is running at http://localhost:${PORT}/`))

app.get('/ls', async (req, res) => {
  try {
    const { path, recursive } = req.query
    const data = await ls(path, recursive)
    res.json(data)
  } catch (e) {
    res.status(400).json(e.message)
  }
})

app.get('/wc', async (req, res) => {
  try {
    const { path } = req.query
    const data = await wc(path)
    res.json(data)
  } catch (e) {
    res.status(400).json(e)
  }
})
