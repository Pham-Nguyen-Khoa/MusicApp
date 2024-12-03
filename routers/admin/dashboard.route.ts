import {Router} from "express";



import * as controller from "../../controller/admin/dashboard.controller";

const router: Router = Router();

router.get ("/" ,controller.dashboard);





export const dashboardRouter: Router =  router;
