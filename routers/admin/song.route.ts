import {Router} from "express";



import * as controller from "../../controller/admin/song.controller";

import * as upploadCloud from "../../middleware/admin/uploadCloud.middleware"

import multer from "multer"


const router: Router = Router();

const upload = multer();

router.get ("/" ,controller.song);

router.get ("/create" ,controller.create);

router.post ("/create" ,upload.single("avatar"),upploadCloud.uploadSingle, controller.createPost);





export const songRouter: Router =  router;
