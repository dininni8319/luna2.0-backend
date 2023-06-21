import express, { Express }  from 'express'
import bodyParser from 'body-parser'
import cors from "cors"
import morgan from 'morgan'
import connectDB from './db/connect'
import emailRoutes from './routes/email-route'
import userRoutes from './routes/user-route'
import restaurantRoutes from './routes/restaurant-route'

require('dotenv').config()

const app: Express = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use("/api/social", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/restaurant", restaurantRoutes);

const port = process.env.PORT
const mongo_string = process.env.DATABASE

const start = async () => {
  try {
    if (mongo_string) {
        await connectDB(mongo_string)
        app.listen(port, () => {
        console.log("🚀 ~ file: index.js:14 ~ app.listen ~ port:", port)
      })
    }
  } catch (error) {
    console.log("🚀 ~ file: index.ts:23 ~ start ~ error:", error)
  }
}

start()
