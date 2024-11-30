import { Request, Response } from "express";

import Topics from "../../models/topics.model";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";

//[GET] localhost:3000/songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  const topic = await Topics.findOne({
    slug: req.params.slugTopic,
    deleted: false,
  });
  let songs = await Song.find({
    topicId: topic.id,
    deleted: "false",
    status: "active",
  }).select("avatar title slug singerId like ");
  for (let song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      deleted: false,
      status: "active",
    });
    song["infoSinger"] = infoSinger;
  }

  res.render("client/pages/songs/index.pug", {
    pageTitle: topic.title,
    songs: songs,
  });
};




//[GET] localhost:3000/songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const slugSong = req.params.slugSong;
  const song = await Song.findOne({
    slug: slugSong,
    deleted: false,
    status:"active"
  })
  const singer = await Singer.findOne({
    _id: song.singerId,
    status: "active",
    deleted: false
  }).select("fullName")

  const topic = await Topics.findOne({
    _id: song.topicId,
    status: "active",
    deleted: false
  }).select("title")


  res.render("client/pages/songs/detail.pug", {
    pageTitle: "Trang chi tiet bai hat",
    song: song,
    singer: singer,
    topic: topic
  });
};


//[GET] localhost:3000/songs/:typeLike/:songID
export const like = async (req: Request, res: Response) => {
 try {
    const typeLike:String = req.params.typeLike;
    const songID:String = req.params.songID;
    
    const song = await Song.findOne({
      _id: songID,
      status: "active",
      deleted: false
    });

    const newLike:Number = typeLike == "like" ? song.like + 1 : song.like -1 ;
    const message:String = typeLike == "like" ? "Like bài hát thành công" : "Like bài hát thất bại";
    await Song.updateOne({
      _id:songID,
      deleted: false,
      status: "active"
    },{
      like: newLike
    })
    res.json({
      code: 200,
      message: message,
      newLike: newLike
    })
    
 } catch (error) {
  res.json({
    code: 400,
    message: "Lỗi thích bài hát"
  })
 }
};