// const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

type ResourceType = "auto" | "image" | "video" | "raw";

let streamUpload = (buffer: Buffer, resourceType: ResourceType = "auto") => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            { resource_type: resourceType },
            (error, result) => {
                if (result) {
                    console.log(result);
                    resolve(result);
                } else {
                    console.log(error);
                    reject(error);
                }
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

const uploadToCloudinary = async (buffer: any, resourceType: ResourceType = "auto") => {
  let result = await streamUpload(buffer,resourceType);
  return result["url"];
};

export const uploadSingle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("API Key:", process.env.CLOUD_NAME);
  console.log("API Key:", process.env.CLOUD_KEY);
  console.log("API Key:", process.env.CLOUD_SECRET);
  try {
    const result = await uploadToCloudinary(req["file"].buffer);
    req.body[req["file"].fieldname] = result;
  } catch (error) {
    console.log(error);
  }
  next();
};

export const uploadFields = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log()
  for (const key in req["files"]) {
    req.body[key] = [];

    const array = req["files"][key];
    for (const item of array) {
      try {
        const resourceType: ResourceType = item.mimetype.startsWith('audio/') ? 'video' : 'image';
                const result = await uploadToCloudinary(item.buffer, resourceType);
        // const result = await uploadToCloudinary(item.buffer);
        req.body[key].push(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  next();
};
