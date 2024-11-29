import express, {Express, Response, Request} from "express"
import dotenv from "dotenv"

const app:Express = express()
const port:Number = 3000

//Cấu hình dotenv 
dotenv.config();


app.get('/topics', (req: Request, res:Response) => {
  res.send('Danh sách các chủ đề ')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})