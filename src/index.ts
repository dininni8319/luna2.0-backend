import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from "cors"
import morgan from 'morgan'
import connectDB from './db/connect'

require('dotenv').config()

const app: Express = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.get('/', (req: Request, res: Response) => {
  res.send("<h1>Typescript works!!!!!</h1>")
}) 

const port = process.env.PORT
const mongo_string = process.env.DATABASE

const start = async () => {
  try {
    await connectDB(mongo_string)
    app.listen(port, () => {
    console.log("🚀 ~ file: index.js:14 ~ app.listen ~ port:", port)
  })
  } catch (error) {
    console.log("🚀 ~ file: index.ts:23 ~ start ~ error:", error)
  }
}
start()
