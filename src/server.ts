import express, { Request, Response } from 'express'
import config from './config'
import { initDB } from './config/db'



const app = express()

const port = config.Port

//middleware for the body data parse
app.use(express.json())

initDB()

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
