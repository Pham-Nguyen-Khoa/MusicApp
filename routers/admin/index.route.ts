

import {Express} from "express"
import { dashboardRouter } from "./dashboard.route";
import {systemConfig} from "../../config/config";


 const indexRouter = (app: Express): void => {
    
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`, dashboardRouter);




};

export default indexRouter;