import express, {Express, Response, Request} from "express"
import dotenv from "dotenv"
import * as database from "./config/database";

import routerClient from "./routers/client/index";
import routerAdmin from "./routers/admin/index.route";
import { systemConfig } from "./config/config";
import path from "path";
//Cấu hình dotenv 
dotenv.config();


//Connect Database
database.connect();


const app:Express = express()
const port: String | Number  = process.env.PORT || 3000;


//Cấu hình views
app.set("views","./views");
app.set("view engine","pug");

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End TinyMCE

//Cấu hình file tĩnh
app.use(express.static("public"));

// App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Router Admin
routerAdmin(app);


//Router client
routerClient(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})