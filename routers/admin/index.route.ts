

import {Express} from "express"
import { dashboardRouter } from "./dashboard.route";
import {systemConfig} from "../../config/config";
import { topicRouter } from "./topic.route";
import { songRouter } from "./song.route";
import { uploadRouter } from "./upload.route";




 const indexRouter = (app: Express): void => {
    
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + "/dashboard", dashboardRouter);
    app.use(PATH_ADMIN + "/topics", topicRouter);
    app.use(PATH_ADMIN + "/songs", songRouter);
    app.use(PATH_ADMIN + "/upload", uploadRouter);




};

export default indexRouter;