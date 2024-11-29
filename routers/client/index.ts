

import {Express} from "express"
import { topicRouter } from "./topic.router";


 const indexRouter = (app: Express): void => {

    app.use("/topics", topicRouter);



};

export default indexRouter;