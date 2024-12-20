import {Router} from "express";



import * as controller from "../../controller/admin/song.controller";

import * as upploadCloud from "../../middleware/admin/uploadCloud.middleware"

import multer from "multer"


const router: Router = Router();

const upload = multer();

router.get ("/" ,controller.song);

router.get ("/create" ,controller.create);

router.get ("/edit/:id" ,controller.edit);

router.patch ("/edit/:id" ,upload.fields([{name: "avatar", maxCount: 1}, {name: "audio", maxCount: 1}]),upploadCloud.uploadFields,  controller.editPatch);

router.post ("/create" ,upload.fields([{name: "avatar", maxCount: 1}, {name: "audio", maxCount: 1}]),upploadCloud.uploadFields, controller.createPost);





export const songRouter: Router =  router;
