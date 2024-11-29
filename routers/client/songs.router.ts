import {Router} from "express";



import * as controller from "../../controller/client/songs.controller";

const router: Router = Router();

router.get ("/:slugTopic" ,controller.list);


export const songsRouter: Router =  router;
