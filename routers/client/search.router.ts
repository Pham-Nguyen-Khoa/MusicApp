import {Router} from "express";



import * as controller from "../../controller/client/search.controller";

const router: Router = Router();

router.get ("/:type" ,controller.search);





export const searchRouter: Router =  router;
