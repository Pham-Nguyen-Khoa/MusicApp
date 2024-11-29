import express, {Express, Response, Request} from "express"
import dotenv from "dotenv"
import * as database from "./config/database";
import Topics from "./models/topics.model";



//Cấu hình dotenv 
dotenv.config();


//Connect Database
database.connect();


const app:Express = express()
const port: String | Number  = process.env.PORT || 3000;


//Cấu hình views
app.set("views","./views");
app.set("view engine","pug");






app.get('/topics', async (req: Request, res:Response) => {
  const listTopics = await Topics.find({
    deleted: false
  })
  console.log(listTopics)
  res.render("client/pages/topics/index.pug",{
    listTopics
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})