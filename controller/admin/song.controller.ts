import { Request, Response } from "express";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";
import Topics from "../../models/topics.model";

//[GET] localhost:3000/admin/topics
export const song = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
    status: "active",
  });
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
