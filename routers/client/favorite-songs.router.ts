import {Router} from "express";



import * as controller from "../../controller/client/favoriteSong.controller";

const router: Router = Router();

router.get ("/" ,controller.index);





export const favoriteSongRouter: Router =  router;
