import express, { Express, Request, Response} from 'express'

const app: Express = express()


app.get('/', (req: Request, res: Response) => {
  res.send("<h1>Typescript works!!!!!</h1>")
}) 

app.listen(4321, () => {
  console.log("🚀 ~ file: index.js:14 ~ app.listen ~ port:", 4321)
})