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

let streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        console.log(result);
        resolve(result);
      } else {
        console.log(error);
        reject(error);
      }
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploadToCloudinary = async (buffer: any) => {
  let result = await streamUpload(buffer);
  return result["url"];
};

export const uploadSingle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.log('API Key:', process.env.CLOUD_NAME);
    console.log('API Key:', process.env.CLOUD_KEY);
    console.log('API Key:', process.env.CLOUD_SECRET);
  try {
    const result = await uploadToCloudinary(req["file"].buffer);
    req.body[req["file"].fieldname] = result;
  } catch (error) {
    console.log(error);
  }
  next();
};
