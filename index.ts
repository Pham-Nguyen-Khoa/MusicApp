import express, {Express, Response, Request} from "express"
import dotenv from "dotenv"
import * as database from "./config/database";

import routerClient from "./routers/client/index";

//Cấu hình dotenv 
dotenv.config();


//Connect Database
database.connect();


const app:Express = express()
const port: String | Number  = process.env.PORT || 3000;


//Cấu hình views
app.set("views","./views");
app.set("view engine","pug");


//Cấu hình file tĩnh
app.use(express.static("public"));


routerClient(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})