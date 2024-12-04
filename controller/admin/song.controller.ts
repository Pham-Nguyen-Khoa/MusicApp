import { Request, Response } from "express";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";
import Topics from "../../models/topics.model";
import { systemConfig } from "../../config/config";

//[GET] localhost:3000/admin/songs
export const song = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
    status: "active",
  }).sort({"updatedAt": "desc"});
  for (let song of songs) {
      const infoSinger = await Singer.findOne({
        _id: song.singerId,
        deleted: false,
        status: "active"
      })
      
      const infoTopic = await Topics.findOne({
        _id: song.topicId,
        deleted: false,
        status: "active"
      })

      song["infoSinger"] = infoSinger
      song["infoTopic"] = infoTopic
  }
  res.render("admin/pages/songs/index.pug", {
    pageTitle: " Quản lý bài hát",
    songs: songs,
  });
};




//[GET] localhost:3000/admin/songs/create
export const create = async (req: Request, res: Response) => {
  const topics = await Topics.find({
    deleted: false,
    status: "active"
  }).select("title")
  const singers = await Singer.find({
    deleted: false,
    status: "active"
  }).select("fullName")
  res.render("admin/pages/songs/create.pug", {
    pageTitle: "Tạo mới bài hát",
    topics,
    singers
  });
};


//[POST] localhost:3000/admin/songs/create
export const createPost = async (req: Request, res: Response) => {
    const dataSong = {
      title: req.body.title,
      topicId: req.body.topicId,
      singerId: req.body.singerId,
      description: req.body.desc,
      status: req.body.status,
      avatar: req.body.avatar
    }
    const song = new Song(dataSong);
    await song.save();
    res.redirect(`${systemConfig.prefixAdmin}/songs`);
};
