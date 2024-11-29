import express, {Express, Response, Request} from "express"
import dotenv from "dotenv"
import * as database from "./config/database";

//Cấu hình dotenv 
dotenv.config();


//Connect Database
database.connect();


const app:Express = express()
const port: String | Number  = process.env.PORT || 3000;


//Cấu hình views
app.set("views","./views");
app.set("view engine","pug");






app.get('/topics', (req: Request, res:Response) => {
  res.render("client/pages/topics/index.pug")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})