import {Router} from "express";

import multer from "multer"

import * as controller from "../../controller/admin/upload.controller";

import * as upploadCloud from "../../middleware/admin/uploadCloud.middleware"




const router: Router = Router();

const upload = multer();


router.post ("/" ,upload.single("file"),upploadCloud.uploadSingle, controller.index);





export const uploadRouter: Router =  router;
