import {Router} from "express";



import * as controller from "../../controller/client/songs.controller";

const router: Router = Router();

router.get ("/:slugTopic" ,controller.list);

router.get ("/detail/:slugSong" ,controller.detail);


router.get ("/:typeLike/:songID" ,controller.like);


export const songsRouter: Router =  router;
