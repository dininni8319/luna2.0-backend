import express, { Express }  from 'express'
import cors from "cors"
import morgan from 'morgan'
import connectDB from './db/connect'
import emailRoutes from './routes/email-route'
import userRoutes from './routes/user-route'
import restaurantRoutes from './routes/restaurant-route'
import path from 'path'

require('dotenv').config()

const app: Express = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use("/api/user", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/restaurant", restaurantRoutes);

app.use("/upload/images", express.static(path.join("upload", "images")));
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
