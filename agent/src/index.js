import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import ls from './lib/ls'
import unzip from './lib/unzip'
import wc from './lib/wc'
import { PORT, ORIGINS } from './settings'

export const tmpZips = new Map

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
  origin: (origin, cb) => {
    if (ORIGINS.includes(origin)) {
      cb(null, true)
    } else {
      // FIXME
      // cb(new Error('Restricted by CORS'))
      cb(null, true)
    }
  }
}))
app.listen(PORT, () => {
  console.info(`Agent is running at http://localhost:${PORT}/`)
})

app.put('/ls', async (req, res) => {
  try {
    const { path } = req.body
    const data = await ls(path)
    res.json(data)
  } catch (e) {
    res.status(400).json(e.message)
  }
})

app.put('/wc', async (req, res) => {
  try {
    const { path } = req.body
    const data = await wc(path)
    res.json(data)
  } catch (e) {
    res.status(400).json(e)
  }
})
