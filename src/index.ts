import express, { Request, Response } from 'express'
import config from './config'
import { initDB } from './config/db'


const app = express()

export const port = config.Port

//middleware for the body data parse
app.use(express.json())

initDB()

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

export default app;