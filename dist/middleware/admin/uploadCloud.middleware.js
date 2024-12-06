"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFields = exports.uploadSingle = void 0;
const streamifier = require("streamifier");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});
let streamUpload = (buffer, resourceType = "auto") => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary_1.v2.uploader.upload_stream({ resource_type: resourceType }, (error, result) => {
            if (result) {
                console.log(result);
                resolve(result);
            }
            else {
                console.log(error);
                reject(error);
            }
        });
        streamifier.createReadStream(buffer).pipe(stream);
    });
};
const uploadToCloudinary = (buffer_1, ...args_1) => __awaiter(void 0, [buffer_1, ...args_1], void 0, function* (buffer, resourceType = "auto") {
    let result = yield streamUpload(buffer, resourceType);
    return result["url"];
});
const uploadSingle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("API Key:", process.env.CLOUD_NAME);
    console.log("API Key:", process.env.CLOUD_KEY);
    console.log("API Key:", process.env.CLOUD_SECRET);
    try {
        const result = yield uploadToCloudinary(req["file"].buffer);
        req.body[req["file"].fieldname] = result;
    }
    catch (error) {
        console.log(error);
    }
    next();
});
exports.uploadSingle = uploadSingle;
const uploadFields = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log();
    for (const key in req["files"]) {
        req.body[key] = [];
        const array = req["files"][key];
        for (const item of array) {
            try {
                const resourceType = item.mimetype.startsWith('audio/') ? 'video' : 'image';
                const result = yield uploadToCloudinary(item.buffer, resourceType);
                req.body[key].push(result);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    next();
});
exports.uploadFields = uploadFields;
