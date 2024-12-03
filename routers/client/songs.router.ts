import {Router} from "express";



import * as controller from "../../controller/client/songs.controller";

const router: Router = Router();

router.get ("/:slugTopic" ,controller.list);

router.get ("/detail/:slugSong" ,controller.detail);

router.patch ("/listen/:songID" ,controller.listen);

router.patch ("/:typeLike/:songID" ,controller.like);

router.patch ("/favorite/:typeFavorite/:songID" ,controller.favorite);





export const songsRouter: Router =  router;
