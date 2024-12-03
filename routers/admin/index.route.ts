

import {Express} from "express"
import { dashboardRouter } from "./dashboard.route";
import {systemConfig} from "../../config/config";
import { topicRouter } from "../client/topic.router";


 const indexRouter = (app: Express): void => {
    
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + "/dashboard", dashboardRouter);
    app.use(PATH_ADMIN + "/topics", topicRouter);




};

export default indexRouter;